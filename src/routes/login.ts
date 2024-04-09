import express from "express";
import { parseResponse } from "../util/parseResponse";
import { employeeLogin } from "../services/employeesService";

export const loginRoutes = express.Router();

loginRoutes.post('/', async(req, res) => {
    try {
        const { username, password } = req.body;
        let loginAction = null;
        
        loginAction = await employeeLogin(username, password);
        // if(username === 'init1.dev' && password === '12345'){
        // };
    
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