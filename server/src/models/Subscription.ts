import mongoose, { Document, Schema } from 'mongoose';

interface ISubscription extends Document {
    userId: mongoose.Types.ObjectId;
    plan: string;
    startDate: Date;
    endDate: Date;
    status: 'active' | 'inactive' | 'cancelled';
}

const SubscriptionSchema: Schema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    plan: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'cancelled'],
        default: 'active'
    }
});

const Subscription = mongoose.model<ISubscription>('Subscription', SubscriptionSchema);

export default Subscription;