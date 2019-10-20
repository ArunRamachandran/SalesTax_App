import {salesTax, importDuty, salesTaxExceptionsList} from '../constants/taxConstraints';
import {roundingRule} from './roundingRule.utils';

/**
 * A function to identify whether a product belongs to Sales Tax exemptions 
 * category or not. Which receive a string & validate against the set of 
 * predefined list of Sales Tax exemptions categories.
 * 
 * @param {string} pList 
 * @return {boolean} 
 * 
 */
const isSalesTaxApplicable = (pList) => {
    let intersection,
        product = pList.split(" "); 
    
    intersection = product.filter(value => {
        let isMatchingElement = false;
        salesTaxExceptionsList.map((item) => {
            if (value.includes(item)) isMatchingElement = true;
        });
        return isMatchingElement;
    });

    return !intersection.length ? true : false;
}

const isImportDutyApplicable = (product) => {
    return product.includes('imported');
}

const addSalesTax = (price, qty) => {
    return parseFloat(roundingRule(price * salesTax)) * qty;
}

const addImportDuty = (price, qty) => {
    return parseFloat(roundingRule(price * importDuty)) * qty;
}

export {
    isSalesTaxApplicable,
    isImportDutyApplicable,
    addSalesTax,
    addImportDuty
}