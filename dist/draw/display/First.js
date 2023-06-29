"use strict";
exports.__esModule = true;
exports.FirstAvailableSaleVariant = exports.FirstSaleVariant = exports.FirstAvailableVariantOnly = exports.FirstAvailableVariant = exports.FirstVariant = void 0;
//Returns the first variant in the product, regardless of anything
exports.FirstVariant = function (product, template) {
    return [product.variants[0]];
};
//Returns the first available variant (if any), otherwise the first variant.
exports.FirstAvailableVariant = function (product, template) {
    var v = product.variants.find(function (v) { return template.isVariantAvailable(v); }) || product.variants[0];
    return [v];
};
//Returns the first available variant if any variant is in stock.
exports.FirstAvailableVariantOnly = function (product, template) {
    var v = product.variants.find(function (v) { return template.isVariantAvailable(v); });
    return v ? [v] : [];
};
//Returns the first variant on sale
exports.FirstSaleVariant = function (product, template) {
    return [product.variants.find(function (v) { return template.isVariantOnSale(v); })];
};
//First available sale variant, otherwise first sale variant.
exports.FirstAvailableSaleVariant = function (product, t) {
    var v = product.variants.find(function (v) {
        return t.isVariantOnSale(v) && t.isVariantAvailable(v);
    });
    return v ? [v] : exports.FirstSaleVariant(product, t);
};
//# sourceMappingURL=First.js.map