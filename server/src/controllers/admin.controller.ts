import { Request, Response } from 'express';
import User from '../models/User';
import Subscription from '../models/Subscription';
import Analytics from '../models/Analytics';

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const user = await User.findByIdAndUpdate(id, updates, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};

export const getSubscriptionStats = async (req: Request, res: Response) => {
    try {
        const subscriptions = await Subscription.aggregate([
            {
                $group: {
                    _id: '$plan',
                    total: { $sum: 1 },
                },
            },
        ]);
        res.status(200).json(subscriptions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching subscription stats', error });
    }
};

export const getAnalyticsData = async (req: Request, res: Response) => {
    try {
        const analyticsData = await Analytics.find();
        res.status(200).json(analyticsData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching analytics data', error });
    }
};