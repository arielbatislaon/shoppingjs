const Items = [
    { id: 'ipd', name: 'Super Ipad', price: 549.99 },
    { id: 'mbp', name: 'Macbook Pro', price: 1399.99 },
    { id: 'atv', name: 'Apple TV', price: 109.50 },
    { id: 'vga', name: 'VGA adpater', price: 30.00 }
];

const ItemDiscCalc = {
    'atv': {
        discountedPrice: (order, skuType) => {
            const atvOrder = order.filter(item => {
                   return item.SKU.id === 'atv' 
            })[0];
            let payQty = atvOrder.qty - Math.floor(atvOrder.qty / 3); // get 3 pay 2
            return payQty * atvOrder.SKU.price;
        }
    },
    'ipd': {
        discountedPrice: (order, skuType) => {
            const ipdOrder = order.filter(item => {
                return item.SKU.id === 'ipd' 
            })[0];
            let discPrice = ipdOrder.SKU.price
            if (ipdOrder.qty > 4) {
                discPrice = 499.99;
            }
            return ipdOrder.qty * discPrice;
        }
    },
    'vga': {
        discountedPrice: (order, skuType) => {
            const vgaOrder = order.filter(item => {
                return item.SKU.id === 'vga' 
            })[0];
            const ipdOrder = order.filter(item => {
                return item.SKU.id === 'ipd' 
            })[0];
            const ipdorderQty = !!ipdOrder ? ipdOrder.qty : 0;
            let payQty = vgaOrder.qty  - ipdorderQty  // get free vga for every ipd
            return payQty * vgaOrder.SKU.price;
        }
    },
    'mbp': {
        discountedPrice: (order) => {
            const mbpOrder = order.filter(item => {
                return item.SKU.id === 'mbp' 
            })[0];
            return mbpOrder.qty * mbpOrder.SKU.price;
        }
    }
}

class SKU {
    constructor(id, name, price) {
        Object.assign(this, { id, name, price });
    }
}

class OrderItem {
    constructor(SKU, qty = 1) {
        Object.assign(this, { SKU, qty });
        this.discount = 0;
        this.totalPrice = () => (this.price * this.qty) - this.discount;
        this.skuType = SKU.id;
    }
}

class Checkout {

    constructor() {
        this.Orders = []
    }

    scan(item) {
        let skuItem = Items.filter(sku => {
            return sku.id === item;
        })[0];
        let orderItem = new OrderItem(skuItem, 1)
        let isExistingItem = this.Orders.some(sku =>{
            return sku.SKU.id === item
        });
        if(!isExistingItem) {
            this.Orders.push(orderItem);
        } else {
            let index = this.Orders.findIndex( element => {
                return element.SKU.id === item
            });
            this.Orders[index].qty += 1;
        }
        if(item === 'mvp') {
            this.scan('vga');
        }
    };

    total() {
        const returnTotal = this.Orders.reduce((total, item) =>{
             return total + ItemDiscCalc[item.SKU.id].discountedPrice(this.Orders)
        }, 0);
        return returnTotal;
    }
}

let chk = new Checkout();
chk.scan('atv');
chk.scan('atv');
chk.scan('atv');
chk.scan('vga');
console.log(chk.total());
chk = new Checkout();
chk.scan('atv');
chk.scan('ipd');
chk.scan('ipd');
chk.scan('atv');
chk.scan('ipd');
chk.scan('ipd');
chk.scan('ipd');
console.log(chk.total());
chk = new Checkout();
chk.scan('mbp');
chk.scan('vga');
chk.scan('ipd');
console.log(chk.total());




