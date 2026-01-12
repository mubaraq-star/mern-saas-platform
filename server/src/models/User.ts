import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    subscription: {
        plan: string;
        status: string;
        startDate: Date;
        endDate: Date;
    };
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    subscription: {
        plan: {
            type: String,
            default: 'free',
        },
        status: {
            type: String,
            default: 'inactive',
        },
        startDate: {
            type: Date,
            default: Date.now,
        },
        endDate: {
            type: Date,
            default: null,
        },
    },
}, {
    timestamps: true,
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;