import { Item } from './item-list'
import GenericDiscountCalculation from './default-discount-calculation'

const ATV_BUYPAY_RATE = 3 / 2; // buy 3 pay 2
const IPD_QTY_FOR_DISCOUNT = 4
const IPD_DISCOUNTED_PRICE = 499.99;

class DiscountCalculation extends GenericDiscountCalculation {
    constructor() {
        super();
        this.discountedPrice = {};
        this.discountedPrice['atv'] = (order) => {
            const atvOrder = order.filter(item => {
                return item.SKU.id === 'atv'
            })[0];
            let payQty = Math.ceil(atvOrder.qty / ATV_BUYPAY_RATE); // get 3 pay 2
            return payQty * atvOrder.SKU.price;
        };

        this.discountedPrice['ipd'] = (order) => {
            const ipdOrder = order.filter(item => {
                return item.SKU.id === 'ipd'
            })[0];
            let discPrice = ipdOrder.SKU.price
            if (ipdOrder.qty > IPD_QTY_FOR_DISCOUNT) {
                discPrice = IPD_DISCOUNTED_PRICE;
            }
            return ipdOrder.qty * discPrice;
        };

        this.discountedPrice['vga'] = (order) => {
            const vgaOrder = order.filter(item => {
                return item.SKU.id === 'vga'
            })[0];
            const ipdOrder = order.filter(item => {
                return item.SKU.id === 'ipd'
            })[0];
            const ipdorderQty = !!ipdOrder ? ipdOrder.qty : 0;
            let payQty = vgaOrder.qty - ipdorderQty  // get free vga for every ipd
            return payQty * vgaOrder.SKU.price;
        };
        this.discountedPrice['mbp'] = (order) => {
            const mbpOrder = order.filter(item => {
                return item.SKU.id === 'mbp'
            })[0];
            return mbpOrder.qty * mbpOrder.SKU.price;
        };
    }
}
export default DiscountCalculation