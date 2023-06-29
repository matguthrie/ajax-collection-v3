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
exports.TitleDescending = exports.TitleAscending = void 0;
var SortMethod_1 = require("./SortMethod");
exports.TitleAscending = __assign(__assign({}, SortMethod_1.SortMethod), { handle: 'title-ascending', name: 'A-z', sort: function (collection, variants) {
        return variants.sort(function (l, r) {
            if (l.product.id === r.product.id) {
                var indexL = SortMethod_1.getVariantPosition(l);
                var indexR = SortMethod_1.getVariantPosition(r);
                return indexL - indexR;
            }
            return l.product.title.localeCompare(r.product.title);
        });
    } });
exports.TitleDescending = __assign(__assign({}, exports.TitleAscending), { reverse: true, handle: 'title-descending', name: 'Z-a' });
//# sourceMappingURL=Title.js.map