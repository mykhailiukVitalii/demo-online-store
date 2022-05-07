const ApiError = require("../errors/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {User} = require("../models/models");
//TODO - move to const
// const SALT = 5;

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: "24h"}
    );
}

class UserController {
    //TODO: description jsdoc
    async registration(req, res, next) {
        const {email, password, role} = req.body
        if(!email || !password) {
            return next(ApiError.badRequest("Incorrect email OR pwd! Check entered data."))
        }
        const candidate = await User.findOne({where: {email}})
        if(candidate) {
            return next(ApiError.badRequest("User with this email already exist!"));
        }
        console.log("PWD->", password);
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({email, password: hashPassword, role});
        console.log("USR1->", user)
        // const basket - //TODO доделать создание Корзины по дефолту
        //Generate jwt token
        const token = generateJwt(user.id, user.email, user.role)
        //TODO: return username & token as additional info
        return res.status(201).json({user: user.email, token})
    }
    //TODO: description jsdoc
    async login(req, res, next) {
        //Get email & password val from the request body
        const {email, password} = req.body
        //find user using Sequilize findOne static method
        const user = await User.findOne({where: {email}})
        if(!user) {
            return next(ApiError.badRequest("User not yet created."))
        }
        if(!password) {
            return next(ApiError.badRequest("Password does not exist in the request body."))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword) {
            return next(ApiError.badRequest("The password is incorrect!"))
        }
        //Generate jwt token
        const token = generateJwt(user.id, user.email, user.role)
        //TODO: return username & token as additional info
        return res.status(200).json({user: user.email, token})

    }
    //TODO: description jsdoc
    async checkUser(req, res, next) {
        const {email, password, role} = req.body
        const token = generateJwt(user.id, user.email, user.role)

        return res.status(200).json({user: user.email, token})
    }
    //TODO: description jsdoc
    async resetPassword(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if(!user) {
            return next(ApiError.badRequest("User not found!"))
        }
        if(!password) {
            return next(ApiError.badRequest("Password does not exist in the request body."))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword) {
            return next(ApiError.badRequest("The password is incorrect!"))
        }
        //Generate new HASH using 
        const newPassword = process.env.RESTORE_PASSWORD_STRING + password;
        const updatedHashPassword = await bcrypt.hash(newPassword, 5);
        const updatedUser = await User.update(
            {
                password: updatedHashPassword
            },
            {
                where: {email}
            }
        );

        const token = generateJwt(user.id, user.email, user.role);

        return res.status(200).json({user: user.email, token})
    }
}

module.exports = new UserController();