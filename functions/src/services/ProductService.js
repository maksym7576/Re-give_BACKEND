const Product = require('../models/Product');
const productRepository = require('../repository/ProductRepository');

const createProduct = async (name, description, uid, imageUrl, objectType, location) => {
    const product = new Product(name, description, uid, imageUrl, objectType, location);
    await productRepository.createProduct(product);
    return product;
};

const getProductsByUserUid = async (uid) => {
    const products = await productRepository.getProductsByUserUid(uid);
    return products;
};

const getProductById = async (id) => {
    const product = await productRepository.getProductById(id);
    return product;
};

const getAllProducts = async () => {
    const products = await productRepository.getAllProducts();
    return products;
}

const updateProduct = async (id, name, description, uid, imageUrl, objectType, location) => {
    const product = new Product(name, description, uid, imageUrl, objectType, location);
    await productRepository.updateProduct(id, product);
    return product;
};

const deleteProduct = async (id) => {
    await productRepository.deleteProduct(id);
};

module.exports = { createProduct, getProductById, updateProduct, deleteProduct, getProductsByUserUid, getAllProducts };
