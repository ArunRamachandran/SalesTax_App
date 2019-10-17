import {roundingRule} from './roundingRule.utils';

describe('roundingRule.utils', () => {
    it('should round up the values to nearest 0.05', () => {
        expect(parseFloat(roundingRule(2.51))).toEqual(2.55)
        expect(parseFloat(roundingRule(2.50))).toEqual(2.50);
        expect(parseFloat(roundingRule(2.56))).toEqual(2.60);
    })
});
