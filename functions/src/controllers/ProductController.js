const { onRequest } = require('firebase-functions/v2/https');
const productService = require('../services/ProductService');

const createProduct = onRequest(async (req, res) => {
    try {
        const { name, description, uid, imageUrl, objectType, location } = req.body;
        const newProduct = await productService.createProduct(name, description, uid, imageUrl, objectType, location);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

const getProductById = onRequest(async (req, res) => {
    try {
        const id = req.path.split('/').pop();
        const product = await productService.getProductById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

const updateProduct = onRequest(async (req, res) => {
    try {
        const id = req.path.split('/').pop();
        const { name, description, uid, imageUrl, objectType, location } = req.body;
        const updatedProduct = await productService.updateProduct(id, name, description, uid, imageUrl, objectType, location);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

const deleteProduct = onRequest(async (req, res) => {
    try {
        const id= req.path.split('/').pop();
        await productService.deleteProduct(id);
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

module.exports = { createProduct, getProductById, updateProduct, deleteProduct };
