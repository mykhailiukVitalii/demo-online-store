const {Sequelize} = require("sequelize");

module.exports = new Sequelize(
    process.env.TEST_DB_NAME, //TODO: fix for DEV env
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "mysql",
        operatorsAliases: false,
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);