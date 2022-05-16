const { StatusCodes } = require('http-status-codes');
//Link to server
const supertest = require('supertest');
//WIP using app.js
//Test Data
const USER_CREDENTIALS = require('../user_data');
const USER_MESSAGES = require('../user_messages');

describe('E2E-tests: USER login [POST /api/user/restore]', function () {
    it('Should return status 400 if email does not exist', async () => {
        //TODO: No using the Base class - add this one
        const noEmailUser = Object.assign({}, USER_CREDENTIALS.exist);
        delete noEmailUser['email']
        const res = await supertest("http://localhost:5054/api/user")
            .post('/restore')            
            .send(noEmailUser)
            .set('Accept', 'application/json')
            .expect(StatusCodes.BAD_REQUEST);
        //Expected result: Status 400 + "Password or Email does not exist in the request body."
        expect(res.body.message).toEqual(USER_MESSAGES.invalidPwdEmail);
    });
    it('Should return status 404 if user does not exist', async () => {
        const res = await supertest("http://localhost:5054/api/user")
            .post('/restore') 
            .send(USER_CREDENTIALS.invalid)
            .set('Accept', 'application/json')
            .expect(StatusCodes.NOT_FOUND);
        //Expected result: Status 404 + "User not yet created."
        expect(res.body.message).toEqual(USER_MESSAGES.notFound);
    });
    it('Should return status 400 if password is incorrect', async () => {
        const res = await supertest("http://localhost:5054/api/user")
            .post('/restore')
            .send(USER_CREDENTIALS.wrongPassword)
            .set('Accept', 'application/json')
            .expect(StatusCodes.BAD_REQUEST);
        //Expected result: Status 400 + "The password is incorrect!";
        expect(res.body.message).toEqual(USER_MESSAGES.incorrectPwd);
    });
    // //WIP: rechek using DB restore / или найти другие варианты использования
    it('Should return status 201 if password is successfully updated.', async () => {
        const res = await supertest("http://localhost:5054/api/user")
            .post('/restore') 
            .send(USER_CREDENTIALS.exist)
            .set('Accept', 'application/json')
            .expect(StatusCodes.CREATED);
        //Expected result: Status 201 + {user: email, token: ${uniquetoken}}
        expect(res.body).toHaveProperty('user', USER_CREDENTIALS.exist.email);
        expect(res.body).toHaveProperty('token');
    });
    it('Should return status 400 if password was updated before.', async () => {
        const res = await supertest("http://localhost:5054/api/user")
            .post('/restore') 
            .send(USER_CREDENTIALS.restored)
            .set('Accept', 'application/json')
            .expect(StatusCodes.BAD_REQUEST);
        //Expected result: Status 200 + {user: email, token: ${uniquetoken}}
        expect(res.body.message).toEqual(USER_MESSAGES.alreadyRestored);
    });
});
//TODO: WIP '{"message":{"name":"SequelizeConnectionRefusedError","parent":{"errno":-111,

/*
перед запуском делать миграцию в БД или сетить нужными значениям
--проганять БД
дропать полность БД
*/