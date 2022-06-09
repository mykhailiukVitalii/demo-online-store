// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const { User } = require("../db/models/models");
const ApiError = require("../errors/ApiError");
const { generateJwt, hashPassword, bcryptComparePwd } = require("./bcryptTokenService");


const getUserByEmail = async (email) => {
    const user = await User.findOne({
        where: {email}
    });

    if(!user) {
        throw ApiError.notFound("User with this email address is not registered yet!");
    }

    return user;
};

const checkNewUserByEmail = async (email) => {
    const candidate = await User.findOne({
        where: {email}
    });

    if(candidate) {
        throw ApiError.badRequest("User with this email already exist!");
    }
};

const createUser = async (data) => {
    //Check candidate
    await checkNewUserByEmail(data.email);
    //GET password
    const { password } = data;
    //debug entered password
    console.log("PWD->", password);
    
    //HASH user password
    const hashPwd = await hashPassword(password);

    const newUser = { ...data, password: hashPwd };
    const user = await User.create(newUser);
    console.log("USR1->", user.dataValues);
    //Generate jwt token
    const token = generateJwt(user.id, user.email, user.role);

    return {
        user: user.email,
        role: user.role,
        token 
    }
};

const loginUser = async (data) => {
    const user = await getUserByEmail(data.email);
    //compare pwd
    const comparePwd = bcryptComparePwd(data.password, user.password);

    if(!comparePwd) {
        throw ApiError.badRequest("The password is incorrect!");
    }
    //Generate jwt token
    const token = generateJwt(user.id, user.email, user.role);

    return {
        user: user.email,
        token
    };   
};

module.exports = {
    getUserByEmail,
    createUser,
    loginUser
}