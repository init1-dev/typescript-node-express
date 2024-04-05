import { AppError } from '../classes/AppError';
import { Employee } from '../interfaces/Employees';
import { employeesDataFile } from '../util/dataFiles';
import { readDataFromFile, writeFile } from '../util/fileOperations';

export const getAllEmployees = (): Employee[] => {
    const employeesData = readDataFromFile(employeesDataFile) as Employee[];
    return employeesData;
}

export const getEmployee = (id: number): Employee | undefined => {
    return getAllEmployees().find(employee => employee.id === id);
}

export const newEmployee = (data: Employee): Employee => {
    const item = getAllEmployees();
    const itemToAdd = item.findIndex(employee => employee.id === data?.id);
    if(data !== undefined && itemToAdd === -1) {
        item.push(data);
        writeFile(employeesDataFile, item);
        return data;
    }
    throw new AppError(404, 'Error creating employee');
}

export const editEmployee = (id: number, data: Employee): Employee => {
    const item = getAllEmployees();
    const itemToEdit = item.findIndex(employee => employee.id === id);
    if(data !== undefined && itemToEdit !== -1){
        item.splice(itemToEdit, 1, data);
        writeFile(employeesDataFile, item);
        return item[itemToEdit];
    }
    throw new AppError(404, `Error editing employee #${id}`);
}

export const deleteEmployee = (id: number): string => {
    const item = getAllEmployees();
    const itemToDelete = item.findIndex(employee => employee.id === id);
    if(itemToDelete !== -1){
        item.splice(itemToDelete, 1);
        writeFile(employeesDataFile, item);
        return "success";
    }
    throw new AppError(404, `Error deleting employee #${id}`);
}