const { StatusCodes } = require('http-status-codes');
//Link to server
const supertest = require('supertest');

describe('E2E-tests: USER getUsers [GET /api/product/products]', function () {
    //TODO: пересмотреть описание кейсов - более юзер френдли...
    it('Should return status 200 + list of products', async () => {
        const res = await supertest("http://localhost:5054/api/product")
            .get('/products')
            .expect(StatusCodes.OK);
        //Expected result: Status 200 + list
        expect(res.body).toHaveLength(4);
    });
    it('GET Specific product by :id = status 200 + name and price', async () => {
        const res = await supertest("http://localhost:5054/api/product")
            .get('/1')
            .expect(StatusCodes.OK);
        //Expected result: Status 200 + name & price of first product
        expect(res.body).toHaveProperty(["name"], 'Iphone 13');
        expect(res.body).toHaveProperty(["price"], 959);
    });
});