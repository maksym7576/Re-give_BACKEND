class Order {
    constructor(productId, userId, isAccepted = false, isFinished = false) {
        this.productId = productId;
        this.userId = userId;
        this.isAccepted = isAccepted;
        this.isFinished = isFinished;
    }
}

module.exports = Order;