const ApiError = require("../errors/ApiError");
const { validationResult } = require("express-validator");
const { Comment } = require("../db/models/models");

class CommentController {
    /**
     * Get all comments(list)
     */
    async getComments(req, res, next) {
        try {
            // const comments = [] //TODO: first using mock data
            const comments = await Comment.findAll();

            return res.status(200).json(comments);
        }
        catch (e) {
            return next(e);
        }
    }
    // /**
    //  * Create new Comment
    //  */
    // TODO: WIP - move to services
    //  async createComment(req, res, next) {
    //     try {
    //         // const product = { "id": 1, "name": "iphone_13", "price": 1100 }; //TODO: first using mock data
    //         //---Vilidation processing
    //         const errors = validationResult(req);
    //         const errorsFullMsg = errors.errors.map(err => err.msg);
    //         //Check name & price presenting
    //         if(!errors.isEmpty()) {
    //             return next(ApiError.badRequest(`Next comment fields are empty: ${errorsFullMsg}. Check request body.`));
    //         }
            
    //         const { product_id, comment } = req.body;            
    //         const newComment = await Comment.create({ comment, product_id });

    //         return res.status(201).json(newComment);
    //     }
    //     catch (e) {
    //         return next(e);
    //     }
    // }
}

module.exports = new CommentController();