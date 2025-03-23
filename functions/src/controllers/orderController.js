const orderService = require('../services/orderService');


exports.createOrder = async (req, res) => {
    try {
        const { productId, userId } = req.body;

        if (!productId || !userId) {
            return res.status(400).json({
                success: false,
                error: "Needs to provide productId and userId"
            });
        }

        const orderId = await orderService.createOrder(productId, userId);

        return res.status(201).json({
            success: true,
            message: `Order created successfully with ID: ${orderId}`,
            orderId
        });

    } catch (error) {
        console.error("Error while creating an order:", error);
        return res.status(500).json({
            success: false,
            error: "Server error"
        });
    }
};

exports.acceptOrder = async (req, res) => {
    try {
        const { orderId, userId, productId } = req.params;

        if (!orderId || !userId || !productId) {
            return res.status(400).json({
                success: false,
                error: "Missing orderId, userId or productId"
            });
        }

        const success = await orderService.acceptOrder(orderId, userId, productId);

        if (success) {
            return res.status(200).json({
                success: true,
                message: `Order ${orderId} accepted successfully by user ${userId}`
            });
        } else {
            return res.status(404).json({
                success: false,
                error: "Order not found or not accepted"
            });
        }

    } catch (error) {
        console.error("Error while accepting an order:", error);
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

exports.getUserOrdersWithProductData = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({
                error: "UserId is required"
            });
        }
        const ordersWithProducts = await orderService.userOrdersWithProductData(userId);

        if (!ordersWithProducts || ordersWithProducts.length === 0) {
            return res.status(404).json({
                error: "No orders found for this user"
            });
        }
        return res.status(200).json({ orders: ordersWithProducts });
    } catch (error) {
        console.error("Error while fetching user orders with products:", error);
        return res.status(500).json({
            error: "Server error"
        });
    }
};

exports.getOrdersByProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        if (!productId) {
            return res.status(400).json({
                success: false,
                error: "ProductId is required"
            });
        }

        const ordersWithProductData = await orderService.getOrdersByProductId(productId);

        if (!ordersWithProductData.length) {
            return res.status(404).json({
                success: false,
                error: "No orders found for this product"
            });
        }

        return res.status(200).json({
            success: true,
            orders: ordersWithProductData
        });

    } catch (error) {
        console.error("Error fetching orders by product:", error);
        return res.status(500).json({
            success: false,
            error: "Server error"
        });
    }
};