import Joi from "joi";
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

export const bookingSchema = Joi.object({
    full_name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    check_in: Joi.date().iso().required(),
    check_out: Joi.date().iso().required(),
    special_request: Joi.string().allow(''),
    discount: Joi.number().integer().min(0).max(100),
    roomId: Joi.number().integer().required() 
})