"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.PriceDescending = exports.PriceAscending = void 0;
var Manual_1 = require("./Manual");
var SortMethod_1 = require("./SortMethod");
exports.PriceAscending = __assign(__assign({}, SortMethod_1.SortMethod), { handle: "price-ascending", name: "Price, Low to High", sort: function (template, variantData, method) {
        return variantData.sort(function (l, r) {
            if (l.price > r.price)
                return 1;
            if (l.price < r.price)
                return -1;
            return Manual_1.ManualSortVariants({ template: template, method: method, l: l, r: r });
        });
    } });
exports.PriceDescending = __assign(__assign({}, exports.PriceAscending), { handle: 'price-descending', name: 'Price, High to Low', reverse: true });
//# sourceMappingURL=Price.js.map