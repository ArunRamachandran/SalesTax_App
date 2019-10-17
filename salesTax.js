
let TaxConstructor = function (pList) {
    this.products = this.abstractProducts(pList);
    //this.classifiedProducts = this.getClassifiedProductsList(this.products);
    this.total = this.calculateBillAmount(this.products);
    this.salesTax = this.calculateSalesTax(this.products, this.total);
}

TaxConstructor.prototype.abstractProducts = (pList) => {
    return [];
}

export const readProductsList = (productList) => {
    return [];
}