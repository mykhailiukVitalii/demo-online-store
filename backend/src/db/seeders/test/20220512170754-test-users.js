'use strict';
const bcrypt = require("bcrypt");

async function generatePwd(pwd) {
  console.log("PWD->", pwd);
  //hashPassword
  return await bcrypt.hash(pwd, 5);
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          id: 1,
          email: "user1@gmail.com",
          password: await generatePwd("123456789"),
          is_pwd_restored: false,
          role: "USER",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          email: "admin1@gmail.com",
          password: await generatePwd("123456789"),
          is_pwd_restored: false,
          role: "ADMIN",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          email: "user111@gmail.com",
          password: await generatePwd("123456789"),
          is_pwd_restored: false,
          role: "USER",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      {}
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};