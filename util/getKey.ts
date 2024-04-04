import { Secret } from "jsonwebtoken";

const dotenv = require("dotenv");
dotenv.config();

export const SECRET_TOKEN: Secret = process.env.TOKEN_SECRET || "";