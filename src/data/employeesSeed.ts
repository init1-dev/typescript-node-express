import { faker } from '@faker-js/faker';
import { Connection } from "mysql2/promise";
import { employeeStatus_list, employee_types } from '../models/Employees';
import bcrypt from 'bcryptjs';
import { formatDateToSql, insertIntoTableFromArray } from '../util/mySql/querieFunctions';
import { insertMultipleIntoTable } from '../util/mySql/seedDataFunctions';

export const insertEmployeesData = async(currentConnection: Connection) => {
    const ROWS_TO_INSERT = 10;
    const HASH_SALT = 10;
    const DEFAULT_PASSWORD = '12345';

    const columns = [
        'photo',
        'fullname',
        'email',
        'start_date',
        'employee_type_id',
        'description',
        'phone',
        'employee_status',
        'password'
    ];

    const values = [];

    for (let i = 0; i < ROWS_TO_INSERT; i++) {
        const startDate = formatDateToSql(faker.date.recent({refDate: new Date(), days: 30}));

        values.push([
            faker.image.avatarGitHub(),
            faker.person.fullName(),
            faker.internet.email(),
            startDate,
            faker.number.int({min: 1, max: employee_types.length}),
            faker.lorem.paragraph(),
            faker.phone.number(),
            faker.helpers.arrayElement(employeeStatus_list),
            bcrypt.hashSync(DEFAULT_PASSWORD, HASH_SALT)
        ])
    };

    try {
        await insertIntoTableFromArray('employee_type', employee_types, currentConnection);

        await insertMultipleIntoTable(
            'employee', 
            columns, 
            values, 
            ROWS_TO_INSERT, 
            currentConnection
        );
    } catch (error) {
        console.error('Error during insertion:', error);
    };
}