const { Product } = require("../db/models/models");
const ApiError = require("../errors/ApiError");

/**
 * GET Product by {:id}
 * @param {string} id - product id.
 * @returns {Promise} Promise object represents product
 */
 const getProductById = async (id) => {
    const product = await Product.findOne({
        where: {id}
    });

    if(!product) {
        throw ApiError.notFound("Product with this {:id} not found!");
    }

    return product;
};
/**
 * GET Products
 * @returns {Promise} Promise object represents products
 */
 const getProducts = async () => {
    return await Product.findAll();
};
/**
 * Check Product in the system by name
 * @param {string} name - product name.
 * @returns {Promise} Promise object represents product
 */
 const checkNewProductByName = async (name) => {
    const prCandidate = await Product.findOne({
        where: {name}
    });

    if(prCandidate) {
        throw ApiError.badRequest("Product with this name already exist!");
    }
};
/**
 * CREATE new Product
 * @param {object} data - product data.
 * @returns {Promise} Promise object represents user
 */
 const cteateProduct = async (data) => {
    //Check candidate
    await checkNewProductByName(data.name);

    return await Product.create(data);
};

module.exports = {
    getProductById,
    getProducts,
    cteateProduct
}