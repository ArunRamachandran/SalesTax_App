import {createProductReceipt, TaxConstructor} from './salesTax';

describe('salesTax', () => {
    let inputSet;

    beforeEach(() => {
        inputSet = ['1 book at 12.49', '1 music CD at 14.99', '1 chocolate bar at 0.85'];
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

        let productList = new TaxConstructor(inputSet);
        expect(productList.products).toEqual(expectedList);
    })

});
