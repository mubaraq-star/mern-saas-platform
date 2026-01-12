import { Controller, Get, Post, Patch, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { SubscriptionsService } from '../services/subscriptions.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateSubscriptionDto, UpdateSubscriptionDto, CancelSubscriptionDto } from '../dto/subscription.dto';

@ApiTags('Subscriptions')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Get('status')
  @ApiOperation({ summary: 'Get user subscription status' })
  @ApiResponse({ status: 200, description: 'Subscription status retrieved' })
  async getStatus(@Req() req: any) {
    const userId = req.user.sub;
    const subscription = await this.subscriptionsService.findByUserId(userId);
    return {
      success: true,
      message: 'Subscription status retrieved',
      data: subscription,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create a new subscription' })
  @ApiResponse({ status: 201, description: 'Subscription created successfully' })
  async create(@Req() req: any, @Body() dto: CreateSubscriptionDto) {
    const userId = req.user.sub;
    const subscription = await this.subscriptionsService.create(
      userId,
      dto.plan,
      dto.stripePriceId,
    );
    return {
      success: true,
      message: 'Subscription created successfully',
      data: subscription,
    };
  }

  @Patch('upgrade')
  @ApiOperation({ summary: 'Upgrade subscription to a higher plan' })
  @ApiResponse({ status: 200, description: 'Subscription upgraded successfully' })
  async upgrade(@Req() req: any, @Body() dto: UpdateSubscriptionDto) {
    const userId = req.user.sub;
    const subscription = await this.subscriptionsService.upgrade(
      userId,
      dto.plan,
      dto.stripePriceId,
    );
    return {
      success: true,
      message: 'Subscription upgraded successfully',
      data: subscription,
    };
  }

  @Patch('downgrade')
  @ApiOperation({ summary: 'Downgrade subscription to a lower plan' })
  @ApiResponse({ status: 200, description: 'Subscription downgraded successfully' })
  async downgrade(@Req() req: any, @Body() dto: UpdateSubscriptionDto) {
    const userId = req.user.sub;
    const subscription = await this.subscriptionsService.downgrade(
      userId,
      dto.plan,
      dto.stripePriceId,
    );
    return {
      success: true,
      message: 'Subscription downgraded successfully',
      data: subscription,
    };
  }

  @Post('cancel')
  @ApiOperation({ summary: 'Cancel subscription' })
  @ApiResponse({ status: 200, description: 'Subscription cancelled successfully' })
  async cancel(@Req() req: any, @Body() dto: CancelSubscriptionDto) {
    const userId = req.user.sub;
    const subscription = await this.subscriptionsService.cancel(userId, dto.immediately);
    return {
      success: true,
      message: 'Subscription cancelled successfully',
      data: subscription,
    };
  }

  @Post('reactivate')
  @ApiOperation({ summary: 'Reactivate a cancelled subscription' })
  @ApiResponse({ status: 200, description: 'Subscription reactivated successfully' })
  async reactivate(@Req() req: any) {
    const userId = req.user.sub;
    const subscription = await this.subscriptionsService.reactivate(userId);
    return {
      success: true,
      message: 'Subscription reactivated successfully',
      data: subscription,
    };
  }
}
