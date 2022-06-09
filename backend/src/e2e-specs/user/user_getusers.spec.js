const { StatusCodes } = require('http-status-codes');
//Link to server
const supertest = require('supertest');
//Test Data
const USER_MESSAGES = require('../user_messages');

describe('E2E-tests: USER getUsers [GET /api/user/users]', function () {
    it('Should return status 403 if user does not login', async () => {
        const res = await supertest("http://localhost:5054/api/user")
            .get('/users')
            .expect(StatusCodes.FORBIDDEN);
        //Expected result: Status 403 + "Authorised Error!"
        expect(res.body.message).toEqual(USER_MESSAGES.authError);
    });
    //TODO: case delete exist user by ID
});