const { StatusCodes } = require('http-status-codes');
//Link to server
const supertest = require('supertest');
//WIP using app.js


//Test Data
const CREDENTIALS = {
    validUser: {
        email: "user1",
        password: "tsE123456789"
    },
    invalidUser: {
        email: "user1-inv",
        password: "123456999"
    },
    wrongPassword: {
        email: "user1",
        password: "123456799"
    }
}

const INVALID_PWD_EMAIL_MESSAGE = "Password or Email does not exist in the request body.";
const USER_NO_FOUND_MESSAGE =  "User not found!";
const INCORRECT_PWD_MESSAGE =  "The password is incorrect!";
const INCORRECT_RESTORED_MESSAGE = "Password is already updated. User has only one chance for updating!";

describe('E2E-tests: USER login [POST /api/user/restore]', function () {
    it('Should return status 400 if email does not exist', async () => {
        //TODO: No using the Base class - add this one
        const noEmailUser = Object.assign({}, CREDENTIALS.validUser);
        delete noEmailUser['email']
        const res = await supertest("http://localhost:5054/api/user")
            .post('/restore')            
            .send(noEmailUser)
            .set('Accept', 'application/json')
            .expect(StatusCodes.BAD_REQUEST);
        //Expected result: Status 400 + "Password or Email does not exist in the request body."
        expect(res.body.message).toEqual(INVALID_PWD_EMAIL_MESSAGE);
    });
    it('Should return status 404 if user does not exist', async () => {
        const res = await supertest("http://localhost:5054/api/user")
            .post('/restore') 
            .send(CREDENTIALS.invalidUser)
            .set('Accept', 'application/json')
            .expect(StatusCodes.NOT_FOUND);
        //Expected result: Status 404 + "User not yet created."
        expect(res.body.message).toEqual(USER_NO_FOUND_MESSAGE);
    });
    it('Should return status 400 if password is incorrect', async () => {
        const res = await supertest("http://localhost:5054/api/user")
            .post('/restore') 
            .send(CREDENTIALS.wrongPassword)
            .set('Accept', 'application/json')
            .expect(StatusCodes.BAD_REQUEST);
        //Expected result: Status 400 + "The password is incorrect!";
        expect(res.body.message).toEqual(INCORRECT_PWD_MESSAGE);
    });
    //WIP
    // it('Should return status 201 if password is successfully updated.', async () => {
    //     const res = await supertest("http://localhost:5054/api/user")
    //         .post('/restore') 
    //         .send(CREDENTIALS.validUser)
    //         .set('Accept', 'application/json')
    //         .expect(StatusCodes.CREATED);
    //     //Expected result: Status 201 + {user: email, token: ${uniquetoken}}
    //     expect(res.body).toHaveProperty('user', CREDENTIALS.validUser.email);
    //     expect(res.body).toHaveProperty('token');
    // });
    it('Should return status 400 if password was updated before.', async () => {
        const res = await supertest("http://localhost:5054/api/user")
            .post('/restore') 
            .send(CREDENTIALS.validUser)
            .set('Accept', 'application/json')
            .expect(StatusCodes.BAD_REQUEST);
        //Expected result: Status 200 + {user: email, token: ${uniquetoken}}
        expect(res.body.message).toEqual(INCORRECT_RESTORED_MESSAGE);
    });
});
//TODO: WIP '{"message":{"name":"SequelizeConnectionRefusedError","parent":{"errno":-111,