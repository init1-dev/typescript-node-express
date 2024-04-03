import express from "express";
import { parseResponse } from "../util/parseResponse";
import { login, generateAccessToken } from '../services/loginService';

export const loginController = express.Router();

loginController.post('/', async(req, res) => {
    const { username, password } = req.body;

    try {
        let loginActin = null;
        
        if(username === 'init1.dev' && password === '12345'){
            loginActin = await login(username, password);
        };
    
        if(loginActin) {
            return parseResponse({
                user: loginActin.user,
                token: loginActin.token
            }, res, 200);
        };

    } catch (error) {
        parseResponse("Internal Server Error", res, 500);
    }

    return parseResponse("Invalid username/password", res, 401);
})

loginController.post('/createNewUser', (req, res) => {
    const { username = 'init1.dev' } = req.body;
    const token = generateAccessToken(username);
    
    res.json({
        user: username,
        token: token
    });
})