const { StatusCodes } = require('http-status-codes');
//Link to server
const supertest = require('supertest');
//Test Data
const USER_MESSAGES = require('../user_messages');
const ADMIN_CREDENTIALS = require('../admin_data');
const USER_CREDENTIALS = require('../user_data');

describe('E2E-tests: USER getUsers [GET /api/user/users]', function () {
    let adminToken = "", userToken = "";

    //TODO: пересмотреть описание кейсов - более юзер френдли...
    it('Should return status 403 if user does not login', async () => {
        const res = await supertest("http://localhost:5054/api/user")
            .get('/users')
            .expect(StatusCodes.FORBIDDEN);
        //Expected result: Status 403 + "Authorised Error!"
        expect(res.body.message).toEqual(USER_MESSAGES.authError);
    });
    it('[ADMIN] User succesfully sign in to the system => status=200 + token', async () => {
        const res = await supertest("http://localhost:5054/api/user")
            .post('/login') 
            .send(ADMIN_CREDENTIALS.exist)
            .set('Accept', 'application/json')
            .expect(StatusCodes.OK);
        //Expected result: Status 200 + {user: email, token: ${uniquetoken}}        
        expect(res.body).toHaveProperty('token');
        adminToken = res.body.token;
    });
    it('IF user use "ADMIN" role => should return status 200 and all available users (ADMIN+USER).', async () => {
        const res = await supertest("http://localhost:5054/api/user")
            .get('/users')
            .set('Authorization', "Bearer" + " " + adminToken)
            .expect(StatusCodes.OK);
        //Expected result: Status 200 + more than 2 users
        const { body } = res
        expect(body.length).toBeGreaterThan(2);        
        const admin = body.find(usr => usr.email === ADMIN_CREDENTIALS.exist.email);
        //Expected result: at least 1 ADMIN Must exist in the system.
        expect(admin).toHaveProperty('role', "ADMIN");
    });
    it('[USER] User succesfully sign in to the system => status=200 + token', async () => {
        const res = await supertest("http://localhost:5054/api/user")
            .post('/login') 
            .send(USER_CREDENTIALS.exist2)
            .set('Accept', 'application/json')
            .expect(StatusCodes.OK);
        //Expected result: Status 200 + {user: email, token: ${uniquetoken}}        
        expect(res.body).toHaveProperty('token');
        userToken = res.body.token;
    });
    it('IF user use "USER" role => should return status 403 and message.', async () => {
        const res = await supertest("http://localhost:5054/api/user")
            .get('/users')
            .set('Authorization', "Bearer" + " " + userToken)
            .expect(StatusCodes.FORBIDDEN);
        //Expected result: Status 403 + more than 2 users
        expect(res.body.message).toEqual(USER_MESSAGES.wrongAccess);
    });
    //TODO: case delete exist user by ID
});