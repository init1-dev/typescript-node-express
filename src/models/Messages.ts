import mongoose, { Types } from "mongoose";

export interface Message {
    _id: Types.ObjectId;
    full_name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    stars: number;
    read: boolean;
    archived: boolean;
    foto: string;
}

export const MessagesModel = mongoose.model<Message>('messages', new mongoose.Schema(
    {
        full_name: {type: String, required: true},
        email: {type: String, required: true},
        phone: {type: String, required: true},
        subject: {type: String, required: true},
        message: {type: String, required: true},
        stars: {type: Number, required: true},
        read: {type: Boolean, required: true},
        archived: {type: Boolean, required: true},
        foto: {type: String, required: true}
    },
    {
        timestamps: true
    }
))