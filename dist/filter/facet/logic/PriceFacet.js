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
exports.PriceFacet = void 0;
var Facet_1 = require("./../Facet");
var pc_slate_tools_1 = require("@process-creative/pc-slate-tools");
var PriceFacet = /** @class */ (function (_super) {
    __extends(PriceFacet, _super);
    function PriceFacet(params) {
        var _this = _super.call(this, params) || this;
        $(document).on('onCurrencyChange', function (e) { return _this.onPriceCurrencyChange(e); });
        return _this;
    }
    PriceFacet.prototype.getOptionName = function (o) {
        return pc_slate_tools_1.printMoney(o);
    };
    //For range based facets
    PriceFacet.prototype.formatMin = function (min) {
        if (min != 'min')
            min = pc_slate_tools_1.printMoney(min);
        return min;
    };
    PriceFacet.prototype.formatMax = function (max) {
        if (max != 'max')
            max = pc_slate_tools_1.printMoney(max);
        return max;
    };
    PriceFacet.prototype.onPriceCurrencyChange = function (e) {
        this.print();
    };
    return PriceFacet;
}(Facet_1.Facet));
exports.PriceFacet = PriceFacet;
//# sourceMappingURL=PriceFacet.js.map