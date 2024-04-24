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