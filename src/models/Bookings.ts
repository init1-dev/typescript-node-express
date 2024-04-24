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