import { AppError } from '../classes/AppError';
import { Employee } from '../models/Employees';
// import bcrypt from 'bcryptjs';
import { mySqlConnection } from '../util/mySql/connectionFunctions';
import { runQuery, selectQuery } from '../util/mySql/querieFunctions';
import { RowDataPacket } from 'mysql2';
import { DeleteEmployeeQuery, LoginUser, selectEmployeesQuery, selectOneEmployeeQuery } from '../util/mySql/queries/employeeQueries';

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
    console.log(data);
    
    // const employeePassword = data.password;
    // const hashedPassword = await bcrypt.hash(employeePassword, 10);
    
    // const item = await Model.create({...data, password: hashedPassword});
    
    // if(item === null){
    //     throw new AppError(404, `Error adding ${messageString}`);
    // }
    // return item;
    return {};
};

export const editItem = async(id: any, data: ModelInterface) => {
    console.log(id, data);
    
    // const employee = await Model.findById(id);

    // if(employee === null) {
    //     throw new AppError(404, "Not found");
    // }
    
    // const isPasswordMatch = await bcrypt.compare(data.password, employee?.password);
    // let item;
    
    // if(!isPasswordMatch && data.password !== "") {
    //     const hashedPasswordToChange = await bcrypt.hash(data.password, 10);
    //     item = await Model.findByIdAndUpdate(id, {...data, password: hashedPasswordToChange}, { new: true });
    // } else {
    //     item = await Model.findByIdAndUpdate(id, {...data, password: employee.password}, { new: true });
    // }

    // if(item === null){
    //     throw new AppError(404, `Error adding ${messageString}`);
    // }
    // return item;
    return {};
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