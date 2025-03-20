const express = require('express');
const router = express.Router();
const { createOrder, getOrderById } = require('../controllers/orderController');

router.get('/create/:productId/:userId', createOrder);
router.post('/create', createOrder);
router.get('/:orderId', getOrderById);

module.exports = router;