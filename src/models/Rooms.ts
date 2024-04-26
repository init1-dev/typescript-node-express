import Joi from "joi";

export interface Room {
    name: string;
    photo: string;
    room_type: string;
    room_number: number;
    description: string;
    offer: boolean;
    price: number;
    cancellation: string;
    amenities: number[];
    discount: number;
    status: string;
}

export const room_types = ['Single Bed', 'Double bed', 'Double Superior', 'Suite'];
export const amenities_list = ['Breakfast', 'Smart Security', 'Strong Locker', 'Shower', '24/7 Online Support', 'Kitchen', 'Cleaning', 'Expert Team', 'High Speed Wifi', 'Air Conditioner', 'Towels', 'Grocery', 'Single Bed', 'Shop Near'];
export const roomStatus_list = ['Available', 'Booked'];

export const roomSchema = Joi.object({
    name: Joi.string().required(),
    photo: Joi.string().required(),
    room_type_id: Joi.number().integer().required(),
    room_number: Joi.number().integer().required(),
    description: Joi.string().required().required(),
    offer: Joi.boolean().required(),
    price: Joi.number().integer().required(),
    cancellation: Joi.string().required().required(),
    discount: Joi.number().integer().min(0).max(100).required(),
    status: Joi.string().required(),
    amenities: Joi.array().items(Joi.number().integer()).required()
})