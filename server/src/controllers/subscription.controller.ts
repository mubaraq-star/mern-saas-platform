import { Request, Response } from 'express';
import Subscription from '../models/Subscription';
import User from '../models/User';
import { PaymentService } from '../services/payment.service';

export class SubscriptionController {
    async createSubscription(req: Request, res: Response) {
        const { userId, planId } = req.body;

        try {
            const subscription = await Subscription.create({ userId, planId });
            res.status(201).json(subscription);
        } catch (error) {
            res.status(500).json({ message: 'Error creating subscription', error });
        }
    }

    async getSubscriptionStatus(req: Request, res: Response) {
        const { userId } = req.params;

        try {
            const subscription = await Subscription.findOne({ userId });
            if (!subscription) {
                return res.status(404).json({ message: 'Subscription not found' });
            }
            res.status(200).json(subscription);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching subscription status', error });
        }
    }

    async updateSubscription(req: Request, res: Response) {
        const { userId, planId } = req.body;

        try {
            const subscription = await Subscription.findOneAndUpdate(
                { userId },
                { planId },
                { new: true }
            );
            if (!subscription) {
                return res.status(404).json({ message: 'Subscription not found' });
            }
            res.status(200).json(subscription);
        } catch (error) {
            res.status(500).json({ message: 'Error updating subscription', error });
        }
    }

    async cancelSubscription(req: Request, res: Response) {
        const { userId } = req.params;

        try {
            const subscription = await Subscription.findOneAndDelete({ userId });
            if (!subscription) {
                return res.status(404).json({ message: 'Subscription not found' });
            }
            res.status(200).json({ message: 'Subscription canceled successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error canceling subscription', error });
        }
    }
}