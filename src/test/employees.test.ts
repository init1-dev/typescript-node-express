import request from 'supertest';
import { app } from '../app';
import { generateAccessToken } from '../util/generateAccessToken';

const token = generateAccessToken("init1");
const AUTH_KEY = `Bearer ${token}`;


describe('Employees', () => {

    it('should return single employee', async() => {
        
        const response = await request(app)
            .get("/employees/1")
            .set({authorization: AUTH_KEY})
            
        expect(response.statusCode).toEqual(200);
        expect(response.body).toMatchObject({
            "status": 200,
            "data": {
                "id": 1,
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
            .get("/employees/50")
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

    it('should return 200 successfully added', async() => {
        
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
            .set({authorization: AUTH_KEY})
            
        expect(response.statusCode).toEqual(200);
        expect(response.body).toMatchObject({
            "status": 200,
            "data": {
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
            }
        })
    })

    it('should return 200 successfully edited', async() => {
        
        const response = await request(app)
            .put("/employees/64")
            .send({
                "id": 70,
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
            .set({authorization: AUTH_KEY})
            
        expect(response.statusCode).toEqual(200);
        expect(response.body).toMatchObject({
            "status": 200,
            "data": {
                "id": 70,
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
            }
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

    it('should return 200 successfully deleted', async() => {
        
        const response = await request(app)
            .delete("/employees/70")
            .set({authorization: AUTH_KEY})
            
        expect(response.statusCode).toEqual(200);
        expect(response.body).toMatchObject({
            "status": 200,
            "message": "success"
        })
    })

})