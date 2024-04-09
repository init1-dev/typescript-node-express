import mongoose, { Types } from "mongoose";

export interface Employee {
    _id: Types.ObjectId;
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

export const employee_types = ['CEO', 'Sales', 'Marketing', 'Support', 'Marketing', 'Receptionist', 'Maintenance', 'Kitchen', 'Rooms'];
export const employeeStatus_list = ['Active', 'Inactive'];

export const EmployeesModel = mongoose.model<Employee>('employees', new mongoose.Schema(
    {
        photo: {type: String, required: true},
        fullname: {type: String, required: true},
        email: {type: String, required: true},
        start_date: {type: String, required: true},
        employee_type: {type: String, required: true, enum: employee_types},
        description: {type: String, required: true},
        phone: {type: String, required: true},
        status: {type: String, required: true, enum: employeeStatus_list},
        password: {type: String, required: true}
    },
    {
        timestamps: true
    }
))