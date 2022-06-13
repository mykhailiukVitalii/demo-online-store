const ApiError = require("../errors/ApiError");
const { validationResult } = require("express-validator");

const { getProductById, getProducts, cteateProduct, updateProductById, deleteProduct } = require("../services/productQueryService");

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
    async createProduct(req, res, next) {
        try {
            // const product = { "id": 1, "name": "iphone_13", "price": 1100 }; //TODO: first using mock data
            //---Vilidation processing
            const errors = validationResult(req);
            const errorsFullMsg = errors.errors.map(err => err.msg);
            //Check name & price presenting
            if(!errors.isEmpty()) {
                return next(ApiError.badRequest(`Next product fields are empty: ${errorsFullMsg}. Check request body.`));
            }
            
            const { name, price, img, comment_id } = req.body;            
            const newProduct = await cteateProduct({ name, price, img, comment_id });

            return res.status(201).json(newProduct);
        }
        catch (e) {
            return next(e);
        }
    }
    /**
     * Update exist Product
     */
    //TODO: WIP
    async updateProduct(req, res, next) {
        try {
            // const updateProduct = { "id": 1, "name": "iphone_13", "price": 1150, "img": "/test" }; //TODO: first using mock data
            //---Vilidation processing
            const errors = validationResult(req);
            const errorsFullMsg = errors.errors.map(err => err.msg);
            //Check name & price presenting
            if(!errors.isEmpty()) {
                return next(ApiError.badRequest(`Next product fields are empty: ${errorsFullMsg}. Check request body.`));
            }
            const updateProduct = await updateProductById(req.body);

            return res.status(200).json(updateProduct);
        }
        catch (e) {
            return next(e);
        }
    }
    /**
     * Delete exist Product
     */
    async deleteProduct(req, res, next) {
        try {
            // const productById = { "id": 1, "name": "iphone_13", "price": 1150 }; //TODO: first using mock data
            const { id } = req.body;
            await deleteProduct(id);

            return res.status(204).send();
        }
        catch (e) {
            return next(e);
        }
    }
};

module.exports = new ProductController();