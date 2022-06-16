const { StatusCodes } = require('http-status-codes');
//Link to server
const supertest = require('supertest');

describe('E2E-tests: GET Product comments [GET /api/product/:id/comments]', function () {
    const EXIST_ID = 1;
    //TODO: пересмотреть описание кейсов - более юзер френдли...
    it('Should return status 200 + list of comments', async () => {
        const res = await supertest("http://localhost:5054/api/product")
            .get(`/${EXIST_ID}/comments`)
            .expect(StatusCodes.OK);
        //Expected result: Status 200 + list
        //TODO: WIP - fix as data.js
        expect(res.body[0]).toHaveProperty(["comment"], "Iphone 13: Contrary to popular belief, Lorem Ipsum is not simply random text.");
        expect(res.body[0]).toHaveProperty(["product_id"], 1);
        //comment #2
        expect(res.body[1]).toHaveProperty(["comment"], "Iphone 13: It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.");
        expect(res.body[1]).toHaveProperty(["product_id"], 1);
    });
});