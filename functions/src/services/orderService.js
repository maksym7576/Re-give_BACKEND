const orderRepository = require('../repositories/orderRepository');
const Order = require('../models/order');

const orderService = {
    async createOrder(productId, userId) {
        try {
            // Створюємо об'єкт замовлення
            const newOrder = new Order(productId, userId);

            // Зберігаємо замовлення через репозиторій
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
            return await orderRepository.findOrderById(orderId);
        } catch (error) {
            console.error("Error while create an order:", error);
            throw new Error("Error while create an order:");
        }
    }
};

module.exports = orderService;