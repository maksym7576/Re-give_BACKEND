const express = require('express');
const productService = require('../services/ProductService');

const controller = express.Router();

controller.post('/products', async (req, res) => {
    try {
        const { name, description, uid, imageUrl, objectType, location } = req.body;
        const newProduct = await productService.createProduct(name, description, uid, imageUrl, objectType, location);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

controller.get('/products/:id', async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

controller.put('/products/:id', async (req, res) => {
    try {
        const { name, description, uid, imageUrl, objectType, location } = req.body;
        const updatedProduct = await productService.updateProduct(req.params.id, name, description, uid, imageUrl, objectType, location);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

controller.delete('/products/:id', async (req, res) => {
    try {
        await productService.deleteProduct(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

module.exports = controller;
