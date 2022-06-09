const { StatusCodes } = require('http-status-codes');
//Link to server
const supertest = require('supertest');
//WIP using app.js
// const app = require('../../app'); //TODO: fix moving app to separate folder

//Test Data
const ADMIN_CREDENTIALS = require('../admin_data');
const USER_MESSAGES = require('../user_messages');

describe('E2E-tests: USER login [POST /api/user/login]', function () {
    it('Should return status 400 if email does not exist', async () => {
        //TODO: No using the Base class - add this one
        const noEmailUser = Object.assign({}, ADMIN_CREDENTIALS.exist);
        delete noEmailUser['email']
        const res = await supertest("http://localhost:5054/api/user")
            .post('/login')            
            .send(noEmailUser)
            .set('Accept', 'application/json')
            .expect(StatusCodes.BAD_REQUEST);
        //Expected result: Status 400 + "Password or Email does not exist in the request body."
        expect(res.body.message).toEqual(USER_MESSAGES.invalidPwdEmail);
    });
    it('Should return status 404 if such "email" does not exist in the DB.', async () => {
        const res = await supertest("http://localhost:5054/api/user")
            .post('/login') 
            .send(ADMIN_CREDENTIALS.invalid)
            .set('Accept', 'application/json')
            .expect(StatusCodes.NOT_FOUND);
        //Expected result: Status 404 + message
        expect(res.body.message).toEqual(USER_MESSAGES.noUser);
    });
    it('Should return status 400 if password is incorrect', async () => {
        const res = await supertest("http://localhost:5054/api/user")
            .post('/login') 
            .send(ADMIN_CREDENTIALS.wrongPassword)
            .set('Accept', 'application/json')
            .expect(StatusCodes.BAD_REQUEST);
        //Expected result: Status 400 + message
        expect(res.body.message).toEqual(USER_MESSAGES.incorrectPwd);
    });
    it('Should return status 200 if user exists.', async () => {
        const res = await supertest("http://localhost:5054/api/user")
            .post('/login') 
            .send(ADMIN_CREDENTIALS.exist)
            .set('Accept', 'application/json')
            .expect(StatusCodes.OK);
        //Expected result: Status 200 + {user: email, token: ${uniquetoken}}
        expect(res.body).toHaveProperty('user', ADMIN_CREDENTIALS.exist.email);
        expect(res.body).toHaveProperty('token');
    });
});
//TODO: WIP '{"message":{"name":"SequelizeConnectionRefusedError","parent":{"errno":-111, - БД переключается, глянуть