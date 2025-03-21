const orderRepository = require('../repositories/orderRepository');
const Order = require('../models/order');
const { getUserByUid } = require("../services/authService");
const productService = require('../services/ProductService');
const OrderWithProductDTO = require('../dtos/orderWithProductDTO');
const orderService = {
    async createOrder(productId, userId) {
        try {
            const newOrder = new Order(productId, userId);

            const orderId = await orderRepository.saveOrder(newOrder);

            console.log(`Creating order: ${orderId}`);
            return orderId;
        } catch (error) {
            console.error("Error while create an order:", error);
            throw new Error("Error while create an order");
        }
    },

    async getOrderById(orderId) {
        try {
            console.log(`Order was found by id:, ${orderId}`);
            return await orderRepository.findOrderById(orderId);
        } catch (error) {
            console.error("Error while create an order:", error);
            throw new Error("Error while create an order:");
        }
    },

    async deleteOrderById(orderId, userUid) {
        try {
            const order = await this.getOrderById(orderId);
            console.log(`Deleting order: ${order.userId}`);
            const user = await getUserByUid(userUid);
            const userRole = user.customClaims?.role || "user";
            console.log(`User was found by role: ${userRole}`);

            if (order.userId === userUid || userRole === "admin") {
                console.log("Deletion authorized, proceeding with delete operation");
                return await orderRepository.deleteOrderById(orderId);
            } else {
                console.log("Deletion not authorized, permission denied");
                throw new Error("Permission denied: You can only delete your own orders unless you are an admin");
            }
        } catch (error) {
            throw new Error("Error while deleting an order")
        }
    },

    async userOrdersWithProductData(userId) {
        const ordersSnapshot = await orderRepository.getAllProductsByUserId(userId);
        const ordersList = ordersSnapshot.docs.map(doc => doc.data());
        const ordersWithProductsList = [];
        for (const order of ordersList) {
            const product = await productService.getProductById(order.productId);
            if (!product) {
                continue;
            }
            ordersWithProductsList.push(new OrderWithProductDTO(order, product));
        }

        return ordersWithProductsList;
    }




};

module.exports = orderService;