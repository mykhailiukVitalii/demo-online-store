'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'comments',
      [
        {
          id: 1,
          product_id: 1,
          comment: "Iphone 13: Contrary to popular belief, Lorem Ipsum is not simply random text.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          product_id: 1,
          comment: "Iphone 13: It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          product_id: 2,
          comment: "Iphone 13 PRO: It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('comments', null, {});
  }
};