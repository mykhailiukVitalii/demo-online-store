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
          img: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-13-01.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: "Iphone 13 PRO",
          price: 1113,
          img: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-13-pro-3.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          name: "Iphone 12",
          price: 858,
          img: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-12-r1.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          name: "Iphone 11 PRO",
          price: 799,
          img: "https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-11-pro-max-4.jpg",
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