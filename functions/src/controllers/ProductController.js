const express = require('express');
const productService = require('../services/ProductService');
const authMiddleware = require('../middleware/AuthMiddleware');

const router = express.Router();

router.post('/products', authMiddleware, async (req, res) => {
    try {
        const { name, description, imageUrl, objectType, location } = req.body;
        const uid = req.user.uid;

        const newProduct = await productService.createProduct(name, description, uid, imageUrl, objectType, location);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/products/user', authMiddleware, async (req, res) => {
    try {
        const uid = req.user.uid;
        const products = await productService.getProductsByUserUid(uid);
        res.status(200).json(products);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

router.get('/products/:id', async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

router.get('/products', async (req, res) => {
    try {
        const product = await productService.getAllProducts();
        res.status(200).json(product);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

router.put('/products/:id', async (req, res) => {
    try {
        const { name, description, uid, imageUrl, objectType, location } = req.body;
        const updatedProduct = await productService.updateProduct(req.params.id, name, description, uid, imageUrl, objectType, location);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/products/:id', async (req, res) => {
    try {
        await productService.deleteProduct(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

module.exports = router;
