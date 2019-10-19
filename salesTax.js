import {
    isSalesTaxApplicable,
    isImportDutyApplicable,
    addSalesTax,
    addImportDuty
} from './utils/taxCalculator.utils';
import {roundingRule} from './utils/roundingRule.utils';
 
let TaxConstructor = function (pList) {
    this.products = this.abstractProducts(pList);
    //this.classifiedProducts = this.getClassifiedProductsList(this.products);
    this.total = this.calculateBillAmount(this.products);
    //this.salesTax = this.calculateSalesTax(this.products, this.total);
    //this.printReceipt = this.createReceipt(this.products, this.total, this.salesTax);
}

TaxConstructor.prototype.abstractProducts = (pList) => {
    let productDetails = [];
    pList && pList.forEach((item, i) => {
        let prodObj = {}, 
            productView,
            initialProdList = item.split(" ");
        
        productView = [...initialProdList];
        productView.splice(productView.length - 2, 1); // extracting unwanted contents from the list
        
        prodObj.qty = parseFloat(productView[0]);
        prodObj.product = productView.splice(1, productView.length - 2).join(" ");
        prodObj.price = parseFloat(productView[productView.length - 1]);
        prodObj.basicSalesTax = isSalesTaxApplicable(prodObj.product) ? addSalesTax(prodObj.price, prodObj.qty) : 0; /* tax computing logic based on qty */
        prodObj.importDuty = isImportDutyApplicable(prodObj.product) ? addImportDuty(prodObj.price, prodObj.qty): 0; /* tax computation logic based on qty */

        productDetails.push(prodObj)
    })

    return productDetails;
}

TaxConstructor.prototype.calculateBillAmount = (pList) => {
    let total = 0;
    pList && pList.forEach((product) => {
        let individualPricing = (product.price * product.qty) + product.basicSalesTax + product.importDuty;
        total += individualPricing;
    });

    return parseFloat(roundingRule(total));
}

const createProductReceipt = (productList) => {
    //let purchaseReceipt = new TaxConstructor(productList);
    return [];
}

export {
    TaxConstructor,
    createProductReceipt
}