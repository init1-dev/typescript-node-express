import { faker } from '@faker-js/faker';
import { Types } from "mongoose";
import { BookingModel, BookingStatus_list } from "../models/Bookings";

const generateCheckInDate = (): Date => {
    return faker.date.recent({refDate: new Date(), days: 30});
}

const generateCheckOutDate = (checkInDate: Date): Date => {
    const endDate = new Date().setDate(checkInDate.getDate() + 30);
    return faker.date.between({from: checkInDate, to:endDate});
}

const getRandomId = (idList: Types.ObjectId[] | undefined) => {
    if(idList){
        return idList[faker.number.int({min: 0, max: idList.length - 1})]
    }
}

export const insertBookingsData = async(roomsIds: Types.ObjectId[] | undefined) => {
    try {
        console.log("Inserting bookings data..");
        for (let i = 0; i < 50; i++) {
            const checkInDate = generateCheckInDate();
            const checkOutDate = generateCheckOutDate(checkInDate);

            const newData = new BookingModel({
                full_name: faker.person.fullName(),
                email: faker.internet.email(),
                phone: faker.phone.number(),
                image: faker.image.urlPicsumPhotos(),
                check_in: checkInDate,
                check_out: checkOutDate,
                order_date: new Date(),
                special_request: faker.lorem.paragraphs(2),
                discount: Math.round(faker.number.float() * 20) * 5,
                status: faker.helpers.arrayElement(BookingStatus_list),
                roomInfo: getRandomId(roomsIds)
            })
            await newData.save();
        }
        console.log("Bookings data inserted successfully\n");
    } catch (error) {
        console.error('Error during insertion:', error);
    }
}