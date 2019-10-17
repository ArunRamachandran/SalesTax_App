/**
 * 
 * @param {flotValue} value
 * @output roundingOff to nearest 0.05 
 * 
 * ex. roundingRule(2.51) --> 2.55
 *     roundingRule(2.50) --> 2.50
 *     roundingRule(2.56) --> 2.60
 */
export const roundingRule = (value) => (Math.ceil(value*20)/20).toFixed(2);

