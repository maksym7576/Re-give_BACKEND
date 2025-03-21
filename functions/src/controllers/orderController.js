const orderService = require('../services/orderService');


exports.createOrder = async (req, res) => {
    try {
        let productId, userId;

        if (req.method === 'GET') {
            productId = req.params.productId;
            userId = req.params.userId;
        } else {
            productId = req.body.productId;
            userId = req.body.userId;
        }

        if (!productId || !userId) {
            return res.status(400).json({
                success: false,
                error: "Needs to write productId and userId"
            });
        }

        const orderId = await orderService.createOrder(productId, userId);

        return res.status(201).json({
            success: true,
            message: `Order created successful by ID: ${orderId}`,
            orderId
        });

    } catch (error) {
        console.error("Error while creating an order::", error);
        return res.status(500).json({
            success: false,
            error: "Server error"
        });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const {orderId} = req.params;

        if (!orderId) {
            return res.status(400).json({
                success: false,
                error: "OrderId is not exists"
            });
        }

        const order = await orderService.getOrderById(orderId);

        if (!order) {
            return res.status(404).json({
                success: false,
                error: "Order not found"
            });
        }

        return res.status(200).json({
            success: true,
            order
        });

    } catch (error) {
        console.error("Error an receiving an order:", error);
        return res.status(500).json({
            success: false,
            error: "Server error"
        });
    }
};

    exports.deleteOrder = async (req, res) => {
        console.log("start deleting an order")
        try {
            const { orderId, uid } = req.params;
            if (!orderId || !uid) {
                return res.status(400).json({
                    success: false,
                    error: "OrderId is not exists"
                });
            }
            await orderService.deleteOrderById(orderId, uid);
            return res.status(200).json({
                success: true,
                order: "Deleted successful by ID"
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: "Server error"
            });
        }
    };