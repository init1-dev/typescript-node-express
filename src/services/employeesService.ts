import { AppError } from '../classes/AppError';
import { Employee } from '../models/Employees';
import bcrypt from 'bcryptjs';
import { mySqlConnection } from '../util/mySql/connectionFunctions';
import { runQuery, runQueryAsPacket, selectQuery } from '../util/mySql/querieFunctions';
import { RowDataPacket } from 'mysql2';
import { AddEmployeeQuery, DeleteEmployeeQuery, EditEmployeeQuery, LoginUser, selectEmployeesQuery, selectOneEmployeeQuery } from '../util/mySql/queries/employeeQueries';

type ModelInterface = Employee;

export const getAll = async(): Promise<RowDataPacket[]> => {
    const currentConnection = await mySqlConnection();
    const query = selectEmployeesQuery;
    const results = await selectQuery(query, currentConnection);
    return results;
};

export const getOne = async(id: any): Promise<RowDataPacket[]> => {
    const currentConnection = await mySqlConnection();
    const query = selectOneEmployeeQuery;
    const results = await selectQuery(query, currentConnection, id);
    
    if(results.length === 0){
        throw new AppError(404, 'Not found');
    }
    return results;
};

export const newItem = async(data: ModelInterface) => {
    const currentConnection = await mySqlConnection();
    const query = AddEmployeeQuery;
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const values = Object.values({
        ...data,
        password: hashedPassword
    });
    const headers = await runQuery(query, currentConnection, values, false);
    const results = await runQuery(selectOneEmployeeQuery, currentConnection, [headers.insertId]);
    return results;
};

export const editItem = async(id: any, data: ModelInterface) => {
    const currentConnection = await mySqlConnection();
    const employee = await runQueryAsPacket(selectOneEmployeeQuery, currentConnection, [id], false);

    if(employee.length === 0) {
        throw new AppError(404, "Not found");
    }

    const isPasswordMatch = await bcrypt.compare(data.password, employee[0]?.password);
    let item;
    
    if(!isPasswordMatch && data.password !== "") {
        const hashedPasswordToChange = await bcrypt.hash(data.password, 10);
        const object = Object.values({
            ...data,
            password: hashedPasswordToChange
        });
        item = await runQuery(EditEmployeeQuery, currentConnection, [...object, id], false);
    } else {
        const object = Object.values({
            ...data,
            password: employee[0].password
        });
        item = await runQuery(EditEmployeeQuery, currentConnection, [...object, id], false);
    }

    if(item.affectedRows === 0){
        throw new AppError(404, 'Not found');
    }

    const results = await runQuery(selectOneEmployeeQuery, currentConnection, [id]);

    return results;
};

export const deleteItem = async(id: any) => {
    const currentConnection = await mySqlConnection();
    const query = DeleteEmployeeQuery;
    const results = await runQuery(query, currentConnection, [id]);
    
    if(results.affectedRows === 0){
        throw new AppError(404, 'Not found');
    }
    
    return results;
};

export const employeeLogin = async(username: string): Promise<RowDataPacket[]> => {
    const currentConnection = await mySqlConnection();
    const query = LoginUser;
    const results = await selectQuery(query, currentConnection, username);
    
    if(results.length === 0){
        throw new AppError(404, 'Not found');
    }
    return results;
};

export const isUserExist = async(username: string) => {
    const currentConnection = await mySqlConnection();
    const query = LoginUser;
    const results = await selectQuery(query, currentConnection, username);
    
    if(results.length === 0){
        throw new AppError(404, 'Not found');
    }
    return results[0].email;
};