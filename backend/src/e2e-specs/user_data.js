//Test Data
const USER_CREDENTIALS = {
    exist: {
        email: "user1@gmail.com",
        password: "123456789"
    },
    restored: {
        email: "user1@gmail.com",
        password: "tsE123456789"
    },
    invalid: {
        email: "user1-inv@gmail.com",
        password: "123456999"
    },
    wrongPassword: {
        email: "user1@gmail.com",
        password: "123456799"
    },
    newUser: {
        email: "user777@gmail.com",
        password: "123456789"
    }
}

module.exports = USER_CREDENTIALS;