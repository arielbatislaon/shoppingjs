import { assert } from 'chai';
import GenericDiscountCalculation from '../components/default-discount-calculation'
import DiscountCalculation from '../components/discount-calculation'
import { checkout, Checkout } from '../components/checkout' 

describe('Test Total', () =>{
    it('returns correct total for default calculation rule', () => {
        const calc = new GenericDiscountCalculation();
        const chk = new Checkout(calc);
        chk.scan('atv');
        chk.scan('atv');
        chk.scan('atv');
        chk.scan('vga');
        assert.equal(chk.total(), 657);
    });
    it('returns correct total for specific calculation rule', () => {
        const calc = new DiscountCalculation();
        const chk = new Checkout(calc);
        chk.scan('atv');
        chk.scan('atv');
        chk.scan('atv');
        chk.scan('vga');
        assert.equal(chk.total(), 249);
        chk.clear();
        chk.scan('atv');
        chk.scan('ipd');
        chk.scan('ipd');
        chk.scan('atv');
        chk.scan('ipd');
        chk.scan('ipd');
        chk.scan('ipd');
        assert.equal(chk.total(), 2718.95);
        chk.clear();
        chk.scan('mbp');
        chk.scan('vga');
        chk.scan('ipd');
        assert.equal(chk.total(), 1949.98);

    });
}) 