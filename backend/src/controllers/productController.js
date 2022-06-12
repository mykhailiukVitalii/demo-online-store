const ApiError = require("../errors/ApiError");
const { validationResult } = require("express-validator");

const { getProductById, getProducts, cteateProduct } = require("../services/productQueryService");

class ProductController {
    /**
     * Get all products(list)
     */
    async getProducts(req, res, next) {
        try {
            // const product = [] //TODO: first using mock data
            const products = await getProducts();

            return res.status(200).json(products);
        }
        catch (e) {
            return next(e);
        }
    }
    /**
     * Get specific product
     */
    async getProduct(req, res, next) {
        try {
            // const product = { "id": 1, "name": "iphone_13", "price": 1100 }; //TODO: first using mock data

            // //GET :id from the request params
            const { id } = req.params;
            const product = await getProductById(id);

            return res.status(200).json(product);
        }
        catch (e) {
            return next(e);
        }
    }
    /**
     * Create new Product
     */
    //TODO: WIP
    async createProduct(req, res, next) {
        try {
            //---Vilidation processing
            const errors = validationResult(req);
            const errorsFullMsg = errors.errors.map(err => err.msg);
            //Check name & price presenting
            if(!errors.isEmpty()) {
                return next(ApiError.badRequest(`Next product fields are empty: ${errorsFullMsg}. Check request body.`));
            }
            // const product = { "id": 1, "name": "iphone_13", "price": 1100 }; //TODO: first using mock data
            const { name, price, img, brand_id, comment_id } = req.body;
            //TODO: WIP - добавить Дескрипшн и убрать лишнюю сущность бренд
            
            const newProduct = await cteateProduct({ name, price, img, brand_id, comment_id })
            //TODO: WIP - use brand_id + comment_id

            return res.status(201).json(newProduct);
        }
        catch (e) {
            return next(e);
        }
    }
    // /**
    //  * Update exist Product
    //  */
    // //TODO: WIP
    // async updateProduct(req, res, next) {
    //     try {
    //         const updateProduct = { "id": 1, "name": "iphone_13", "price": 1150 };

    //         return res.status(200).json(updateProduct);
    //     }
    //     catch (e) {
    //         return next(e);
    //     }
    // }
    /**
     * Delete exist Product
     */
    //TODO: WIP
    async deleteProduct(req, res, next) {
        try {
            const productById = { "id": 1, "name": "iphone_13", "price": 1150 };

            return res.status(204).json(productById);
        }
        catch (e) {
            return next(e);
        }
    }
};

module.exports = new ProductController();