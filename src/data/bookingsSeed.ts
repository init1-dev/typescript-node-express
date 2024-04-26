import { faker } from '@faker-js/faker';
import { BookingStatus_list } from "../models/Bookings";
import { Connection } from 'mysql2/promise';
import { ROWS_TO_INSERT } from './roomsSeed';
import { formatDateToSql } from '../util/mySql/querieFunctions';
import { insertMultipleIntoTable } from '../util/mySql/seedDataFunctions';


const generateCheckInDate = (): Date => {
    return faker.date.recent({refDate: new Date(), days: 30});
}

const generateCheckOutDate = (checkInDate: Date): Date => {
    const endDate = new Date().setDate(checkInDate.getDate() + 30);
    return faker.date.between({from: checkInDate, to:endDate});
}

export const insertBookingsData = async(currentConnection: Connection) => {
    const ROOMS_TO_INSERT = ROWS_TO_INSERT;
    const BOOKINGS_TO_INSERT = 10;
    
    const bookingColumns = [
        'full_name',
        'email',
        'phone',
        'check_in',
        'check_out',
        'order_date',
        'special_request',
        'discount',
        'status',
        'room_id'
    ];

    const bookingValues = [];

    for (let i = 0; i < ROOMS_TO_INSERT; i++) {
        const checkInDate = generateCheckInDate();
        const checkOutDate = generateCheckOutDate(checkInDate);

        bookingValues.push([
            faker.person.fullName(),
            faker.internet.email(),
            faker.phone.number(),
            formatDateToSql(checkInDate),
            formatDateToSql(checkOutDate),
            formatDateToSql(Date.now()),
            faker.lorem.paragraphs(2),
            Math.round(faker.number.float() * 20) * 5,
            faker.helpers.arrayElement(BookingStatus_list),
            faker.number.int({min: 1, max: ROOMS_TO_INSERT})
        ])
    };

    try {
        await insertMultipleIntoTable(
            'booking',
            bookingColumns,
            bookingValues,
            BOOKINGS_TO_INSERT,
            currentConnection
        );
        
    } catch (error) {
        console.error('Error during insertion:', error);
    };
}