import Joi from "joi";

export interface Message {
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

export const messageSchema = Joi.object({
    fullname: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    subject: Joi.string().required(),
    message: Joi.string().required(),
    stars: Joi.number().integer().min(1).max(5).required()
})