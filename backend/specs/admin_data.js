//Test Data
const ADMIN_CREDENTIALS = {
    exist: {
        email: "admin1@gmail.com",
        password: "123456789"
    },
    invalid: {
        email: "admin1-inv",
        password: "123456999"
    },
    wrongPassword: {
        email: "admin1@gmail.com",
        password: "123456799"
    }
}

module.exports = ADMIN_CREDENTIALS;