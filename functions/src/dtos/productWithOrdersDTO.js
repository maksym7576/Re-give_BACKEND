class productWithOrdersDTO {
    constructor(order, product, user) {
        this.productId = product.productId;
        this.name = product.name;
        this.description = product.description;
        this.imageUrl = product.imageUrl;
        this.location = product.location;
        this.objectType = product.objectType;
        this.orderId = order.id;
        this.isAccepted = order.isAccepted;
        this.isFinished = order.isFinished;
        this.email = user.email;
    }
}

module.exports = productWithOrdersDTO;
