export interface Room {
    id: number;
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