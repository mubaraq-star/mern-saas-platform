import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Subscription, SubscriptionDocument } from '../schemas/subscription.schema';
import { SubscriptionPlan, SubscriptionStatus } from '../../../common/enums';
import { PaymentsService } from '../../payments/services/payments.service';
import { NotificationsService } from '../../notifications/services/notifications.service';
import { User, UserDocument } from '../../users/schemas/user.schema';

@Injectable()
export class SubscriptionsService {
  private readonly logger = new Logger(SubscriptionsService.name);

  constructor(
    @InjectModel(Subscription.name) private subscriptionModel: Model<SubscriptionDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private paymentsService: PaymentsService,
    private notificationsService: NotificationsService,
    private eventEmitter: EventEmitter2,
  ) {}

  async findByUserId(userId: string): Promise<SubscriptionDocument | null> {
    return this.subscriptionModel.findOne({ userId });
  }

  async create(
    userId: string,
    plan: SubscriptionPlan,
    stripePriceId?: string,
  ): Promise<SubscriptionDocument> {
    try {
      // Check if user already has a subscription
      const existing = await this.subscriptionModel.findOne({ userId });
      if (existing) {
        throw new BadRequestException('User already has a subscription');
      }

      const user = await this.userModel.findById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      let stripeCustomerId = user.stripeCustomerId;
      let stripeSubscriptionId: string | undefined;
      let amount = 0;

      // Create Stripe customer if needed
      if (!stripeCustomerId && plan !== SubscriptionPlan.FREE) {
        stripeCustomerId = await this.paymentsService.createCustomer(
          user.email,
          `${user.firstName} ${user.lastName}`,
        );
        user.stripeCustomerId = stripeCustomerId;
        await user.save();
      }

      // Create Stripe subscription for paid plans
      if (plan !== SubscriptionPlan.FREE && stripePriceId && stripeCustomerId) {
        const stripeSubscription = await this.paymentsService.createSubscription(
          stripeCustomerId,
          stripePriceId,
          userId,
        );
        stripeSubscriptionId = stripeSubscription.id;
        amount = stripeSubscription.items.data[0].price.unit_amount || 0;
      }

      // Create subscription record
      const subscription = await this.subscriptionModel.create({
        userId,
        plan,
        status: SubscriptionStatus.ACTIVE,
        stripeCustomerId,
        stripeSubscriptionId,
        stripePriceId,
        amount,
        currency: 'usd',
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      });

      // Send confirmation email
      this.notificationsService
        .sendSubscriptionConfirmationEmail(user.email, `${user.firstName} ${user.lastName}`, plan, amount)
        .catch((err) => this.logger.error('Failed to send subscription confirmation email:', err));

      // Emit event
      this.eventEmitter.emit('subscription.created', { userId, plan });

      this.logger.log(`Subscription created for user ${userId}: ${plan}`);
      return subscription;
    } catch (error) {
      this.logger.error('Error creating subscription:', error);
      throw error;
    }
  }

  async upgrade(
    userId: string,
    newPlan: SubscriptionPlan,
    stripePriceId?: string,
  ): Promise<SubscriptionDocument> {
    const subscription = await this.subscriptionModel.findOne({ userId });
    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }

    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Validate upgrade path
    const planHierarchy = {
      [SubscriptionPlan.FREE]: 0,
      [SubscriptionPlan.BASIC]: 1,
      [SubscriptionPlan.PREMIUM]: 2,
    };

    if (planHierarchy[newPlan] <= planHierarchy[subscription.plan]) {
      throw new BadRequestException('Can only upgrade to a higher plan. Use downgrade for lower plans.');
    }

    // Update Stripe subscription if exists
    if (subscription.stripeSubscriptionId && stripePriceId) {
      await this.paymentsService.updateSubscription(subscription.stripeSubscriptionId, stripePriceId);
    }

    // Update subscription
    subscription.plan = newPlan;
    subscription.stripePriceId = stripePriceId;
    await subscription.save();

    // Send email
    this.notificationsService
      .sendSubscriptionConfirmationEmail(user.email, `${user.firstName} ${user.lastName}`, newPlan, subscription.amount)
      .catch((err) => this.logger.error('Failed to send upgrade email:', err));

