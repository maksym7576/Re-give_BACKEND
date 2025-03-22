class OrderWithProductDTO {
    constructor(order, product) {
        this.orderId = order.id;
        this.isAccepted = order.isAccepted;
        this.isFinished = order.isFinished;
        this.productId = product.productId;
        this.name = product.name;
        this.description = product.description;
        this.imageUrl = product.imageUrl;
        this.location = product.location;
        this.objectType = product.objectType;
    }
}

module.exports = OrderWithProductDTO;
