// import { faker } from '@faker-js/faker';
import { EmployeesModel } from '../interfaces/Employees';

export const insertEmployeesData = async() => {
    try {
        for (let i = 0; i < 30; i++) {
            const newData = new EmployeesModel({
                
            })
            console.log(newData);
        }
    } catch (error) {
        console.error('Error during insertion:', error);
    }
}