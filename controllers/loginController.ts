import express from "express";
import { generateAccessToken } from "../util/generateAccessToken";

export const loginController = express.Router();

loginController.post('/createNewUser', (req, res) => {
    const token = generateAccessToken(req.body.username);
    
    res.json(token);
})