const admin = require('firebase-admin');
const db = admin.firestore();
const orderRepository = {

    async saveOrder(orderData) {
        try {
            const orderToSave = {
                ...orderData,
                createdAt: new Date()
            };

            const docRef = await db.collection('orders').add(orderToSave);
            return docRef.id;
        } catch (error) {
            console.error("Error while saving an order:", error);
            throw error;
        }
    },

    async findOrderById(orderId) {
        try {
            const doc = await db.collection('orders').doc(orderId).get();

            if (!doc.exists) {
                return null;
            }

            return {
                id: doc.id,
                ...doc.data()
            };
        } catch (error) {
            console.error("Error to find an order:", error);
            throw error;
        }
    }
};

module.exports = orderRepository;