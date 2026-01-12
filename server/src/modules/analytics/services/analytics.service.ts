import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../users/schemas/user.schema';
import { Subscription, SubscriptionDocument } from '../../subscriptions/schemas/subscription.schema';
import { Payment, PaymentDocument } from '../../payments/schemas/payment.schema';
import { UserRole, SubscriptionPlan, PaymentStatus } from '../../../common/enums';

interface DateRange {
  startDate?: Date;
  endDate?: Date;
}

@Injectable()
export class AnalyticsService {
  private readonly logger = new Logger(AnalyticsService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Subscription.name) private subscriptionModel: Model<SubscriptionDocument>,
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
  ) {}

  async getUserStats() {
    const totalUsers = await this.userModel.countDocuments();
    const activeUsers = await this.userModel.countDocuments({ isActive: true });
    const inactiveUsers = totalUsers - activeUsers;
    const verifiedUsers = await this.userModel.countDocuments({ isEmailVerified: true });

    // User roles breakdown
    const roleStats = await this.userModel.aggregate([
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 },
        },
      },
    ]);

    const roles = {
      [UserRole.USER]: 0,
      [UserRole.PREMIUM]: 0,
      [UserRole.ADMIN]: 0,
    };

    roleStats.forEach((stat) => {
      roles[stat._id as UserRole] = stat.count;
    });

    return {
      totalUsers,
      activeUsers,
      inactiveUsers,
      verifiedUsers,
      roles,
    };
  }

  async getUserGrowth(days: number = 30): Promise<any[]> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const growth = await this.userModel.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    return growth.map((item) => ({
      date: item._id,
      newUsers: item.count,
    }));
  }

  async getSubscriptionStats() {
    const totalSubscriptions = await this.subscriptionModel.countDocuments();
    const activeSubscriptions = await this.subscriptionModel.countDocuments({
      status: 'active',
    });

    // Subscriptions by plan
    const planStats = await this.subscriptionModel.aggregate([
      {
        $group: {
          _id: '$plan',
          count: { $sum: 1 },
        },
      },
    ]);

    const plans = {
      [SubscriptionPlan.FREE]: 0,
      [SubscriptionPlan.BASIC]: 0,
      [SubscriptionPlan.PREMIUM]: 0,
    };

    planStats.forEach((stat) => {
      plans[stat._id as SubscriptionPlan] = stat.count;
    });

    // Churn rate (subscriptions set to cancel)
    const scheduledCancellations = await this.subscriptionModel.countDocuments({
      cancelAtPeriodEnd: true,
    });

    return {
      totalSubscriptions,
      activeSubscriptions,
      scheduledCancellations,
      churnRate: activeSubscriptions > 0 ? (scheduledCancellations / activeSubscriptions) * 100 : 0,
      planDistribution: plans,
    };
  }

  async getRevenueStats(dateRange?: DateRange) {
    const matchStage: any = {
      status: PaymentStatus.SUCCEEDED,
    };

    if (dateRange?.startDate || dateRange?.endDate) {
      matchStage.paidAt = {};
      if (dateRange.startDate) matchStage.paidAt.$gte = dateRange.startDate;
      if (dateRange.endDate) matchStage.paidAt.$lte = dateRange.endDate;
    }

    const revenueData = await this.paymentModel.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$amount' },
          totalPayments: { $sum: 1 },
          averagePayment: { $avg: '$amount' },
        },
      },
    ]);

    const result = revenueData[0] || {
      totalRevenue: 0,
      totalPayments: 0,
      averagePayment: 0,
    };

    // Monthly recurring revenue (MRR)
    const subscriptions = await this.subscriptionModel.find({ status: 'active' });
    const mrr = subscriptions.reduce((sum, sub) => sum + (sub.amount || 0), 0);

    return {
      totalRevenue: result.totalRevenue / 100, // Convert from cents to dollars
      totalPayments: result.totalPayments,
      averagePayment: result.averagePayment / 100,
      monthlyRecurringRevenue: mrr / 100,
      annualRunRate: (mrr * 12) / 100,
    };
  }

  async getRevenueByPeriod(days: number = 30): Promise<any[]> {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const revenue = await this.paymentModel.aggregate([
      {
        $match: {
          status: PaymentStatus.SUCCEEDED,
          paidAt: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$paidAt' },
          },
          revenue: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    return revenue.map((item) => ({
      date: item._id,
      revenue: item.revenue / 100,
      transactions: item.count,
    }));
  }

  async getPaymentStats() {
    const totalPayments = await this.paymentModel.countDocuments();
    const successfulPayments = await this.paymentModel.countDocuments({
      status: PaymentStatus.SUCCEEDED,
    });
    const failedPayments = await this.paymentModel.countDocuments({
      status: PaymentStatus.FAILED,
    });
    const pendingPayments = await this.paymentModel.countDocuments({
      status: PaymentStatus.PENDING,
    });

    const successRate = totalPayments > 0 ? (successfulPayments / totalPayments) * 100 : 0;

    return {
      totalPayments,
      successfulPayments,
      failedPayments,
      pendingPayments,
      successRate,
    };
  }

  async getDashboardOverview() {
    const [userStats, subscriptionStats, revenueStats, paymentStats] = await Promise.all([
      this.getUserStats(),
      this.getSubscriptionStats(),
      this.getRevenueStats(),
      this.getPaymentStats(),
    ]);

    return {
      users: userStats,
      subscriptions: subscriptionStats,
      revenue: revenueStats,
      payments: paymentStats,
      generatedAt: new Date(),
    };
  }

  async getActivityLog(limit: number = 100): Promise<any[]> {
    // Get recent user registrations
    const recentUsers = await this.userModel
      .find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('email firstName lastName createdAt')
      .lean();

    const activities = recentUsers.map((user) => ({
      type: 'user_registered',
      description: `${user.firstName} ${user.lastName} registered`,
      email: user.email,
      timestamp: user.createdAt,
    }));

    // Get recent payments
    const recentPayments = await this.paymentModel
      .find({ status: PaymentStatus.SUCCEEDED })
      .sort({ paidAt: -1 })
      .limit(limit)
      .populate('userId', 'email firstName lastName')
      .lean();

    const paymentActivities = recentPayments.map((payment: any) => ({
      type: 'payment_received',
      description: `Payment of $${(payment.amount / 100).toFixed(2)} received`,
      email: payment.userId?.email,
      timestamp: payment.paidAt,
    }));

    // Combine and sort
    const allActivities = [...activities, ...paymentActivities]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);

    return allActivities;
  }

  async getCustomDateRangeStats(startDate: Date, endDate: Date) {
    const userGrowth = await this.userModel.countDocuments({
      createdAt: { $gte: startDate, $lte: endDate },
    });

    const revenueStats = await this.getRevenueStats({ startDate, endDate });

    const newSubscriptions = await this.subscriptionModel.countDocuments({
      createdAt: { $gte: startDate, $lte: endDate },
    });

    return {
      dateRange: { startDate, endDate },
      newUsers: userGrowth,
      newSubscriptions,
      revenue: revenueStats,
    };
  }
}
