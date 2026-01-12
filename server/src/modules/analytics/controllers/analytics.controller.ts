import { Controller, Get, Query, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AnalyticsService } from '../services/analytics.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../../common/decorators/auth.decorator';
import { UserRole } from '../../../common/enums';

@ApiTags('Analytics')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('dashboard')
  @ApiOperation({ summary: 'Get complete dashboard overview (Admin only)' })
  async getDashboard() {
    const data = await this.analyticsService.getDashboardOverview();
    return {
      success: true,
      message: 'Dashboard overview retrieved',
      data,
    };
  }

  @Get('users')
  @ApiOperation({ summary: 'Get user statistics (Admin only)' })
  async getUserStats() {
    const stats = await this.analyticsService.getUserStats();
    return {
      success: true,
      message: 'User statistics retrieved',
      data: stats,
    };
  }

  @Get('users/growth')
  @ApiOperation({ summary: 'Get user growth over time (Admin only)' })
  @ApiQuery({ name: 'days', required: false, type: Number, description: 'Number of days to analyze' })
  async getUserGrowth(@Query('days', new ParseIntPipe({ optional: true })) days?: number) {
    const growth = await this.analyticsService.getUserGrowth(days || 30);
    return {
      success: true,
      message: 'User growth data retrieved',
      data: growth,
    };
  }

  @Get('subscriptions')
  @ApiOperation({ summary: 'Get subscription statistics (Admin only)' })
  async getSubscriptionStats() {
    const stats = await this.analyticsService.getSubscriptionStats();
    return {
      success: true,
      message: 'Subscription statistics retrieved',
      data: stats,
    };
  }

  @Get('revenue')
  @ApiOperation({ summary: 'Get revenue statistics (Admin only)' })
  @ApiQuery({ name: 'startDate', required: false, type: String })
  @ApiQuery({ name: 'endDate', required: false, type: String })
  async getRevenueStats(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const dateRange = {
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
    };
    const stats = await this.analyticsService.getRevenueStats(dateRange);
    return {
      success: true,
      message: 'Revenue statistics retrieved',
      data: stats,
    };
  }

  @Get('revenue/period')
  @ApiOperation({ summary: 'Get revenue by period (Admin only)' })
  @ApiQuery({ name: 'days', required: false, type: Number, description: 'Number of days to analyze' })
  async getRevenueByPeriod(@Query('days', new ParseIntPipe({ optional: true })) days?: number) {
    const revenue = await this.analyticsService.getRevenueByPeriod(days || 30);
    return {
      success: true,
      message: 'Revenue by period retrieved',
      data: revenue,
    };
  }

  @Get('payments')
  @ApiOperation({ summary: 'Get payment statistics (Admin only)' })
  async getPaymentStats() {
    const stats = await this.analyticsService.getPaymentStats();
    return {
      success: true,
      message: 'Payment statistics retrieved',
      data: stats,
    };
  }

  @Get('activity')
  @ApiOperation({ summary: 'Get recent activity log (Admin only)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of activities to return' })
  async getActivityLog(@Query('limit', new ParseIntPipe({ optional: true })) limit?: number) {
    const activities = await this.analyticsService.getActivityLog(limit || 100);
    return {
      success: true,
      message: 'Activity log retrieved',
      data: activities,
    };
  }

  @Get('custom-range')
  @ApiOperation({ summary: 'Get statistics for custom date range (Admin only)' })
  @ApiQuery({ name: 'startDate', required: true, type: String })
  @ApiQuery({ name: 'endDate', required: true, type: String })
  async getCustomRangeStats(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    const stats = await this.analyticsService.getCustomDateRangeStats(
      new Date(startDate),
      new Date(endDate),
    );
    return {
      success: true,
      message: 'Custom range statistics retrieved',
      data: stats,
    };
  }
}
