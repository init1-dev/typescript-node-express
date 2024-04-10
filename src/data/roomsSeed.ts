import { faker } from '@faker-js/faker';
import { RoomsModel, amenities_list, roomStatus_list, room_types } from "../models/Rooms";

const PRICE_TO_CENTS = 100;

export const insertRoomsData = async() => {
    try {
        console.log("Inserting rooms data..");
        const UUID_LIST = [];

        for (let i = 0; i < 30; i++) {
            const newData = new RoomsModel({
                name: faker.commerce.productName(),
                photo: faker.image.urlPicsumPhotos(),
                room_type: faker.helpers.arrayElement(room_types),
                room_number: i + 1,
                description: faker.lorem.paragraph(),
                price: faker.commerce.price({min: (250 * PRICE_TO_CENTS) , max: (500 * PRICE_TO_CENTS)}),
                offer: faker.datatype.boolean({probability: 0.5}),
                cancellation: faker.lorem.paragraphs(2),
                amenities: faker.helpers.arrayElements(amenities_list, {min: 1, max: amenities_list.length}),
                discount: faker.number.int({min: 0, max: 100}),
                status: faker.helpers.arrayElement(roomStatus_list)
            })
            const itemAdded = await newData.save();
            UUID_LIST.push(itemAdded._id);
        }
        console.log("Rooms data inserted successfully\n");
        return UUID_LIST;
    } catch (error) {
        console.error('Error during insertion:', error);
    }
}