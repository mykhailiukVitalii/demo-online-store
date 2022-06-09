//Test Data
const ADMIN_CREDENTIALS = {
    exist: {
        email: "admin1@gmail.com",
        password: "123456789"
    },
    invalid: {
        email: "admin11@gmail.com",
        password: "123456789"
    },
    wrongPassword: {
        email: "admin1@gmail.com",
        password: "123456799"
    },
    newAdmin: {
        email: "admin777@gmail.com",
        password: "123456789",
        role: "ADMIN"
    }
}

module.exports = ADMIN_CREDENTIALS;