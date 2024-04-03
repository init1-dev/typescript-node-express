import { Secret } from "jsonwebtoken";

const dotenv = require("dotenv");
dotenv.config();

export const SECRET_TOKEN: Secret = process.env.TOKEN_SECRET || "";
export const KEY_PUBLIC: Secret = process.env.PUBLIC_KEY || "";