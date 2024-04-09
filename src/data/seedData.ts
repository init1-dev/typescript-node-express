
import { Types } from "mongoose";
import { insertBookingsData } from "./bookingsSeed";
import { insertRoomsData } from "./roomsSeed";
import { mongooseConnect } from "../util/mongoose/mongooseConnect";
import { dropAndCreateCollection } from "../util/mongoose/dropAndCreateCollectin";
import { insertEmployeesData } from "./employeesSeed";
import { insertMessagesData } from "./messagesSeed";

const appCollections = ['rooms', 'bookings', 'employees', 'messages'];

const seedData = async() => {
    const currentConnection = await mongooseConnect();

    try {
        for (const element of appCollections) {
            await dropAndCreateCollection(element, currentConnection);
        };

        const roomsData: Types.ObjectId[] | undefined = await insertRoomsData();

        if(roomsData) {
            await insertBookingsData(roomsData);
        }
        
        await insertEmployeesData();
        await insertMessagesData();

        console.log("\nSeed completed");
        console.log("Connection closed");
        
    } catch (error) {
        console.error('Error during insertion:', error);
    } finally {
        currentConnection?.close();
    }
}

seedData();