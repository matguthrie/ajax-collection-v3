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
exports.VariantOptionFacet = void 0;
var __1 = require("./../");
var VariantOptionFacet = /** @class */ (function (_super) {
    __extends(VariantOptionFacet, _super);
    function VariantOptionFacet(params) {
        var _this = _super.call(this, params) || this;
        _this.optionNames = params.optionNames || [];
        return _this;
    }
    VariantOptionFacet.prototype.getOptionValue = function (opt) {
        if (!opt)
            return null;
        return opt.toLowerCase();
    };
    VariantOptionFacet.prototype.getOptions = function () {
        //This function can be used to determine what to show and what to hide.
        var allOptions = _super.prototype.getOptions.call(this);
        //Fetch from the products in the collection
        var allCurrentOptions = [];
        var allOptions = [];
        //Foreach variant
        for (var i = 0; i < this.template.data.variants.length; i++) {
            var v = this.template.data.variants[i];
            var p = v.product;
            //Skip Product Rules
            if (!this.template.data.isProductInCollection(p))
                continue; //Not in coll
            //DisplayMode
            var dm = this.template.draw.displayMode;
            if (typeof dm === 'function')
                dm = dm.name;
            if (dm.indexOf('Available') !== -1 && !this.template.isVariantAvailable(v))
                continue;
            //Find color option index
            var optionIndex = this.template.getOptionIndex(p, this.optionNames);
            if (optionIndex === -1)
                continue;
            var option = this.getOptionValue(v.options[optionIndex]);
            if (allOptions.indexOf(option) === -1) {
                allOptions.push(option);
            }
            //We have to use this as our variant v is being lost if we were to use forEach.
            //TODO: Create another array of variants that are in unpaginatedProducts
            //and use that as a lookup.
            // if(this.template.draw.unpaginatedProducts.find(fv => v.id == fv.id)) continue;
            if (allCurrentOptions.indexOf(option) === -1) {
                allCurrentOptions.push(option);
            }
        }
        if (!allOptions.length)
            allOptions = allCurrentOptions;
        var options = [];
        for (var i = 0; i < allOptions.length; i++) {
            var o = allOptions[i];
            options.push(o);
        }
        return options;
    };
    return VariantOptionFacet;
}(__1.Facet));
exports.VariantOptionFacet = VariantOptionFacet;
//# sourceMappingURL=VariantOptionFacet.js.map