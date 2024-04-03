import request from 'supertest';
import { app } from '../app';

const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImluaXQxLmRldiIsImlhdCI6MTcxMjAzNDYzNSwiZXhwIjoxNzQzNTcwNjM1fQ.2nIeuGyXjR53nhwRGEYXJ0004xENzriwqLIa8VQT_Dc";
const publicToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImluaXQxLmRldiIsImlhdCI6MTcxMjE0OTAzMywiZXhwIjozMzI2OTc0OTAzM30.XYmbR7gtnNG-v-Tg7dP2t2rzi8ieJ4rFMuIw0tR873M";

describe('Employees', () => {

    it('should return single employee', async() => {
        
        const response = await request(app)
            .get("/employees/1")
            .set({authorization: token})
            
        expect(response.statusCode).toEqual(200);
        expect(response.body).toMatchObject({
            "status": 200,
            "payload": {
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
            .set({authorization: token})
            
        expect(response.statusCode).toEqual(404);
        expect(response.body).toMatchObject({
            "status": 404,
            "message": "Employee not found"
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

    it('should return 403 trying to create with public auth', async() => {
        
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
            .set({authorization: publicToken})
            
        expect(response.statusCode).toEqual(403);
        expect(response.body).toMatchObject({
            "status": 403,
            "message": "Forbidden"
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
            .set({authorization: token})
            
        expect(response.statusCode).toEqual(200);
        expect(response.body).toMatchObject({
            "status": 200,
            "message": "Employee #64 added successfully"
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
            .set({authorization: token})
            
        expect(response.statusCode).toEqual(200);
        expect(response.body).toMatchObject({
            "status": 200,
            "message": "Employee #64 edited successfully"
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

    it('should return 403 Forbidden trying to delete with public key', async() => {
        
        const response = await request(app)
            .delete("/employees/70")
            .set({authorization: publicToken})
            
        expect(response.statusCode).toEqual(403);
        expect(response.body).toMatchObject({
            "status": 403,
            "message": "Forbidden"
        })
    })

    it('should return 200 successfully deleted', async() => {
        
        const response = await request(app)
            .delete("/employees/70")
            .set({authorization: token})
            
        expect(response.statusCode).toEqual(200);
        expect(response.body).toMatchObject({
            "status": 200,
            "message": "Employee #70 deleted successfully"
        })
    })

})