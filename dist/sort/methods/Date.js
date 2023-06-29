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
exports.CreatedDescending = exports.CreatedAscending = void 0;
var SortMethod_1 = require("./SortMethod");
var pc_slate_tools_1 = require("@process-creative/pc-slate-tools");
var Manual_1 = require("./Manual");
exports.CreatedAscending = __assign(__assign({}, SortMethod_1.SortMethod), { name: 'Date, Oldest First', sort: function (template, variantData, method) {
        return variantData.sort(function (l, r) {
            if (!l.product.published_at || !r.product.published_at) {
                return Manual_1.ManualSortVariants({ template: template, l: l, r: r, method: method });
            }
            if (!l.product.published_at)
                return 1;
            if (!l.published_at_date)
                l.published_at_date = pc_slate_tools_1.liquidToDate(l.product.published_at);
            if (!r.published_at_date)
                r.published_at_date = pc_slate_tools_1.liquidToDate(r.product.published_at);
            return l.published_at_date - r.published_at_date;
        });
    }, handle: 'created-ascending' });
exports.CreatedDescending = __assign(__assign({}, exports.CreatedAscending), { handle: 'created-descending', name: 'Date, Newest First', reverse: true });
//# sourceMappingURL=Date.js.map