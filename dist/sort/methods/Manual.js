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
exports.BestSelling = exports.ManualSort = exports.ManualSortVariants = void 0;
var SortMethod_1 = require("./SortMethod");
exports.ManualSortVariants = function (_a) {
    var template = _a.template, method = _a.method, l = _a.l, r = _a.r;
    if (l.product.id === r.product.id) {
        var indexL = SortMethod_1.getVariantPosition(l);
        var indexR = SortMethod_1.getVariantPosition(r);
        return indexL - indexR;
    }
    var posL = SortMethod_1.getCollectionPosition(template, l);
    var posR = SortMethod_1.getCollectionPosition(template, r);
    var side = posL > posR ? 1 : posL === posR ? 0 : -1;
    return method.reverse ? -side : side;
};
//Manual
exports.ManualSort = __assign(__assign({}, SortMethod_1.SortMethod), { handle: 'manual', name: 'Featured', isVisible: function (template) { return template.sort.getDefaultSortMethod() === 'manual'; }, sort: function (template, variants, method) {
        return variants.sort(function (l, r) { return exports.ManualSortVariants({
            template: template, l: l, r: r, method: method
        }); });
    } });
//Best Selling (Same as featured)
exports.BestSelling = __assign(__assign({}, exports.ManualSort), { handle: 'best-selling', name: 'Featured', isVisible: function (template) { return template.sort.getDefaultSortMethod() === 'best-selling'; } });
//# sourceMappingURL=Manual.js.map