const { User } = require("../db/models/models");
const ApiError = require("../errors/ApiError");
const { generateJwt, hashPassword, bcryptComparePwd } = require("./bcryptTokenService");
/**
 * User data object: full OR not full.
 * @param {object} user - The title of the book.
 * @param {boolean} full - if true - object includes email & role & token / else = email & token
 * @returns {user}
 */
const userData = (user, full = true) => {
    const { id, email, role } = user;
    //Generate jwt token
    const token = generateJwt(id, email, role);

    return (full)
        ? { user: email, role: role, token }
        : { user: user.email, token }
};
/**
 * Find User by email
 * @param {string} email - user email.
 * @returns {Promise} Promise object represents user
 */
const getUserByEmail = async (email) => {
    const user = await User.findOne({
        where: {email}
    });

    if(!user) {
        throw ApiError.notFound("User with this email address is not registered yet!");
    }

    return user;
};
/**
 * Check User in the system by email
 * @param {string} email - user email.
 * @returns {Promise} Promise object represents user
 */
const checkNewUserByEmail = async (email) => {
    const candidate = await User.findOne({
        where: {email}
    });

    if(candidate) {
        throw ApiError.badRequest("User with this email already exist!");
    }
};
/**
 * Create new user in the system
 * @param {string} data - user data for new user.
 * @returns {Promise} Promise object represents user
 */
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

    return userData(user, true);
};
/**
 * Login user to the system
 * @param {string} email - user email.
 * @param {string} pwd - user password.
 * @returns {Promise} Promise object represents user(email & token)
 */
const loginUser = async (email, pwd) => {
    const user = await getUserByEmail(email);
    //compare pwd
    const comparePwd = bcryptComparePwd(pwd, user.password);

    if(!comparePwd) {
        throw ApiError.badRequest("The password is incorrect!");
    }

    return userData(user, false);  
};
/**
 * Update user
 * @param {string} email - user email.
 * @param {object} opts - updates options
 * @returns {Promise} Number of updates
 */
const updateUserByEmail = async (email, opts) => {
    const updatedUser = await User.update(        
        opts,
        { where: {email}}
    );

    if(!updatedUser) {
        throw ApiError.badRequest("User failed to update");
    }

    return updatedUser;
}
/**
 * SET user password
 * @param {string} email - user email.
 * @param {string} pwd - user password
 * @returns {Promise} Promise object represents user(email & token)
 */
const setPassword = async (email, pwd) => {
    const user = await getUserByEmail(email);
    //compare pwd
    const comparePwd = bcryptComparePwd(pwd, user.password);

    if(!comparePwd) {
        throw ApiError.badRequest("The password is incorrect!");
    }

    if(user.is_pwd_restored) {
        throw ApiError.badRequest("Password is already updated. User has only one chance for updating!");
    }
    //Generate new PWD HASH using 
    const newPassword = process.env.RESTORE_PASSWORD_STRING + pwd;
    const hashPwd = await hashPassword(newPassword);

    const updateOpts = {
        password: hashPwd,
        is_pwd_restored: true
    }
    await updateUserByEmail(email, updateOpts);

    return userData(user, false);
};
/**
 * GET list of available users
 * @returns {Promise} Promise list represents users
 */
const getAllUsers = async() => {
    const users = await User.findAll();

    if(users.length < 1) {
        throw ApiError.badRequest("No user is registered in the system yet");
    }
    console.log("LIST", users)

    return users
}

module.exports = {
    getUserByEmail,
    createUser,
    loginUser,
    setPassword,
    getAllUsers
}