import mongoose from "mongoose";
import { Room } from "./Rooms";

export interface Booking {
    full_name: string;
    email: string;
    phone: string;
    image: string;
    check_in: string;
    check_out: string;
    order_date: string;
    special_request: string;
    discount: number;
    status: string;
    roomInfo?: Room;
}

export const BookingStatus_list = ['In Progress', 'Check In', 'Check Out'];

export const BookingModel = mongoose.model<Booking>('bookings', new mongoose.Schema(
    {
        full_name: {type: String, required: true},
        email: {type: String, required: true},
        phone: {type: String, required: true},
        image: {type: String, required: true},
        check_in: {type: String, required: true},
        check_out: {type: String, required: true},
        order_date: {type: String, required: true},
        special_request: {type: String, required: true},
        discount: {type: Number, required: true},
        status: {type: String, required: true, enum: BookingStatus_list},
        roomInfo: {type: mongoose.Schema.Types.ObjectId, ref: 'rooms'}
    },
    {
        timestamps: true
    }
))