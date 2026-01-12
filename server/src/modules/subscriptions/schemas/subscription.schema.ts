import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { SubscriptionPlan, SubscriptionStatus } from '../../../common/enums';

export type SubscriptionDocument = Subscription & Document;

@Schema({ timestamps: true })
export class Subscription {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: MongooseSchema.Types.ObjectId;

  @Prop({ type: String, enum: SubscriptionPlan, default: SubscriptionPlan.FREE })
  plan: SubscriptionPlan;

  @Prop({ type: String, enum: SubscriptionStatus, default: SubscriptionStatus.ACTIVE })
  status: SubscriptionStatus;

  @Prop()
  stripeCustomerId?: string;

  @Prop()
  stripeSubscriptionId?: string;

  @Prop()
  stripePriceId?: string;

  @Prop({ type: Date })
  currentPeriodStart?: Date;

  @Prop({ type: Date })
  currentPeriodEnd?: Date;

  @Prop({ type: Date })
  cancelAt?: Date;

  @Prop({ default: false })
  cancelAtPeriodEnd: boolean;

  @Prop({ type: Number, default: 0 })
  amount: number;

  @Prop()
  currency?: string;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);

// Indexes
SubscriptionSchema.index({ userId: 1 });
SubscriptionSchema.index({ stripeSubscriptionId: 1 });
