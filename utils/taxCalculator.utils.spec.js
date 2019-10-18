import {isSalesTaxApplicable} from './taxCalculator.utils';

describe('taxCalculator', () => {
    it('should identify whether the sales tax is applicable on a given product', () => {
        expect(isSalesTaxApplicable('book')).toEqual(true);
    })
});
