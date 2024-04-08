import mongoose from "mongoose";

const SERVER_URL = 'localhost:27017';
const DB_NAME = 'mongo-miranda-db';

export const mongooseConnect = async() => {
    if(mongoose.connection.readyState === 0){
        await mongoose.connect(`mongodb://${SERVER_URL}/${DB_NAME}`).then((x) => {
            console.log(`Connected to Database: "${x.connections[0].name}"`);
            })
            .catch((err) => {
            console.error("Error connecting to mongo: ", err);
        });
        return mongoose.connection;
    }
}