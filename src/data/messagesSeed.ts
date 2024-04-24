import { faker } from '@faker-js/faker';
import { Connection } from "mysql2/promise";
import { insertMultipleIntoTable } from '../util/mySql/querieFunctions';

export const insertMessagesData = async(currentConnection: Connection) => {
    const ROWS_TO_INSERT = 10;

    const columns = [
        'full_name',
        'email',
        'phone',
        'subject',
        'message',
        'stars',
        'read_status',
        'archived',
        'photo'
    ];

    const values = [];

    for (let i = 0; i < ROWS_TO_INSERT; i++) {
        values.push([
            faker.person.fullName(),
            faker.internet.email(),
            faker.phone.number(),
            faker.lorem.paragraph(),
            faker.lorem.paragraphs(2),
            faker.number.int({min: 1, max: 5}),
            faker.datatype.boolean({probability: 0.5}),
            faker.datatype.boolean({probability: 0.5}),
            faker.image.avatar()
        ])
    };

    try {
        await insertMultipleIntoTable(
            'message', 
            columns, 
            values, 
            ROWS_TO_INSERT, 
            currentConnection
        );
    } catch (error) {
        console.error('Error during insertion:', error);
    };
}