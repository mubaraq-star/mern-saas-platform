import { Request, Response } from 'express';
import AnalyticsService from '../services/analytics.service';

class AnalyticsController {
    async getUserAnalytics(req: Request, res: Response) {
        try {
            const userId = req.user.id; // Assuming user ID is stored in req.user
            const analyticsData = await AnalyticsService.getUserAnalytics(userId);
            res.status(200).json(analyticsData);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving analytics data', error });
        }
    }

    async getSystemAnalytics(req: Request, res: Response) {
        try {
            const analyticsData = await AnalyticsService.getSystemAnalytics();
            res.status(200).json(analyticsData);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving system analytics data', error });
        }
    }
}

export default new AnalyticsController();