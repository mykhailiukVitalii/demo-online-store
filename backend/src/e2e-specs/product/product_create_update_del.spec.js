const { StatusCodes } = require('http-status-codes');
//Link to server
const supertest = require('supertest');
//Test Data
const USER_MESSAGES = require('../user_messages');
const USER_CREDENTIALS = require('../user_data');
const ADMIN_CREDENTIALS = require('../admin_data');
const PRODUCT = require('../product_data');

describe('E2E-tests: USER CREATE/UPDATE/DELET cases [ /api/product/...]', function () {
    let adminToken = "", userToken = "", newProductId = 0;

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
    //TODO: пересмотреть описание кейсов - более юзер френдли...
    it('[CREATE AS USER] Should return status 403 if user does not login', async () => {
        const res = await supertest("http://localhost:5054/api/user")
            .get('/users')
            .set('Authorization', "Bearer" + " " + userToken)
            .expect(StatusCodes.FORBIDDEN);
        //Expected result: Status 403 + "Authorised Error!"
        expect(res.body.message).toEqual(USER_MESSAGES.wrongAccess);
    });
    it('[CREATE AS ADMIN] Should return status 201 + new product data', async () => {
        const res = await supertest("http://localhost:5054/api/product")
            .post('/new')
            .send(PRODUCT.newProduct)
            .set('Accept', 'application/json')
            .set('Authorization', "Bearer" + " " + adminToken)
            .expect(StatusCodes.CREATED);
        //Expected result: response include name & price & img
        expect(res.body).toHaveProperty('name', PRODUCT.newProduct.name);
        expect(res.body).toHaveProperty('price', PRODUCT.newProduct.price);
        expect(res.body).toHaveProperty('img', PRODUCT.newProduct.img);

        newProductId = res.body.id;
    });
    it('[UPDATE AS ADMIN] Should return status 200 + updated product data', async () => {
        const res = await supertest("http://localhost:5054/api/product")
            .put('/update')
            .send(PRODUCT.editProduct)
            .set('Accept', 'application/json')
            .set('Authorization', "Bearer" + " " + adminToken)
            .expect(StatusCodes.OK);
        //Expected result: response include name & price & img
        expect(res.body[0]).toEqual(1);
    });
    it('[DELET AS ADMIN] Should return status 204 + updated product data', async () => {
        const opts = { id: newProductId };
        const res = await supertest("http://localhost:5054/api/product")
            .delete('/delete')
            .send(opts)
            .set('Authorization', "Bearer" + " " + adminToken)
            .set('Accept', 'application/json')
            .expect(StatusCodes.NO_CONTENT);
        //Expected result: status 204
    });
    //TODO: negative checks ADD
});