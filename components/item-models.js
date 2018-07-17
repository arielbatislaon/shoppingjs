export class SKU {
    constructor(id, name, price) {
        Object.assign(this, { id, name, price });
    }
};

export class OrderItem {
    constructor(SKU, qty = 1) {
        Object.assign(this, { SKU, qty });
        this.discount = 0;
        this.totalPrice = () => (this.price * this.qty) - this.discount;
        this.skuType = SKU.id;
    }
};
 