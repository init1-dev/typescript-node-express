import { AppError } from '../classes/AppError';
import { Employee, EmployeesModel } from '../models/Employees';
import bcrypt from 'bcryptjs';

const Model = EmployeesModel;
const messageString = "employee";
type ModelInterface = Employee;

export const getAll = async(): Promise<ModelInterface[]> => {
    const items = await Model.find();
    return items;
}

export const getOne = async(id: any): Promise<ModelInterface> => {
    const item = await Model.findById(id);
    if(item === null){
        throw new AppError(404, 'Not found');
    }
    return item;
}

export const newItem = async(data: ModelInterface): Promise<ModelInterface> => {
    const employeePassword = data.password;
    const hashedPassword = await bcrypt.hash(employeePassword, 10);
    
    const item = await Model.create({...data, password: hashedPassword});
    
    if(item === null){
        throw new AppError(404, `Error adding ${messageString}`);
    }
    return item;
}

export const editItem = async(id: any, data: ModelInterface): Promise<ModelInterface> => {
    const employee = await Model.findById(id);

    if(employee === null) {
        throw new AppError(404, "Not found");
    }
    
    const isPasswordMatch = await bcrypt.compare(data.password, employee?.password);
    let item;
    
    if(!isPasswordMatch && data.password !== "") {
        const hashedPasswordToChange = await bcrypt.hash(data.password, 10);
        item = await Model.findByIdAndUpdate(id, {...data, password: hashedPasswordToChange}, { new: true });
    } else {
        item = await Model.findByIdAndUpdate(id, {...data, password: employee.password}, { new: true });
    }

    if(item === null){
        throw new AppError(404, `Error adding ${messageString}`);
    }
    return item;
}

export const deleteItem = async(id: any): Promise<ModelInterface> => {
    const item = await Model.findByIdAndDelete(id);
    if(item === null){
        throw new AppError(404, `Error deleting ${messageString}`);
    }
    return item;
}

export const employeeLogin = async(username: string): Promise<ModelInterface | null> => {
    const isUserExist = await Model.findOne({email: username});
    if(isUserExist === null) {
        throw new AppError(404, `Error getting ${messageString}`);
    }
    return isUserExist;
}

export const isUserExist = async(username: string): Promise<ModelInterface | null> => {
    const item = await Model.findOne({email: username});
    return item;
}