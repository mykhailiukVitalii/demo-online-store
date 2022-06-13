'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'products',
      [
        {
          id: 1,
          name: "Iphone 13",
          price: 959,
          img: "/test13.png",
          comment_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: "Iphone 13 PRO",
          price: 1113,
          img: "/test13_pro.png",
          comment_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {});
  }
};