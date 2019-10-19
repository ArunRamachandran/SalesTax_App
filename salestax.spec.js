import {createProductReceipt, TaxConstructor} from './salesTax';
import {roundingRule} from './utils/roundingRule.utils';

describe('salesTax', () => {
    let inputSet, productList;

    beforeEach(() => {
        inputSet = ['1 book at 12.49', '1 music CD at 14.99', '1 chocolate bar at 0.85'];
        productList = new TaxConstructor(inputSet);
    })
    it('should execute custom fn', () => {
        expect(createProductReceipt(inputSet)).toEqual([]);
    })

    it('should read the input & return the list of products', () => {
        let expectedList = [
            {
                product: 'book',
                qty: 1,
                price: 12.49,
                basicSalesTax: 0,
                importDuty: 0
            },
            {
                product: 'music CD',
                qty: 1,
                price: 14.99,
                basicSalesTax: 1.50,
                importDuty: 0
            },
            {
                product: 'chocolate bar',
                qty: 1,
                price: 0.85,
                basicSalesTax: 0,
                importDuty: 0
            }
        ];

        expect(productList.products).toEqual(expectedList);
    })

    it('should calculate the total bill amount by adding individual price + total taxes', () => {
        let expectedTotalamount = (12.49 * 1) + (14.99 * 1 + 1.50) + (0.85 * 1);
        expect(productList.totalAmount).toEqual(parseFloat(roundingRule(expectedTotalamount)));
    })

    it('should calculate the total salesTax of the given product list', () => {
        let expectedSalesTax = 0 + 1.50 + 0; 
        expect(productList.totalSalesTax).toEqual(expectedSalesTax);
    })

});
