import { AppError } from '../classes/AppError';
import { Employee, EmployeesModel } from '../models/Employees';
import { Login } from '../interfaces/Login';
import { generateAccessToken } from '../util/generateAccessToken';
import bcrypt from 'bcryptjs';

export const getAllEmployees = async(): Promise<Employee[]> => {
    try {
        const employees = await EmployeesModel.find();
        return employees;
    } catch (error) {
        throw new AppError(404, 'Not found');
    }
}

export const getEmployee = async(id: any): Promise<Employee | null> => {
    try {
        const employee = await EmployeesModel.findById(id);
        return employee;
    } catch (error) {
        throw new AppError(404, 'Not found');   
    }
}

export const newEmployee = async(data: Employee): Promise<Employee> => {
    try {
        const employeePassword = data.password;
        const hashedPassword = await bcrypt.hash(employeePassword, 10);
        
        const employee = await EmployeesModel.create({...data, password: hashedPassword});
        return employee;
    } catch (error) {
        throw new AppError(404, 'Error creating employee');
    }
}

export const editEmployee = async(id: any, data: Employee): Promise<Employee | null> => {
    try {
        const employee = await EmployeesModel.findById(id);
        const hashedPasswordToChange = await bcrypt.hash(data.password, 10);
        
        if(employee?.password === hashedPasswordToChange) {
            
        }

        
        return employee;
    } catch (error) {
        throw new AppError(404, `Error editing employee #${id}`);
    }
}

export const deleteEmployee = async(id: any): Promise<string> => {
    try {
        await EmployeesModel.findByIdAndDelete(id);
        return "success";
    } catch (error) {
        throw new AppError(404, `Error deleting employee #${id}`);
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