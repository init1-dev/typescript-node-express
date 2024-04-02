import { Employee } from '../interfaces/Employees';
import { employeesDataFile } from '../util/dataFiles';
import { readDataFromFile, writeFile } from '../util/fileOperations';
import { parseResponse } from '../util/parseResponse';
import { Response } from 'express';

const employeesData = readDataFromFile(employeesDataFile) as Employee[];

export const getAllEmployees = (res: Response): Employee[] | void => {
    if(employeesData.length === 0) {
        return parseResponse('Employees not found', res);
    }
    return employeesData;
}

export const getEmployee = (id: number, res: Response): Employee | void => {
    const employee = employeesData.find(employee => employee.id === id);
    if(employee === undefined) {
        return parseResponse('Employee not found', res);
    }
    return employee;
}

export const newEmployee = (data: Employee, res: Response): void => {
    const employeeToAdd = employeesData.findIndex(employee => employee.id === data?.id);
    if(data !== undefined && employeeToAdd === -1) {
        employeesData.push(data);
        writeFile(employeesDataFile, employeesData);
        return parseResponse(`Employee #${data.id} added successfully`, res, 200);
    }
    return parseResponse(`Error creating employee`, res);
}

export const editEmployee = (id: number, data: Employee, res: Response): void => {
    const employeetoEdit = employeesData.findIndex(employee => employee.id === id);
    if(data !== undefined && employeetoEdit !== -1){
        employeesData.splice(employeetoEdit, 1, data);
        writeFile(employeesDataFile, employeesData);
        return parseResponse(`Employee #${id} edited successfully`, res, 200);
    } 
    return parseResponse(`Error editing employee ${id}`, res);
}

export const deleteEmployee = (id: number, res: Response): void => {
    const employeeToDelete = employeesData.findIndex(employee => employee.id === id);
    if(employeeToDelete !== -1){
        employeesData.splice(employeeToDelete, 1);
        writeFile(employeesDataFile, employeesData);
        return parseResponse(`Employee #${id} deleted successfully`, res, 200);
    }
    return parseResponse(`Error deleting employee ${id}`, res);
}