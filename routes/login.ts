import express from "express";
import { parseResponse } from "../util/parseResponse";
import { login, generateAccessToken } from '../services/loginService';

export const loginRoutes = express.Router();

loginRoutes.post('/', async(req, res) => {
    try {
        const { username, password } = req.body;
        let loginAction = null;
        
        if(username === 'init1.dev' && password === '12345'){
            loginAction = await login(username, password);
        };
    
        if(loginAction) {
            return parseResponse({
                user: loginAction.user,
                token: loginAction.token
            }, res, 200);
        };

    } catch (error) {
        parseResponse("Internal Server Error", res, 500);
    }

    return parseResponse("Invalid username/password", res, 401);
})

loginRoutes.post('/createNewUser', (req, res) => {
    try {
        const { username = 'init1.dev' } = req.body;
        const token = generateAccessToken(username);
        
        res.json({
            user: username,
            token: token
        });
    } catch (error) {
        parseResponse("Internal Server Error", res, 500);
    }
})