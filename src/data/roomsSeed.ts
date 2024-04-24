import { faker } from '@faker-js/faker';
import { Connection } from 'mysql2/promise';
import { insertMultipleIntoTable, insertIntoTableFromArray } from '../util/mySql/querieFunctions';
import { amenities_list, roomStatus_list, room_types } from '../models/Rooms';

export const ROWS_TO_INSERT = 10;

export const insertRoomsData = async(currentConnection: Connection) => {
    const PRICE_TO_CENTS = 100;
    const AMENITY_MULTIPLIER = 10;

    const roomColumns = [
        'name',
        'photo',
        'room_type_id',
        'room_number',
        'description',
        'price',
        'offer',
        'cancellation',
        'discount',
        'status'
    ];

    const roomValues = [];

    for (let i = 0; i < ROWS_TO_INSERT; i++) {
        roomValues.push([
            faker.commerce.productName(),
            faker.image.urlLoremFlickr({ category: 'hotel,bedroom' }),
            faker.number.int({min: 1, max: room_types.length}),
            faker.number.int({min: 1, max: 500}),
            faker.lorem.paragraph(),
            faker.commerce.price({min: (250 * PRICE_TO_CENTS) , max: (500 * PRICE_TO_CENTS)}),
            faker.datatype.boolean({probability: 0.5}),
            faker.lorem.paragraphs(2),
            Math.round(faker.number.float() * 20) * 5,
            faker.helpers.arrayElement(roomStatus_list)
        ])
    };

    const room_amenities_columns = ['room_id', 'amenity_id'];
    
    const room_amenities_values: Array<any> = [];

    for (let i = 0; i < (ROWS_TO_INSERT * AMENITY_MULTIPLIER); i++) {
        const valueToInsert = [
            faker.number.int({min: 1, max: ROWS_TO_INSERT}),
            faker.number.int({min: 1, max: amenities_list.length})
        ]

        const valueString = JSON.stringify(valueToInsert);

        if(!room_amenities_values.some(value => JSON.stringify(value) === valueString)){
            room_amenities_values.push(valueToInsert);
        }
    };

    try {
        await insertIntoTableFromArray('room_type', room_types, currentConnection);
        await insertIntoTableFromArray('amenity', amenities_list, currentConnection);

        await insertMultipleIntoTable(
            'room', 
            roomColumns, 
            roomValues, 
            ROWS_TO_INSERT, 
            currentConnection
        );

        await insertMultipleIntoTable(
            'room_amenities',
            room_amenities_columns,
            room_amenities_values,
            ROWS_TO_INSERT * AMENITY_MULTIPLIER,
            currentConnection
        )
    } catch (error) {
        console.error('Error during insertion:', error);
    };
}

// const UUID_LIST = [];

// for (let i = 0; i < 30; i++) {
//     const newData = new RoomsModel({
//         name: faker.commerce.productName(),
//         photo: faker.image.urlLoremFlickr({ category: 'hotel,bedroom' }),
//         room_type: faker.helpers.arrayElement(room_types),
//         room_number: i + 1,
//         description: faker.lorem.paragraph(),
//         price: faker.commerce.price({min: (250 * PRICE_TO_CENTS) , max: (500 * PRICE_TO_CENTS)}),
//         offer: faker.datatype.boolean({probability: 0.5}),
//         cancellation: faker.lorem.paragraphs(2),
//         amenities: faker.helpers.arrayElements(amenities_list, {min: 1, max: amenities_list.length}),
//         discount: Math.round(faker.number.float() * 20) * 5,
//         status: faker.helpers.arrayElement(roomStatus_list)
//     })
//     const itemAdded = await newData.save();
//     UUID_LIST.push(itemAdded._id);
// }
// console.log("Rooms data inserted successfully\n");
// return UUID_LIST;