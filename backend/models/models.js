const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    is_pwd_restored: { type: DataTypes.BOOLEAN, defaultValue: false},
    role: { type: DataTypes.STRING, defaultValue: "USER"}
})
//TODO: прочитать про секвалайз документацию
// описать все сущности с диаграммы используя аттрибуты Sequalize

module.exports = {
    User
}