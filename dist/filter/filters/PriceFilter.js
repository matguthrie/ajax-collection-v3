"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.PriceRangeFilter = void 0;
var RangeFilter_1 = require("./RangeFilter");
var PriceRangeFilter = /** @class */ (function (_super) {
    __extends(PriceRangeFilter, _super);
    function PriceRangeFilter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PriceRangeFilter.prototype.getValue = function (p, v) {
        return v.price;
    };
    return PriceRangeFilter;
}(RangeFilter_1.RangeFilter));
exports.PriceRangeFilter = PriceRangeFilter;
//# sourceMappingURL=PriceFilter.js.map