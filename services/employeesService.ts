import { Employee } from '../interfaces/Employees';
import { employeesDataFile } from '../Helpers/dataFiles';
import { readDataFromFile, writeFile } from '../Helpers/fileOperations';
import { ParsedResponse, parseResponse } from '../Helpers/parseResponse';

const employeesData = readDataFromFile(employeesDataFile) as Employee[];

export const getAllEmployees = (): Employee[] | ParsedResponse => {
    if(employeesData.length === 0) {
        return parseResponse('Employees not found');
    }
    return employeesData;
}

export const getEmployee = (id: number): Employee | ParsedResponse => {
    const employee = employeesData.find(employee => employee.id === id) || {} as Employee;
    if(employee === undefined) {
        return parseResponse('Employee not found');
    }
    return employee;
}

export const newEmployee = (data: Employee): ParsedResponse => {
    const employeeToAdd = employeesData.findIndex(employee => employee.id === data?.id);
    if(data !== undefined && employeeToAdd === -1) {
        employeesData.push(data);
        writeFile(employeesDataFile, employeesData);
        return parseResponse(`Employee #${data.id} added successfully`, 200);
    }
    return parseResponse(`Error creating employee`);
}

export const editEmployee = (id: number, data: Employee): ParsedResponse => {
    const employeetoEdit = employeesData.findIndex(employee => employee.id === id);
    if(data !== undefined && employeetoEdit !== -1){
        employeesData.splice(employeetoEdit, 1, data);
        writeFile(employeesDataFile, employeesData);
        return parseResponse(`Employee #${id} edited successfully`, 200);
    } 
    return parseResponse(`Error editing employee ${id}`);
}

export const deleteEmployee = (id: number): ParsedResponse => {
    const employeeToDelete = employeesData.findIndex(employee => employee.id === id);
    if(employeeToDelete !== -1){
        employeesData.splice(employeeToDelete, 1);
        writeFile(employeesDataFile, employeesData);
        return parseResponse(`Employee #${id} deleted successfully`, 200);
    }
    return parseResponse(`Error deleting employee ${id}`);
}