import express from "express";
import { generateAccessToken, generatePublicToken } from "../util/generateAccessToken";

export const loginController = express.Router();

loginController.post('/createNewUser', (req, res) => {
    const token = generateAccessToken(req.body.username);
    
    res.json(token);
})

loginController.get('/PUBLIC_ACCESS_KEY', (_req, res) => {
    const token = generatePublicToken();

    res.json(token);
})