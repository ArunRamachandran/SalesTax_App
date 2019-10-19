import {
    isSalesTaxApplicable,
    isImportDutyApplicable,
    addSalesTax,
    addImportDuty
} from './utils/taxCalculator.utils';
import {roundingRule} from './utils/roundingRule.utils';
 
let TaxConstructor = function (pList) {
    this.products = this.abstractProducts(pList);
    this.combinedPricing = this.calculateBillAmount(this.products);
    this.totalAmount = parseFloat(this.combinedPricing.totalAmount.toFixed(2)); /* rounding rule isn't applicable for total pricing */
    this.totalSalesTax = parseFloat(roundingRule(this.combinedPricing.totalSalesTax));
    this.getReceipt = this.createReceipt(this.products, this.totalAmount, this.totalSalesTax);
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
    let totalAmount, totalSalesTax;
    totalAmount = totalSalesTax = 0;

    pList && pList.forEach((product) => {
        let productTotal = (product.price * product.qty) + product.basicSalesTax + product.importDuty;
        let productTax = product.basicSalesTax + product.importDuty;

        totalAmount += productTotal;
        totalSalesTax += productTax;
    });

    return {
        totalAmount,
        totalSalesTax
    }
}

TaxConstructor.prototype.createReceipt = (pList, totalAmount, totalSalesTax) => {
    let receipt = {};

    receipt.items = [];
    receipt.salesTaxes = totalSalesTax;
    receipt.total = totalAmount;

    pList && pList.length && pList.forEach((product) => {
        receipt.items.push({
            qty: product.qty,
            product: product.product,
            price: product.price
        });
    })

    return receipt;
}

const createProductReceipt = (productList) => {
    //let purchaseReceipt = new TaxConstructor(productList);
    return [];
}

export {
    TaxConstructor,
    createProductReceipt
}