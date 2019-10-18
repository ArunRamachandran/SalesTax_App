const isSalesTaxApplicable = (product) => {
    return !['book', 'chocolate', 'pills'].includes(product);
}

export {
    isSalesTaxApplicable
}