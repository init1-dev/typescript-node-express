import { mySqlConnection, mySqlDisconnect } from "../util/mySql/connectionFunctions";
import { dropAndCreateDatabase } from "../util/mySql/dropAndCreateDatabase";
import { runMultipleQueries } from "../util/mySql/seedDataFunctions";
import { insertBookingsData } from "./bookingsSeed";
import { insertEmployeesData } from "./employeesSeed";
import { insertMessagesData } from "./messagesSeed";
import { insertRoomsData } from "./roomsSeed";
import { exit } from 'process';

const seedData = async() => {
    const currentConnection = await mySqlConnection({database: false});
    try {
        await runMultipleQueries(dropAndCreateDatabase, currentConnection, `Dropping database...`);

        console.log(`Inserting data...\n`);

        await insertMessagesData(currentConnection);
        await insertEmployeesData(currentConnection);
        await insertRoomsData(currentConnection);
        await insertBookingsData(currentConnection);

        console.log(`\nAll seed completed successfully.`);
        
    } catch (error) {
        currentConnection.rollback();
        console.error('Error during insertion:', error);
    } finally {
        mySqlDisconnect(currentConnection);
        exit(1);
    };
}

seedData();