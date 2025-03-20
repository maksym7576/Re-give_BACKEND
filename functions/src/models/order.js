class Order {
    constructor(productId, userId, isPaid = false, isShipped = false) {
        this.productId = productId;
        this.userId = userId;
        this.isPaid = isPaid;
        this.isShipped = isShipped;
        this.createdAt = new Date();
    }
}

module.exports = Order;