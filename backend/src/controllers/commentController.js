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
}

module.exports = new CommentController();