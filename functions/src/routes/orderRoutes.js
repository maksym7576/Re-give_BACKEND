const express = require('express');
const router = express.Router();
const { createOrder, getOrderById, deleteOrder} = require('../controllers/orderController');

router.get('/create/:productId/:userId', createOrder);
router.post('/create', createOrder);
router.get('/:orderId', getOrderById);
router.delete('/delete/:orderId/:uid', deleteOrder);
module.exports = router;