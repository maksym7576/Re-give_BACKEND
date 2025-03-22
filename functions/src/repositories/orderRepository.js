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

    async findOrdersByProductId(productId) {
        try {
            const snapshot = await db.collection('orders').where('productId', '==', productId).get();
            if (snapshot.empty) {
                return [];
            }

            const orders = [];
            snapshot.forEach(doc => {
                orders.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            return orders;
        } catch (error) {
            console.error("Error finding orders by productId:", error);
            throw error;
        }
    },

    async updateOrder(orderId, updatedData) {
        try {
            const orderRef = db.collection('orders').doc(orderId);
            await orderRef.update(updatedData);
            console.log(`Order ${orderId} updated successfully`);
        } catch (error) {
            console.error("Error updating order:", error);
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
    },

    async deleteOrderById(orderId) {
        try {
            await db.collection('orders').doc(orderId).delete();
            console.log("Order was deleted");
            return true;
        } catch (error) {
            console.error("Error deleting order:", error);
            throw error;
        }
    }
};

module.exports = orderRepository;