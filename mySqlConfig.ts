import dotenv from 'dotenv';

dotenv.config();

export const mySqlConfig = {
    host: process.env.SQL_HOST as string,
    user: process.env.SQL_USERNAME as string,
    database: process.env.SQL_DBNAME as string,
    password: process.env.SQL_PASSWORD as string
}

export const connectionBase = {
    host: mySqlConfig.host,
    user: mySqlConfig.user,
    password: mySqlConfig.password
};