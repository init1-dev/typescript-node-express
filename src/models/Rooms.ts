import mongoose from "mongoose";

export interface Room {
    name: string;
    photo: string;
    room_type: string;
    room_number: number;
    description: string;
    offer: number;
    price: number;
    cancellation: string;
    amenities: string[];
    discount: number;
    status: string;
}

export const room_types = ['Single Bed', 'Double bed', 'Double Superior', 'Suite'];
export const amenities_list = ['Breakfast', 'Smart Security', 'Strong Locker', 'Shower', '24/7 Online Support', 'Kitchen', 'Cleaning', 'Expert Team', 'High Speed Wifi', 'Air Conditioner', 'Towels', 'Grocery', 'Single Bed', 'Shop Near'];
export const roomStatus_list = ['Available', 'Booked'];

export const RoomsModel = mongoose.model<Room>('rooms', new mongoose.Schema(
    {
        name: {type: String, required: true},
        photo: {type: String, required: true},
        room_type: {type: String, required: true, enum: room_types},
        room_number: {type: Number, required: true},
        description: {type: String, required: true},
        offer: {type: Number, required: true},
        price: {type: Number, required: true},
        cancellation: {type: String, required: true},
        amenities: {type: [String], required: true, enum: amenities_list},
        discount: {type: Number, required: true},
        status: {type: String, required: true, enum: roomStatus_list}
    },
    {
        timestamps: true
    }
))