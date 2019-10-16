import {readProductsList} from './salesTax';

describe('salesTax', () => {
    let inputSet;

    beforeEach(() => {
        inputSet = ['1 book at 12.49', '1 music CD at 14.99', '1 chocolate bar at 0.85'];
    })
    it('should execute custom fn', () => {
        expect(readProductsList(inputSet)).toBe(true);
    })
});