    // Emit event
    this.eventEmitter.emit('subscription.upgraded', { userId, oldPlan: subscription.plan, newPlan });

    this.logger.log(`Subscription upgraded for user ${userId}: ${subscription.plan} -> ${newPlan}`);
    return subscription;
  }

  async downgrade(
    userId: string,
    newPlan: SubscriptionPlan,
    stripePriceId?: string,
  ): Promise<SubscriptionDocument> {
    const subscription = await this.subscriptionModel.findOne({ userId });
    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }

    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Validate downgrade path
    const planHierarchy = {
      [SubscriptionPlan.FREE]: 0,
      [SubscriptionPlan.BASIC]: 1,
      [SubscriptionPlan.PREMIUM]: 2,
    };

    if (planHierarchy[newPlan] >= planHierarchy[subscription.plan]) {
      throw new BadRequestException('Can only downgrade to a lower plan. Use upgrade for higher plans.');
    }

    // Update Stripe subscription if exists
    if (subscription.stripeSubscriptionId && stripePriceId) {
      await this.paymentsService.updateSubscription(subscription.stripeSubscriptionId, stripePriceId);
    }

    // Update subscription
    subscription.plan = newPlan;
    subscription.stripePriceId = stripePriceId;
    await subscription.save();

    // Emit event
    this.eventEmitter.emit('subscription.downgraded', { userId, oldPlan: subscription.plan, newPlan });

    this.logger.log(`Subscription downgraded for user ${userId}: ${subscription.plan} -> ${newPlan}`);
    return subscription;
  }

  async cancel(userId: string, immediately: boolean = false): Promise<SubscriptionDocument> {
    const subscription = await this.subscriptionModel.findOne({ userId });
    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }

    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Cancel Stripe subscription if exists
    if (subscription.stripeSubscriptionId) {
      await this.paymentsService.cancelSubscription(subscription.stripeSubscriptionId);
    }

    if (immediately) {
      subscription.status = SubscriptionStatus.CANCELLED;
      subscription.plan = SubscriptionPlan.FREE;
    } else {
      subscription.cancelAtPeriodEnd = true;
      subscription.cancelAt = subscription.currentPeriodEnd;
    }

    await subscription.save();

    // Send cancellation email
    const endDate = subscription.currentPeriodEnd || new Date();
    this.notificationsService
      .sendSubscriptionCancelledEmail(user.email, `${user.firstName} ${user.lastName}`, endDate)
      .catch((err) => this.logger.error('Failed to send cancellation email:', err));

    // Emit event
    this.eventEmitter.emit('subscription.cancelled', { userId, immediately });

    this.logger.log(`Subscription cancelled for user ${userId}`);
    return subscription;
  }

  async reactivate(userId: string): Promise<SubscriptionDocument> {
    const subscription = await this.subscriptionModel.findOne({ userId });
    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }

    if (!subscription.cancelAtPeriodEnd) {
      throw new BadRequestException('Subscription is not scheduled for cancellation');
    }

    subscription.cancelAtPeriodEnd = false;
    subscription.cancelAt = undefined;
    await subscription.save();

    // Emit event
    this.eventEmitter.emit('subscription.reactivated', { userId });

    this.logger.log(`Subscription reactivated for user ${userId}`);
    return subscription;
  }

  async update(id: string, updateData: Partial<Subscription>): Promise<SubscriptionDocument> {
    const subscription = await this.subscriptionModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }

    return subscription;
  }

  async updateFromStripe(stripeSubscriptionId: string, data: any): Promise<void> {
    const subscription = await this.subscriptionModel.findOne({ stripeSubscriptionId });
    if (!subscription) {
      this.logger.warn(`Subscription not found for Stripe ID: ${stripeSubscriptionId}`);
      return;
    }

    subscription.status = data.status;
    subscription.currentPeriodStart = new Date(data.current_period_start * 1000);
    subscription.currentPeriodEnd = new Date(data.current_period_end * 1000);
    await subscription.save();

    this.logger.log(`Subscription updated from Stripe: ${stripeSubscriptionId}`);
  }
}
