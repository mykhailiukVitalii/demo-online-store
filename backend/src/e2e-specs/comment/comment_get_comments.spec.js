const { StatusCodes } = require('http-status-codes');
//Link to server
const supertest = require('supertest');

describe('E2E-tests: Comment router/', function () {
    //TODO: пересмотреть описание кейсов - более юзер френдли...
    it('[GET /comments] all comments => Should return status 200 + list of comments', async () => {
        const res = await supertest("http://localhost:5054/api/comment")
            .get(`/comments`)
            .expect(StatusCodes.OK);
        //Expected result: Status 200 + list
        //TODO: WIP - fix as data.js
        expect(res.body).toHaveLength(3)
        expect(res.body[0]).toHaveProperty(["id"], 1);
        expect(res.body[0]).toHaveProperty(["comment"], "Iphone 13: Contrary to popular belief, Lorem Ipsum is not simply random text.");
        expect(res.body[0]).toHaveProperty(["product_id"], 1);
    });
});