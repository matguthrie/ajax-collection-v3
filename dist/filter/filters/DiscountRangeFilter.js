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
exports.DiscountRangeFilter = void 0;
var RangeFilter_1 = require("./RangeFilter");
var DiscountRangeFilter = /** @class */ (function (_super) {
    __extends(DiscountRangeFilter, _super);
    function DiscountRangeFilter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DiscountRangeFilter.prototype.getValue = function (p, v) {
        var ca = v.compare_at_price;
        if (!ca || ca < v.price)
            ca = v.price;
        return ((ca - v.price) / ca) * 100;
    };
    return DiscountRangeFilter;
}(RangeFilter_1.RangeFilter));
exports.DiscountRangeFilter = DiscountRangeFilter;
//# sourceMappingURL=DiscountRangeFilter.js.map