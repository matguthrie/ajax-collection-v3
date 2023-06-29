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
exports.DiscountFacet = void 0;
var Facet_1 = require("./../Facet");
var DiscountFacet = /** @class */ (function (_super) {
    __extends(DiscountFacet, _super);
    function DiscountFacet(params) {
        return _super.call(this, params) || this;
    }
    DiscountFacet.prototype.formatMin = function (min) {
        if (min != 'min')
            min = min + "%";
        return min;
    };
    DiscountFacet.prototype.formatMax = function (max) {
        if (max != 'max')
            max = max + "%";
        return max;
    };
    DiscountFacet.prototype.formatRange = function (min, max) {
        if (min == 'min' && max == 'max')
            return _super.prototype.formatRange.call(this, min, max);
        if (min == 'min')
            return "Up to " + this.formatMin(max) + " off";
        if (max == 'max')
            return "From " + this.formatMax(min) + " off";
        return _super.prototype.formatRange ? _super.prototype.formatRange.call(this, min, max) : this.formatMin(min) + " - " + this.formatMax(max);
    };
    return DiscountFacet;
}(Facet_1.Facet));
exports.DiscountFacet = DiscountFacet;
//# sourceMappingURL=DiscountFacet.js.map