//Test Data
const USER_CREDENTIALS = {
    exist: {
        email: "user1",
        password: "tsE123456789"
    },
    invalid: {
        email: "user1-inv",
        password: "123456999"
    },
    wrongPassword: {
        email: "user1",
        password: "123456799"
    }
}

module.exports = USER_CREDENTIALS;