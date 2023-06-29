"use strict";
exports.__esModule = true;
exports.AllAvailableNonSaleVariants = exports.AllAvailableSaleVariants = exports.AllNonSaleVariants = exports.AllSaleVariants = exports.AllAvailableVariants = exports.AllVariants = void 0;
//Returns all the variants for the product
exports.AllVariants = function (product, template) {
    return product.variants;
};
// Returns all variants for the product that are available
exports.AllAvailableVariants = function (product, template) {
    return product.variants.filter(function (variant) { return template.isVariantAvailable(variant); });
};
//Returns all the variants for the product that are on sale
exports.AllSaleVariants = function (product, template) {
    return product.variants.filter(function (variant) { return template.isVariantOnSale(variant); });
};
//Returns all the variants for the product that are not on sale
exports.AllNonSaleVariants = function (product, template) {
    return product.variants.filter(function (variant) { return !template.isVariantOnSale(variant); });
};
//Returns all the variants for the product that are both available and on sale
exports.AllAvailableSaleVariants = function (product, template) {
    return product.variants.filter(function (v) {
        return template.isVariantOnSale(v) && template.isVariantAvailable(v);
    });
};
//Returns all the variants that are both available and NOT on sale
exports.AllAvailableNonSaleVariants = function (product, template) {
    return product.variants.filter(function (v) {
        return !template.isVariantOnSale(v) && template.isVariantAvailable(v);
    });
};
//# sourceMappingURL=All.js.map