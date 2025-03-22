const express = require('express');
const router = express.Router();
const { createOrder, getOrderById, deleteOrder, acceptOrder} = require('../controllers/orderController');

router.get('/create/:productId/:userId', createOrder);
router.post('/create', createOrder);
router.get('/:orderId', getOrderById);
router.delete('/delete/:orderId/:uid', deleteOrder);
router.put('/accept/:orderId/:userId/:productId', acceptOrder);
module.exports = router;