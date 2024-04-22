// import { Types } from "mongoose";
// import { insertBookingsData } from "./bookingsSeed";
// import { insertRoomsData } from "./roomsSeed";
import { employee_types } from "../models/Employees";
import { amenities_list, room_types } from "../models/Rooms";
import { mySqlConnection } from "../util/mySql/mySqlConnection";
import { dropQueryFunction, insertIntoTable, insertIntoTableFromArray } from "../util/mySql/querieFunctions";
// import { insertEmployeesData } from "./employeesSeed";
// import { insertMessagesData } from "./messagesSeed";

const seedData = async() => {
    let currentConnection;
    try {
        currentConnection = await mySqlConnection();

        await dropQueryFunction(currentConnection);

        console.log(`Inserting data...\n`);

        await insertIntoTableFromArray('employee_type', employee_types, currentConnection);
        await insertIntoTableFromArray('room_type', room_types, currentConnection);
        await insertIntoTableFromArray('amenity', amenities_list, currentConnection);

        const messageColumns = ['full_name','email','phone','subject','message','stars'];

        const messageValues = ['Romualdo Sánchez','romusan@gmail.com','+34600123456','Me hago pis','Necesito una ducha',5];

        await insertIntoTable('message', messageColumns, messageValues, 10, currentConnection);

        console.log(`All seed completed successfully.`);

        // const roomsData: Types.ObjectId[] | undefined = await insertRoomsData();

        // if(roomsData) {
        //     await insertBookingsData(roomsData);
        // }
        
        // await insertEmployeesData();
        // await insertMessagesData();

        // console.log("\nSeed completed");
        // console.log("Connection closed");
        
    } catch (error) {
        console.error('Error during insertion:', error);
    } finally {
        // currentConnection?.close();
        currentConnection?.end();
    }
}

seedData();