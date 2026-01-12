import { Request, Response } from 'express';
import { PaymentService } from '../services/payment.service';

class PaymentController {
    async createPayment(req: Request, res: Response) {
        try {
            const paymentData = req.body;
            const payment = await PaymentService.createPayment(paymentData);
            res.status(201).json(payment);
        } catch (error) {
            res.status(500).json({ message: 'Payment creation failed', error });
        }
    }

    async getPayment(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const payment = await PaymentService.getPaymentById(id);
            if (!payment) {
                return res.status(404).json({ message: 'Payment not found' });
            }
            res.status(200).json(payment);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving payment', error });
        }
    }

    async listPayments(req: Request, res: Response) {
        try {
            const payments = await PaymentService.listPayments();
            res.status(200).json(payments);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving payments', error });
        }
    }
}

export const paymentController = new PaymentController();