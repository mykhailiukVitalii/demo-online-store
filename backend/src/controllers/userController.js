const ApiError = require("../errors/ApiError");
const { validationResult } = require("express-validator");

const { createUser, loginUser, setPassword, getAllUsers, checkUser } = require("../services/userQueryService");
//TODO: WIP - "Password or Email does not exist in the request body." вынести в константу и переиспользовать в тестах

class UserController {
    /**
     * New user registration
     */
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
    /**
     * Login user
     */
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
            //Find and preparate user info
            const lgnUser = await loginUser(email, password);
            //return username & token as additional info
            return res.status(200).json(lgnUser);
        }
        catch(e) {
            return next(e);
        }
    }
    /**
     * Update the password of an existing user
     */
    async resetPassword(req, res, next) {
        try {
            //---Vilidation processing
            const errors = validationResult(req)
            //Check email & password presenting
            if(!errors.isEmpty()) {
                return next(ApiError.badRequest("Password or Email does not exist in the request body."));
            }
            //Get email & password val from the request body
            const {email, password} = req.body;
            //SET user password
            const updates = await setPassword(email, password);
            //return username & token as additional info
            return res.status(201).json(updates);
        }
        catch(e) {
            return next(e);
        }
    }
    /**
     * Check if the user exists in the system
     */
    async check(req, res, next) {
        const { user } = req
        const token = checkUser(user)

        return res.status(200).json({token})
    }
    /**
     * Get all users(list)
     */
    async getUsers(req, res, next) {
        try {
            const users = await getAllUsers();
            
            return res.status(200).json(users);
        }
        catch(e) {
            return next(e);
        }
    }
}

module.exports = new UserController();