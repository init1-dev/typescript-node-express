export interface Room {
    name: string;
    photo: string;
    room_type: string;
    room_number: number;
    description: string;
    offer: boolean;
    price: number;
    cancellation: string;
    amenities: string[];
    discount: number;
    status: string;
}

export const room_types = ['Single Bed', 'Double bed', 'Double Superior', 'Suite'];
export const amenities_list = ['Breakfast', 'Smart Security', 'Strong Locker', 'Shower', '24/7 Online Support', 'Kitchen', 'Cleaning', 'Expert Team', 'High Speed Wifi', 'Air Conditioner', 'Towels', 'Grocery', 'Single Bed', 'Shop Near'];
export const roomStatus_list = ['Available', 'Booked'];