const { bcryptComparePwd, hashPassword } = require("../bcryptTokenService");

describe("[Unit tests] bcryptTokenService tests.", () => {
    it('[bcryptComparePwd] should return true.', async () => {
        //HASH pwd for "12345"
        const hashPwd = "$2b$10$DSU1psTcwArTEE1exajMhOxZ9rT54C95ZF2UfamAtfOtHhQQjCO5W";
        const res = bcryptComparePwd("12345", hashPwd);
        // Expected result
        expect(res).toBe(true);
    });
})