import express from "express";
import { parseResponse } from "../util/parseResponse";
import { employeeLogin } from "../services/employeesService";
import bcrypt from 'bcryptjs';
import { generateAccessToken } from "../util/generateAccessToken";

export const loginRoutes = express.Router();

loginRoutes.post('/', async(req, res, next) => {
    try {
        const { username, password } = req.body;
        const loginAction = await employeeLogin(username);
        const user = loginAction[0];

        console.log(loginAction);
        
    
        if(user) {
            const isPasswordMatch = await bcrypt.compare(password, user.password);

            if(isPasswordMatch){
                const token = generateAccessToken(username);
                
                return parseResponse({
                    user: user.fullname,
                    email: user.email,
                    id: user._id,
                    token: token,
                    photo: user.photo
                }, res, 200);
            } else {
                return parseResponse("Invalid password", res, 401);
            }
        } else {
            return parseResponse("Invalid username", res, 401);
        };
    } catch (error) {
        next(error);
    }
})