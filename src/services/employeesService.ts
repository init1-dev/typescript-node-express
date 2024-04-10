import { AppError } from '../classes/AppError';
import { Employee, EmployeesModel } from '../models/Employees';
import { Login } from '../interfaces/Login';
import { generateAccessToken } from '../util/generateAccessToken';
import bcrypt from 'bcryptjs';

export const getAllEmployees = async(): Promise<Employee[]> => {
    const employees = await EmployeesModel.find();
    return employees;
}

export const getEmployee = async(id: any): Promise<Employee | null> => {
    const employee = await EmployeesModel.findById(id);
    return employee;
}

export const newEmployee = async(data: Employee): Promise<Employee> => {
    if(data !== undefined) {
        const employeePassword = data.password;
        const hashedPassword = await bcrypt.hash(employeePassword, 10);

        const employee = await EmployeesModel.create({...data, password: hashedPassword});
        return employee;
    }
    throw new AppError(404, 'Error creating employee');
}

export const editEmployee = async(id: any, data: Employee): Promise<Employee | null> => {
    if(data !== undefined){
        const employee = await EmployeesModel.findByIdAndUpdate(id, data, { new: true });
        return employee;
    }
    throw new AppError(404, `Error editing employee #${id}`);
}

export const deleteEmployee = async(id: any): Promise<string> => {
    const employee = await EmployeesModel.findByIdAndDelete(id);
    if(employee){
        return "success";
    }
    throw new AppError(404, `Error deleting employee #${id}`);
}

export const employeeLogin = async(username: string, password: string): Promise<Login | null> => {
    const isUserExist = await EmployeesModel.findOne({email: username});

    if(isUserExist) {
        const isPasswordMatch = await bcrypt.compare(password, isUserExist.password);

        if(isPasswordMatch){
            const token = generateAccessToken(username);
            return {
                user: username,
                token: token
            };
        }
    }

    return null;
}