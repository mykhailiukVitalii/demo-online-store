const { StatusCodes } = require('http-status-codes');
//Link to server
const supertest = require('supertest');
//WIP using app.js
// const app = require('../../app'); //TODO: fix moving app to separate folder

//Test Data
const USER_CREDENTIALS = require('../user_data');
const ADMIN_CREDENTIALS = require('../admin_data');
const USER_MESSAGES = require('../user_messages');

describe('E2E-tests: USER login [POST /api/user/registration]', function () {
    it('Should return status 400 if email does not exist', async () => {
        //TODO: No using the Base class - add this one
        const noEmailNewUser = Object.assign({}, USER_CREDENTIALS.newUser);
        delete noEmailNewUser['password']
        const res = await supertest("http://localhost:5054/api/user")
            .post('/registration')            
            .send(noEmailNewUser)
            .set('Accept', 'application/json')
            .expect(StatusCodes.BAD_REQUEST);
        //Expected result: Status 400 + "Password or Email does not exist in the request body."
        expect(res.body.message).toEqual(USER_MESSAGES.invalidPwdEmail);
    });
    it('Should return status 400 if user already exist in the DB.', async () => {
        const res = await supertest("http://localhost:5054/api/user")
            .post('/registration') 
            .send(USER_CREDENTIALS.exist)
            .set('Accept', 'application/json')
            .expect(StatusCodes.BAD_REQUEST);
        //Expected result: Status 404 + message
        expect(res.body.message).toEqual(USER_MESSAGES.existUser);
    });
    it('Should return status 201 + role="USER" if DEFAULT user has been created.', async () => {
        const res = await supertest("http://localhost:5054/api/user")
            .post('/registration') 
            .send(USER_CREDENTIALS.newUser)
            .set('Accept', 'application/json')
            .expect(StatusCodes.CREATED);
        //Expected result: Status 201 + {user: email, token: ${uniquetoken}}
        expect(res.body).toHaveProperty('user', USER_CREDENTIALS.newUser.email);
        expect(res.body).toHaveProperty('role', "USER");
        expect(res.body).toHaveProperty('token');
    });
    it('Should return status 201 + role="ADMIN" if the request body contains "role" as ADMIN.', async () => {
        const res = await supertest("http://localhost:5054/api/user")
            .post('/registration') 
            .send(ADMIN_CREDENTIALS.newAdmin)
            .set('Accept', 'application/json')
            .expect(StatusCodes.CREATED);
        //Expected result: Status 201 + {user: email, token: ${uniquetoken}}
        expect(res.body).toHaveProperty('user', ADMIN_CREDENTIALS.newAdmin.email);
        expect(res.body).toHaveProperty('role', ADMIN_CREDENTIALS.newAdmin.role);
        expect(res.body).toHaveProperty('token');
    });
});
//TODO: WIP '{"message":{"name":"SequelizeConnectionRefusedError","parent":{"errno":-111, - БД переключается, глянуть