import { Request, Response } from 'express';
import User from '../models/User';

// Fetch user details
export const getUserDetails = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id; // Assuming user ID is stored in req.user
        const user = await User.findById(userId).select('-password'); // Exclude password from response
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update user details
export const updateUserDetails = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true }).select('-password');
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete user account
export const deleteUserAccount = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User account deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};