const express = require('express');
const router = express.Router();
const { createOrder, getOrderById, deleteOrder, getUserOrdersWithProductData, acceptOrder} = require('../controllers/orderController');

router.post('/create', createOrder);
router.post('/create', createOrder);
router.get('/:orderId', getOrderById);
router.delete('/delete/:orderId/:uid', deleteOrder);
router.get('/get/with-products/:userId', getUserOrdersWithProductData);
router.put('/accept/:orderId/:userId/:productId', acceptOrder);
module.exports = router;