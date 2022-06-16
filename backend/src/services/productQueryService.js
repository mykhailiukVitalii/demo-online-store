const { Product , Comment } = require("../db/models/models");
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
 * Check Product in the system by id
 * @param {string} id - product id.
 * @returns {Promise} Promise object represents product
 */
 const checkProductById = async (id) => {
     //TODO: refactoring
    const prCandidate = await Product.findOne({ //.findByPk(2) получим пользователя с id=2
        where: {id}
    });

    if(!prCandidate) {
        throw ApiError.notFound("Product with this ID does not found!");
    }

    return prCandidate;
};
/**
 * CREATE new Product
 * @param {object} data - product data.
 * @returns {Promise} Promise object represents user
 */
 const cteateProduct = async (data) => {
    //Check candidate
    const { name } = data;
    await checkNewProductByName(name);

    return await Product.create(data);
};
/**
 * Update exist Product
 * @param {object} data - new product data.
 * @returns {Promise} Promise object ...
 */
const updateProductById = async (data) => {
    // //Check candidate
    const { id } = data;
    await checkProductById(id);
    //Updating
    const updatedProduct = await Product.update(
        data,
        { where: {id}}
    );

    if(!updatedProduct) {
        throw ApiError.badRequest("Product failed to updates.")
    }

    return updatedProduct;
}

/**
 * Delete exist Product by ID
 * @param {object} id - product id.
 * @returns {Promise} Promise object ...
 */
 const deleteProduct = async (productId) => {
    //Check candidate
    await checkProductById(productId);
    //Delete
    return await Product.destroy({
        where: {
            id: productId
        }
    });
}

/**
 * Delete exist Product by ID
 * @param {object} id - product id.
 * @returns {Promise} Promise object ...
 */
 const getProductComments = async (productId) => {
    //Check candidate
    await checkProductById(productId);
    //Get ALL comments
    const comment = await Product.findAll({
        include: [{
            model: Comment,
            as: "comment"
        }],
        where: { id: productId }
    });
    
    return comment[0].comment
}



module.exports = {
    getProductById,
    getProducts,
    cteateProduct,
    deleteProduct,
    updateProductById,
    getProductComments
}