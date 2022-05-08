const { StatusCodes } = require('http-status-codes');
//Link to server
const supertest = require('supertest');
//WIP using app.js
// const app = require('../../app'); //TODO: fix moving app to separate folder


//Test Data
const CREDENTIALS = {
    validUser: {
        email: "admin1",
        password: "123456789"
    },
    invalidUser: {
        email: "user1-inv",
        password: "123456999"
    },
    wrongPassword: {
        email: "admin1",
        password: "123456799"
    }
}

const INVALID_PWD_EMAIL_MESSAGE = "Password or Email does not exist in the request body.";
const NO_USER_MESSAGE =  "User not yet created.";
const INCORRECT_PWD_MESSAGE =  "The password is incorrect!";

describe('E2E-tests: USER login [POST /api/user/login]', function () {
    it('Should return status 400 if email does not exist', async () => {
        //TODO: No using the Base class - add this one
        const noEmailUser = Object.assign({}, CREDENTIALS.validUser);
        delete noEmailUser['email']
        const res = await supertest("http://localhost:5054/api/user")
            .post('/login')            
            .send(noEmailUser)
            .set('Accept', 'application/json')
            .expect(StatusCodes.BAD_REQUEST);
        //Expected result: Status 400 + "Password or Email does not exist in the request body."
        expect(res.body.message).toEqual(INVALID_PWD_EMAIL_MESSAGE);
    });
    it('Should return status 404 if user does not exist', async () => {
        const res = await supertest("http://localhost:5054/api/user")
            .post('/login') 
            .send(CREDENTIALS.invalidUser)
            .set('Accept', 'application/json')
            .expect(StatusCodes.NOT_FOUND);
        //Expected result: Status 404 + "User not yet created."
        expect(res.body.message).toEqual(NO_USER_MESSAGE);
    });
    it('Should return status 400 if password is incorrect', async () => {
        const res = await supertest("http://localhost:5054/api/user")
            .post('/login') 
            .send(CREDENTIALS.wrongPassword)
            .set('Accept', 'application/json')
            .expect(StatusCodes.BAD_REQUEST);
        //Expected result: Status 400 + "The password is incorrect!";
        expect(res.body.message).toEqual(INCORRECT_PWD_MESSAGE);
    });
    it('Should return status 200 if user exists.', async () => {
        const res = await supertest("http://localhost:5054/api/user")
            .post('/login') 
            .send(CREDENTIALS.validUser)
            .set('Accept', 'application/json')
            .expect(StatusCodes.OK);
        //Expected result: Status 200 + {user: email, token: ${uniquetoken}}
        expect(res.body).toHaveProperty('user', CREDENTIALS.validUser.email);
        expect(res.body).toHaveProperty('token');
    });
});
//TODO: WIP '{"message":{"name":"SequelizeConnectionRefusedError","parent":{"errno":-111,