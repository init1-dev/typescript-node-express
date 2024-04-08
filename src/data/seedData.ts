
import { Types } from "mongoose";
import { insertBookingsData } from "./bookingsSeed";
import { insertRoomsData } from "./roomsSeed";
import { mongooseConnect } from "../util/mongoose/mongooseConnect";
import { dropAndCreateCollection } from "../util/mongoose/dropAndCreateCollectin";
import { insertEmployeesData } from "./employeesSeed";
import { insertMessagesData } from "./messagesSeed";

const seedData = async() => {
    const currentConnection = await mongooseConnect();

    try {
        await dropAndCreateCollection('rooms', currentConnection);
        await dropAndCreateCollection('bookings', currentConnection);
        await dropAndCreateCollection('employees', currentConnection);
        await dropAndCreateCollection('messages', currentConnection);

        const roomsData: Types.ObjectId[] | undefined = await insertRoomsData();

        if(roomsData) {
            await insertBookingsData(roomsData);
        }
        
        await insertEmployeesData();
        await insertMessagesData();

        currentConnection?.close();

        console.log("Seed completed");
        console.log("Connection closed");
        
    } catch (error) {
        console.error('Error during insertion:', error);
    }
}

seedData();