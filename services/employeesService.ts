import { Employee } from '../interfaces/Employees';
import { employeesDataFile } from '../Helpers/dataFiles';
import { readDataFromFile, writeFile } from '../Helpers/fileOperations';

const employeesData = readDataFromFile(employeesDataFile) as Employee[];

export const getAllEmployees = (): Employee[] => {
    return employeesData;
}

export const getEmployee = (id: number): Employee => {
    const employee = employeesData.find(employee => employee.id === id) || {} as Employee;
    return employee;
}

export const newEmployee = (data: Employee): string => {
    const employeeToAdd = employeesData.findIndex(employee => employee.id === data?.id);
    if(data !== undefined && employeeToAdd === -1) {
        employeesData.push(data);
        writeFile(employeesDataFile, employeesData);
        return `Employee #${data.id} added successfully`;
    }
    return `Error creating employee`;
}

export const editEmployee = (id: number, data: Employee): string => {
    const employeetoEdit = employeesData.findIndex(employee => employee.id === id);
    if(data !== undefined && employeetoEdit !== -1){
        employeesData.splice(employeetoEdit, 1, data);
        writeFile(employeesDataFile, employeesData);
        return `Employee #${id} edited successfully`;
    } 
    return `Error editing employee ${id}`;
}

export const deleteEmployee = (id: number): string => {
    const employeeToDelete = employeesData.findIndex(employee => employee.id === id);
    if(employeeToDelete !== -1){
        employeesData.splice(employeeToDelete, 1);
        writeFile(employeesDataFile, employeesData);
        return `Employee #${id} deleted successfully`;
    }
    return `Error deleting employee ${id}`;
}