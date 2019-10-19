import {salesTax, importDuty, salesTaxExceptionsList} from '../constants/taxConstraints';
import {roundingRule} from './roundingRule.utils';

const isSalesTaxApplicable = (pList) => {
    let intersection,
        product = pList.split(" "); 
    
    intersection = product.filter(value => salesTaxExceptionsList.includes(value));
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