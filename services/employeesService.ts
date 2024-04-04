import { Employee } from '../interfaces/Employees';
import { ResponseStatus } from '../interfaces/responseStatus';
import { employeesDataFile } from '../util/dataFiles';
import { readDataFromFile, writeFile } from '../util/fileOperations';

const employeesData = readDataFromFile(employeesDataFile) as Employee[];

export const getAllEmployees = (): Employee[] => {
    return employeesData;
}

export const getEmployee = (id: number): Employee | undefined => {
    return employeesData.find(employee => employee.id === id);
}

export const newEmployee = (data: Employee): ResponseStatus => {
    const employeeToAdd = employeesData.findIndex(employee => employee.id === data?.id);
    if(data !== undefined && employeeToAdd === -1) {
        employeesData.push(data);
        writeFile(employeesDataFile, employeesData);
        return {
            status: 200,
            message: `Employee #${data.id} added successfully`
        }
    }
    return {
        status: 404,
        message: `Error creating employee`
    }
}

export const editEmployee = (id: number, data: Employee): ResponseStatus => {
    const employeetoEdit = employeesData.findIndex(employee => employee.id === id);
    if(data !== undefined && employeetoEdit !== -1){
        employeesData.splice(employeetoEdit, 1, data);
        writeFile(employeesDataFile, employeesData);
        return {
            status: 200,
            message: `Employee #${id} edited successfully`
        }
    }
    return {
        status: 404,
        message: `Error editing employee ${id}`
    }
}

export const deleteEmployee = (id: number): ResponseStatus => {
    const employeeToDelete = employeesData.findIndex(employee => employee.id === id);
    if(employeeToDelete !== -1){
        employeesData.splice(employeeToDelete, 1);
        writeFile(employeesDataFile, employeesData);
        return {
            status: 200,
            message: `Employee #${id} deleted successfully`
        }
    }
    return {
        status: 404,
        message: `Error deleting employee ${id}`
    }
}