import Joi from "joi";

export interface Employee {
    _id?: string,
    photo: string;
    fullname: string;
    email: string;
    start_date: string;
    employee_type: string;
    description: string;
    phone: string;
    status: String;
    password: string;
}

export const employee_types = ['CEO', 'Sales', 'Support', 'Marketing', 'Receptionist', 'Maintenance', 'Kitchen', 'Rooms'];
export const employeeStatus_list = ['Active', 'Inactive'];

export const employeeSchema = Joi.object({
    photo: Joi.string().required(),
    fullname: Joi.string().required(),
    email: Joi.string().required(),
    start_date: Joi.date().iso().required(),
    employee_type_id: Joi.number().integer().required(),
    description: Joi.string().required(),
    phone: Joi.string().required(),
    password: Joi.string().allow(''),
    status: Joi.string().required()
})