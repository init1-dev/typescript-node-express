import { AppError } from '../classes/AppError';
import { Employee, EmployeesModel } from '../interfaces/Employees';
import { Login } from '../interfaces/Login';
import { generateAccessToken } from '../util/generateAccessToken';

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
        const employee = await EmployeesModel.create(data);
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
    if(username === 'init1.dev' && password === '12345'){
        const token = generateAccessToken(username);
        return {
            user: username,
            token: token
        };
    }
    return null;
}