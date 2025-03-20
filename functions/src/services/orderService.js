// functions/src/services/orderService.js
const orderRepository = require('../repositories/orderRepository');
const Order = require('../models/order');

// Сервіс для роботи з замовленнями
const orderService = {
    // Метод для створення нового замовлення
    async createOrder(productId, userId) {
        try {
            // Створюємо об'єкт замовлення
            const newOrder = new Order(productId, userId);

            // Зберігаємо замовлення через репозиторій
            const orderId = await orderRepository.saveOrder(newOrder);

            console.log(`✅ Створено нове замовлення з ID: ${orderId}`);
            return orderId;
        } catch (error) {
            console.error("❌ Помилка при створенні замовлення:", error);
            throw new Error("Не вдалося створити замовлення");
        }
    },

    // Метод для отримання замовлення за ID
    async getOrderById(orderId) {
        try {
            return await orderRepository.findOrderById(orderId);
        } catch (error) {
            console.error("❌ Помилка при отриманні замовлення:", error);
            throw new Error("Не вдалося отримати замовлення");
        }
    }
};

module.exports = orderService;