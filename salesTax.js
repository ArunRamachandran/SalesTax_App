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
    this.receipt = this.createReceipt(this.products, this.totalAmount, this.totalSalesTax);
}

TaxConstructor.prototype.abstractProducts = (pList) => {
    let productDetails = pList.map((item, i) => {
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

        return prodObj;
    })

    return productDetails;
}

TaxConstructor.prototype.calculateBillAmount = (pList) => {
    let totalAmount, totalSalesTax;
    totalAmount = totalSalesTax = 0;

    pList && pList.map((product) => {
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

    receipt.items =  pList.map((product) => {
        return {
            qty: product.qty,
            product: product.product,
            price: parseFloat((product.price + product.basicSalesTax + product.importDuty).toFixed(2))
        };
    });

    return receipt;
}

const createShoppingCart = (productList) => {
    let purchaseReceipt, productObj = new TaxConstructor(productList);

    purchaseReceipt = productObj.receipt;

    if (purchaseReceipt) {
        purchaseReceipt.items && purchaseReceipt.items.length &&
            purchaseReceipt.items.forEach((item) => {
                console.log(`${item.qty} ${item.product} : ${item.price}`);
            })
        console.log('Sales Taxes: ', purchaseReceipt.salesTaxes);
        console.log('Total: ', purchaseReceipt.total);
        console.log("\n");
    } else {
        console.log("Sorry. Couldn't create the purchase receipt.\n Try again ");
    }

    return productObj;
}

const inputSet1 = ['1 book at 12.49', '1 music CD at 14.99', '1 chocolate bar at 0.85'];
const inputSet2 = ['1 imported box of chocolates at 10.00', '1 imported bottle of perfume at 47.50'];
const inputSet3 = ['1 imported bottle of perfume at 27.99', '1 bottle of perfume at 18.99', '1 packet of headache pills at 9.75', '1 box of imported chocolates at 11.25'];

createShoppingCart(inputSet1);
createShoppingCart(inputSet2);
createShoppingCart(inputSet3);

export {
    TaxConstructor,
    createShoppingCart
}