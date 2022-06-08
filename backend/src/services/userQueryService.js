const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../db/models/models");
const ApiError = require("../errors/ApiError");

const generateJwt = (id, email, role) => {
    return jwt.sign(
        { id, email, role },
        process.env.SECRET_KEY,
        { expiresIn: "24h" }
    );
}

const getUserByEmail = async (email) => {
    const user = await User.findOne({
        where: {email}
    });

    return (user) ? user : ApiError.badRequest("User with this email already exist!");
};

const createUser = async (data) => {
    const salt = await bcrypt.genSalt(process.env.BCRYPT_SALT_ROUNDS);    
    const { password } = data;
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = { ...data, password: hashPassword };
    const user = await User.create(newUser);
    console.log("USR1->", user.dataValues);
    // const basket - //TODO доделать создание Корзины по дефолту
    //Generate jwt token
    const token = generateJwt(user.id, user.email, user.role);

    return (user) ? { user: user.email, token } : ApiError.internal("User creation unknown error!");     
};

module.exports = {
    getUserByEmail,
    createUser
}