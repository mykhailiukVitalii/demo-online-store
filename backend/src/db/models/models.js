const sequelize = require("../db-config");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    is_pwd_restored: { type: DataTypes.BOOLEAN, defaultValue: false},
    role: { type: DataTypes.STRING, defaultValue: "USER"}
});

const Product = sequelize.define("product", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },    
    price: { type: DataTypes.INTEGER, allowNull: false }, //TODO: почитать инфу про аловнал и тд...
    img: { type: DataTypes.STRING },
    brand_id: { type: DataTypes.INTEGER },
    comment_id: { type: DataTypes.INTEGER }
});

//TODO: WIP - добавить Дескрипшн к продукту и убрать лишнюю сущность Продукт инфо
// оставитьтолько Продукт + Комменты
// для продуктов на ЮАЙ добавить возможность отображения нужных колонок.
// const ProductInfo = sequelize.define("product_info", {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     description: { type: DataTypes.STRING, allowNull: false },
// }); 

// const Comment = sequelize.define("comment", {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     user_id: { type: DataTypes.INTEGER },
//     product_id: { type: DataTypes.INTEGER },
//     comment: { type: DataTypes.STRING, allowNull: false}
// });
// //TODO: прочитать про секвалайз документацию
// Product.hasOne(ProductInfo);
// ProductInfo.belongsTo(Product);

// Product.hasMany(Comment);
// Comment.belongsTo(Product);

// User.hasMany(Comment);
// Comment.belongsTo(User);
// описать все сущности с диаграммы используя аттрибуты Sequalize

module.exports = {
    User,
    Product,
    // ProductInfo,
    // Comment
}