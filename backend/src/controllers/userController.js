const bcrypt = require("bcrypt"); //TODO: del
const jwt = require("jsonwebtoken"); //TODO: del
const ApiError = require("../errors/ApiError");
const { User } = require("../db/models/models");
const { validationResult } = require("express-validator");

const { createUser, loginUser } = require("../services/userQueryService");
// const { bcryptComparePwd } = require("../services/bcryptTokenService");

const generateJwt = (id, email, role) => { //TODO: del
    return jwt.sign(
        { id, email, role },
        process.env.SECRET_KEY,
        { expiresIn: "24h" }
    );
}

class UserController {
    //TODO: description jsdoc - как описать документацию
    async registration(req, res, next) {
        try {
            //---Vilidation processing
            const errors = validationResult(req)
            //Check email & password presenting
            if(!errors.isEmpty()) {
                return next(ApiError.badRequest("Password or Email does not exist in the request body."));
            }
            //GET email & password & role val from the request body
            const {email, password, role} = req.body;
            const newUser = await createUser({ email, password, role});            
            // const basket - //TODO: доделать создание Корзины по дефолту
            //return username & token as additional info
            return res.status(201).json(newUser);
        } catch(e) {
            return next(e);
        }        
    }
    //TODO: description jsdoc
    async login(req, res, next) {
        try {
            //---Vilidation processing
            const errors = validationResult(req)
            //Check email & password presenting
            if(!errors.isEmpty()) {
                return next(ApiError.badRequest("Password or Email does not exist in the request body."));
            }
            //Get email & password val from the request body
            const {email, password} = req.body;
            //FInd and preparate user info
            const lgnUser = await loginUser({ email, password });
            //return username & token as additional info
            return res.status(200).json(lgnUser);
        }
        catch(e) {
            return next(e);
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
            return next(ApiError.internal(e));
        }
    }
    //TODO: description jsdoc
    async getUsers(req, res, next) {
        try {
            const users = await User.findAll();
            
            return res.status(200).json(users);
        }
        catch(e) {
            return next(ApiError.internal(e));
        }
    }
}

module.exports = new UserController();