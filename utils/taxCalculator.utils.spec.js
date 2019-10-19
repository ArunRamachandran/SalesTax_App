import {
    isSalesTaxApplicable, 
    isImportDutyApplicable, 
    addSalesTax, 
    addImportDuty
} from './taxCalculator.utils';

describe('taxCalculator', () => {
    it('should identify whether the sales tax is applicable on a given product', () => {
        expect(isSalesTaxApplicable('book')).toEqual(false);
        expect(isSalesTaxApplicable('chocolate bar')).toEqual(false);
        expect(isSalesTaxApplicable('music CD')).toEqual(true);
        expect(isSalesTaxApplicable('imported bottle of perfume')).toEqual(true);
        expect(isSalesTaxApplicable('packet of headache pills')).toEqual(false);
    })

    it('should identify importDuty applicable product', () => {
        expect(isImportDutyApplicable('book')).toEqual(false);
        expect(isImportDutyApplicable('packet of headache pills')).toEqual(false);
        expect(isImportDutyApplicable('imported bottle of perfume')).toEqual(true);
        expect(isImportDutyApplicable('1 imported bottle of perfume')).toEqual(true);
    })

    it('should add 10% salesTax to a given product', () => {
        expect(addSalesTax(14.99, 1)).toEqual(1.50);
        expect(addSalesTax(10, 1)).toEqual(1);
    })

    it('should add 5% importDuty to a given product', () => {
        expect(addImportDuty(14.99, 1)).toEqual(0.75);
        expect(addImportDuty(10, 1)).toEqual(0.5);
    })
});
