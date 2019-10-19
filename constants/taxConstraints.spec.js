import {salesTax, importDuty, salesTaxExceptionsList} from './taxConstraints';

describe('taxConstrains', () => {
    it ('should identify the expected values of salesTax & importDuty', () => {
        expect(salesTax).toEqual(0.10);
        expect(importDuty).toEqual(0.05);
    });

    it('should return expected salesTax exemptions list', () => {
        let expectedTaxExemptionsList = ['book', 'chocolate', 'pills'];
        expect(salesTaxExceptionsList).toEqual(expectedTaxExemptionsList);
    })
});
