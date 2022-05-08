const ApiError = require("../errors/ApiError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {User} = require("../models/models");
const { validationResult } = require("express-validator");
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
    //TODO: description jsdoc - как описать документацию
    async registration(req, res, next) {
        try {
            const {email, password, role} = req.body;
            if(!email || !password) {
                return next(ApiError.badRequest("Incorrect email OR pwd! Check entered data."));
            }
            const candidate = await User.findOne({where: {email}});
            if(candidate) {
                return next(ApiError.badRequest("User with this email already exist!"));
            }
            console.log("PWD->", password);
            const hashPassword = await bcrypt.hash(password, 5);
            const user = await User.create({email, password: hashPassword, role});
            console.log("USR1->", user.dataValues);
            // const basket - //TODO доделать создание Корзины по дефолту
            //Generate jwt token
            const token = generateJwt(user.id, user.email, user.role);
            //TODO: return username & token as additional info
            return res.status(201).json({user: user.email, token});
        }
        catch(e) {
            return next(ApiError.internl(e));
        }        
    }
    //TODO: description jsdoc
    async login(req, res, next) {
        try {
            const errors = validationResult(req)
            //Check email & password presenting
            if(!errors.isEmpty()) {
                return next(ApiError.badRequest("Password or Email does not exist in the request body."));
            }
            //Get email & password val from the request body
            const {email, password} = req.body;
            //find user using Sequilize findOne static method
            const user = await User.findOne({where: {email}});
            if(!user) {
                return next(ApiError.notFound("User not yet created."));
            }
            let comparePassword = bcrypt.compareSync(password, user.password);
            if(!comparePassword) {
                return next(ApiError.badRequest("The password is incorrect!"));
            }
            //Generate jwt token
            const token = generateJwt(user.id, user.email, user.role);
            //TODO: return username & token as additional info
            return res.status(200).json({user: user.email, token}); //TODO: можно ли запросы обернуть тоже в мидлваре что бы прокинуть только метод, статус и боди
        }
        catch(e) {
            return next(ApiError.internl(e));
        }
    }
    //TODO: description jsdoc
    async resetPassword(req, res, next) {
        try {
            const errors = validationResult(req)
            //Check email & password presenting
            if(!errors.isEmpty()) {
                return next(ApiError.badRequest("Password or Email does not exist in the request body."));
            }
            const {email, password} = req.body;
            const user = await User.findOne({where: {email}});
            if(!user) {
                return next(ApiError.notFound("User not found!"));
            }
            let comparePassword = bcrypt.compareSync(password, user.password);
            if(!comparePassword) {
                return next(ApiError.badRequest("The password is incorrect!"));
            }
            if(user.is_pwd_restored) {
                return next(ApiError.badRequest("Password is already updated. User has only one chance for updating!"));
            }
            //Generate new HASH using 
            const newPassword = process.env.RESTORE_PASSWORD_STRING + password;
            const updatedHashPassword = await bcrypt.hash(newPassword, 5);
            const updatedUser = await User.update(
                {
                    password: updatedHashPassword,
                    is_pwd_restored: true
                },
                {
                    where: {email}
                }
            );

            const token = generateJwt(user.id, user.email, user.role);

            return res.status(201).json({user: user.email, token});
        }
        catch(e) {
            return next(ApiError.internl(e));
        }
    }
    //TODO: description jsdoc
    async getUsers(req, res, next) {
        try {
            const users = await User.findAll();
            
            return res.status(200).json(users);
        }
        catch(e) {
            return next(ApiError.internl(e));
        }
    }
}

module.exports = new UserController();