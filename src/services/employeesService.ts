import { AppError } from '../classes/AppError';
import { Employee, EmployeesModel } from '../models/Employees';
import { Login } from '../interfaces/Login';
import { generateAccessToken } from '../util/generateAccessToken';
import bcrypt from 'bcryptjs';

export const getAllEmployees = async(): Promise<Employee[]> => {
    try {
        return await EmployeesModel.find();
    } catch (error) {
        throw new AppError(500, 'Internal Server Error');
    }
}

export const getEmployee = async(id: any): Promise<Employee | null> => {
    try {
        return await EmployeesModel.findById(id);
    } catch (error) {
        throw new AppError(500, 'Internal Server Error');
    }
}

export const newEmployee = async(data: Employee): Promise<Employee> => {
    try {
        const employeePassword = data.password;
        const hashedPassword = await bcrypt.hash(employeePassword, 10);
        
        return await EmployeesModel.create({...data, password: hashedPassword});
    } catch (error) {
        throw new AppError(500, 'Internal Server Error');
    }
}

export const editEmployee = async(id: any, data: Employee): Promise<Employee | null> => {
    try {
        const employee = await EmployeesModel.findById(id);
        const hashedPasswordToChange = await bcrypt.hash(data.password, 10);
        
        if(employee?.password !== hashedPasswordToChange) {
            return await EmployeesModel.findByIdAndUpdate(id, {...data, password: hashedPasswordToChange}, { new: true });
        } else {
            return await EmployeesModel.findByIdAndUpdate(id, data, { new: true });
        }
    } catch (error) {
        throw new AppError(500, 'Internal Server Error');
    }
}

export const deleteEmployee = async(id: any): Promise<Employee | null> => {
    try {
        return await EmployeesModel.findByIdAndDelete(id);
    } catch (error) {
        throw new AppError(500, 'Internal Server Error');
    }
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