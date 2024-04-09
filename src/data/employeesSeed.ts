// import { faker } from '@faker-js/faker';
import { faker } from '@faker-js/faker';
import { EmployeesModel, employeeStatus_list, employee_types } from '../interfaces/Employees';
import bcrypt from 'bcryptjs';

export const insertEmployeesData = async() => {
    try {
        for (let i = 0; i < 30; i++) {
            const userPassword = faker.internet.password();
            const hashedPassword = await bcrypt.hash(userPassword, 10);

            const newData = new EmployeesModel({
                photo: faker.image.avatarGitHub(),
                fullname: faker.person.fullName(),
                email: faker.internet.email(),
                start_date: faker.date.recent({refDate: new Date(), days: 30}),
                employee_type: faker.helpers.arrayElement(employee_types),
                description: faker.lorem.paragraph(),
                phone: faker.phone.number(),
                status: faker.helpers.arrayElement(employeeStatus_list),
                password: hashedPassword
            })
            console.log(userPassword);
            await newData.save();
        }
    } catch (error) {
        console.error('Error during insertion:', error);
    }
}