"use strict";
exports.__esModule = true;
exports.AllAvailableNonSaleColors = exports.AllAvailableSaleColors = exports.AllNonSaleColors = exports.AllSaleColors = exports.AllAvailableColorsOnly = exports.AllAvailableColors = exports.AllColors = void 0;
var Constants_1 = require("./../../constant/Constants");
var First_1 = require("./First");
exports.AllColors = function (product, template, selectVariant, fallback) {
    var colorIndex = template.getOptionIndex(product, Constants_1.COLOR_OPTIONS);
    if (colorIndex === -1)
        return (fallback || First_1.FirstAvailableVariant)(product, template);
    var doneColors = [];
    return product.variants.filter(function (v) {
        var color = v.options[colorIndex];
        if (doneColors.indexOf(color) !== -1)
            return false;
        if (selectVariant && !selectVariant(v))
            return false;
        doneColors.push(color);
        return true;
    });
};
exports.AllAvailableColors = function (product, template) {
    return exports.AllColors(product, template, function (v) { return template.isVariantAvailable(v); });
};
exports.AllAvailableColorsOnly = function (product, template) {
    return exports.AllColors(product, template, function (v) { return template.isVariantAvailable(v); }, First_1.FirstAvailableVariantOnly);
};
exports.AllSaleColors = function (product, template) {
    return exports.AllColors(product, template, function (v) { return template.isVariantOnSale(v); });
};
exports.AllNonSaleColors = function (product, template) {
    return exports.AllColors(product, template, function (v) { return !template.isVariantOnSale(v); });
};
exports.AllAvailableSaleColors = function (product, template) {
    return exports.AllColors(product, template, function (v) { return template.isVariantAvailable(v) && template.isVariantOnSale(v); });
};
exports.AllAvailableNonSaleColors = function (product, template) {
    return exports.AllColors(product, template, function (v) { return template.isVariantAvailable(v) && !template.isVariantOnSale(v); });
};
//# sourceMappingURL=Color.js.map