
let TaxConstructor = function (pList) {
    this.products = this.abstractProducts(pList);
    //this.classifiedProducts = this.getClassifiedProductsList(this.products);
    //this.total = this.calculateBillAmount(this.products);
    //this.salesTax = this.calculateSalesTax(this.products, this.total);
}

TaxConstructor.prototype.abstractProducts = (pList) => {
    let productDetails = [];
    pList && pList.forEach((item, i) => {
        let prodObj = {}, 
            productView = item.split('  ');
        productView.splice(productView.length, 1); // extracting unwanted contents from the list

        prodObj.qty = productView[0];
        prodObj.product = productView[1];
        prodObj.price = productView[2];
    })

    return [];
}

const createProductReceipt = (productList) => {
    //let purchaseReceipt = new TaxConstructor(productList);
    return [];
}

export {
    TaxConstructor,
    createProductReceipt
}