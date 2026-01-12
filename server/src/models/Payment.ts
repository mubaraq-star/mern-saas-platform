import mongoose, { Document, Schema } from 'mongoose';

export interface IPayment extends Document {
    userId: mongoose.Types.ObjectId;
    amount: number;
    currency: string;
    paymentMethod: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

const PaymentSchema: Schema = new Schema({
    userId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    status: { type: String, required: true, enum: ['pending', 'completed', 'failed'], default: 'pending' },
}, {
    timestamps: true,
});

export default mongoose.model<IPayment>('Payment', PaymentSchema);