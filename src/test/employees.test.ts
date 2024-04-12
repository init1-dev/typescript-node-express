import request from 'supertest';
import { app } from '../app';
import { generateAccessToken } from '../util/generateAccessToken';
import { getOne } from '../services/employeesService';
import mongoose from 'mongoose';

const token = generateAccessToken("init1");
const AUTH_KEY = `Bearer ${token}`;


describe('Employees', () => {

    const data = {
        "_id": "6616bc6d2b7ffffdc7f4c4c3",
        "photo": "https://avatars.githubusercontent.com/u/79700122?v=4",
        "fullname": "init2",
        "email": "init1.dev@gmail.com",
        "start_date": "Thu Mar 14 2024 10:07:21 GMT+0100 (hora estándar de Europa central)",
        "employee_type": "CEO",
        "description": "Vester triumphus tamisium cedo solvo. Sursum nisi cattus sulum statua calculus summopere. Aequitas suadeo despecto volup.",
        "phone": "774-284-3140 x02184",
        "status": "Active",
        "password": "12345",
    };

    it('should return single employee', async() => {
        
        const response = await request(app)
            .get("/employees/66169740bb170df90fe6842f")
            .set({authorization: AUTH_KEY})
            
        expect(response.statusCode).toEqual(200);
        expect(response.body).toMatchObject({
            "status": 200,
            "data": {
                "_id": "66169740bb170df90fe6842f",
                "photo": "https://avatars.githubusercontent.com/u/65215383",
                "fullname": "Gabriel Jaskolski",
                "email": "Mona_Blanda79@gmail.com",
                "start_date": "Sun Mar 31 2024 19:42:22 GMT+0200 (hora de verano de Europa central)",
                "employee_type": "Support",
                "description": "Volo mollitia surgo. Caritas testimonium ubi. Delibero cenaculum fuga damnatio desparatus vereor turpis.",
                "phone": "796.651.4543 x59854",
                "status": "Inactive",
                "password": "$2a$10$U2BoXaOYgtzbP3xPHdeyt.cHrDRDuzJKOlnKGe8mPKTzhfVcMkhjK",
                "createdAt": "2024-04-10T13:42:24.830Z",
                "updatedAt": "2024-04-11T10:45:43.647Z",
                "__v": 0
            }
        })
    })

    it('should return 401 unauthorized', async() => {
        
        const response = await request(app)
            .get("/employees/1")
            
        expect(response.statusCode).toEqual(401);
        expect(response.body).toMatchObject({
            "status": 401,
            "message": "Unauthorized"
        })
    })

    it('should return 404 not found', async() => {
        
        const response = await request(app)
            .get("/employees/66156617e182d5f9ee894b55")
            .set({authorization: AUTH_KEY})
            
        expect(response.statusCode).toEqual(404);
        expect(response.body).toMatchObject({
            "status": 404,
            "message": "Not found"
        })
    })

    it('should return 401 trying to create without auth', async() => {
        
        const response = await request(app)
            .post("/employees")
            .send({
                "id": 64,
                "photo": "https://avatars.githubusercontent.com/u/79700122?v=4",
                "name": "Init",
                "lastname": "Dev",
                "fullname": "init.dev",
                "employee_id": "3bc45dfe-8286",
                "email": "init1.dev@gmail.com",
                "start_date": "1/22/2024",
                "description": "CEO",
                "phone": "173-125-4724",
                "status": false,
                "password": "12345"
            })
            
        expect(response.statusCode).toEqual(401);
        expect(response.body).toMatchObject({
            "status": 401,
            "message": "Unauthorized"
        })
    })

    it('should return 200 successfully deleted', async() => {
        
        const response = await request(app)
            .delete("/employees/6616bc6d2b7ffffdc7f4c4c3")
            .set({authorization: AUTH_KEY})
            
        expect(response.statusCode).toEqual(200);
        expect(response.body).toMatchObject({
            "status": 200,
            "message": "success"
        })
    })

    it('should return 200 successfully added', async() => {
        const response = await request(app)
            .post("/employees")
            .send(data)
            .set({authorization: AUTH_KEY})
            
        expect(response.statusCode).toEqual(200);
        expect(response.body).toMatchObject({
            status: 200,
            data: JSON.parse(JSON.stringify(getOne(data._id)))
        });
    })

    it('should return 200 successfully edited', async() => {
        
        const response = await request(app)
            .put("/employees/6616bc6d2b7ffffdc7f4c4c3")
            .send({...data, fullname: "init.dev"})
            .set({authorization: AUTH_KEY})
            
        expect(response.statusCode).toEqual(200);
        expect(response.body).toMatchObject({
            "status": 200,
            "data": JSON.parse(JSON.stringify(getOne(data._id)))
        })
    })

    it('should return 401 Unauthorized trying to delete without auth', async() => {
        
        const response = await request(app)
            .delete("/employees/70")
            
        expect(response.statusCode).toEqual(401);
        expect(response.body).toMatchObject({
            "status": 401,
            "message": "Unauthorized"
        })
    })
})

afterAll( async() => {
    await mongoose.disconnect();
})