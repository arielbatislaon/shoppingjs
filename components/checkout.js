import { Items } from './item-list'
import { OrderItem } from './item-models';
import DiscountCalculation  from './discount-calculation';


export class Checkout {

    constructor(pricingRules = new DiscountCalculation() ) {
        this.pricingRules = pricingRules;
        this.Orders = []
    }

    scan(item) {
        try {
            let skuItem = Items.filter(sku => {
                return sku.id === item;
            })[0];
            if (!skuItem) {
                throw (`Item ${item} not found in item list`); //item not fund in item list
            } else {
                let orderItem = new OrderItem(skuItem) // create order item 
                this.Orders.push(orderItem); // add to Orders array
            }
        }
        catch (e) {
            console.log("Error: " + e);
        };
    }

    clear() {
        this.Orders = [];
    }

    total() {
        const that = this;
        const subTotalledByQtyOrders = () => {
            let subTotalOrder = [];
            that.Orders.map(order1 => {
                let index = subTotalOrder.findIndex(order2 => {
                    return order1.SKU.id === order2.SKU.id
                });
                if (index > -1) {
                    subTotalOrder[index].qty += order1.qty;
                } else {
                    subTotalOrder.push(order1);
                }
                return order1
            })
            return subTotalOrder
        }
        
       const returnTotal = subTotalledByQtyOrders().reduce((total, item) => {
            return total + this.pricingRules.discountedPrice[item.SKU.id](this.Orders)
        }, 0);
        return returnTotal;
    }
}

