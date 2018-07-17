
const generiDiscount = (order) =>{
    const genOrder = order[0];
    return genOrder.qty * genOrder.SKU.price;
}
class GenericDiscountCalculation {
   constructor() {
       this.discountedPrice = {};
        this.discountedPrice['atv'] = generiDiscount;
        this.discountedPrice['ipd'] = generiDiscount;
        this.discountedPrice['mbp'] = generiDiscount;
        this.discountedPrice['vga'] = generiDiscount;
   }
}

export default GenericDiscountCalculation

