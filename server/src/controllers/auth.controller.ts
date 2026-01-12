import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

class AuthController {
    async register(req: Request, res: Response) {
        try {
            const user = await AuthService.register(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { token, user } = await AuthService.login(req.body);
            res.status(200).json({ token, user });
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }

    async logout(req: Request, res: Response) {
        // Implement logout logic if needed
        res.status(200).json({ message: 'Logged out successfully' });
    }

    async resetPassword(req: Request, res: Response) {
        try {
            await AuthService.resetPassword(req.body);
            res.status(200).json({ message: 'Password reset successfully' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default new AuthController();