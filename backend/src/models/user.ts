import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  credits: number;
}

const UserSchema: Schema = new Schema({
    username: { 
        type: String,
        required: true,
        unique: true
    },
    credits: { 
        type: Number,
        default: 10 
    },
});

export const UserModel = mongoose.model<IUser>('User', UserSchema);