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
    const items = getAllEmployees();
    const itemToAdd = items.findIndex(employee => employee.id === data?.id);
    if(data !== undefined && itemToAdd === -1) {
        items.push(data);
        writeFile(employeesDataFile, items);
        return data;
    }
    throw new AppError(404, 'Error creating employee');
}

export const editEmployee = (id: number, data: Employee): Employee => {
    const items = getAllEmployees();
    const itemToEdit = items.findIndex(employee => employee.id === id);
    if(data !== undefined && itemToEdit !== -1){
        items.splice(itemToEdit, 1, data);
        writeFile(employeesDataFile, items);
        return items[itemToEdit];
    }
    throw new AppError(404, `Error editing employee #${id}`);
}

export const deleteEmployee = (id: number): string => {
    const items = getAllEmployees();
    const itemToDelete = items.findIndex(employee => employee.id === id);
    if(itemToDelete !== -1){
        items.splice(itemToDelete, 1);
        writeFile(employeesDataFile, items);
        return "success";
    }
    throw new AppError(404, `Error deleting employee #${id}`);
}