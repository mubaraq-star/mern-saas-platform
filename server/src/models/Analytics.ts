import mongoose, { Document, Schema } from 'mongoose';

interface IAnalytics extends Document {
    userId: mongoose.Types.ObjectId;
    pageViews: number;
    uniqueVisitors: number;
    subscriptions: number;
    createdAt: Date;
    updatedAt: Date;
}

const AnalyticsSchema: Schema = new Schema({
    userId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    pageViews: { type: Number, default: 0 },
    uniqueVisitors: { type: Number, default: 0 },
    subscriptions: { type: Number, default: 0 },
}, {
    timestamps: true,
});

const Analytics = mongoose.model<IAnalytics>('Analytics', AnalyticsSchema);

export default Analytics;