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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.TagFacet = void 0;
var __1 = require("./../");
var TagFacet = /** @class */ (function (_super) {
    __extends(TagFacet, _super);
    function TagFacet(params) {
        var _this = _super.call(this, params) || this;
        var restrictByProducts = params.restrictByProducts, restrictByCollection = params.restrictByCollection;
        _this.restrictByProducts = typeof restrictByProducts === typeof undefined ? false : restrictByProducts; //If true, only tags that are in the currently filtered products will show
        _this.restrictByCollection = typeof restrictByCollection === typeof undefined ? true : restrictByCollection; //If true only tags that are in the collection will show
        return _this;
    }
    TagFacet.prototype.getVisibleOptions = function () {
        var _this = this;
        var allOptions = _super.prototype.getVisibleOptions ? _super.prototype.getVisibleOptions.call(this) : null;
        var productTags;
        var collectionTags = __spreadArrays(this.template.data.allTags);
        if (!allOptions || !allOptions.length)
            allOptions = collectionTags;
        if (this.restrictByProducts && this.template.draw.unpaginatedProducts) {
            productTags = this.collection.draw.unpaginatedProducts.reduce(function (tags, v) {
                var p = v.product;
                return __spreadArrays(tags, p.tags);
            }, []);
            //Remove duplicates
            productTags = productTags.filter(function (t, i) { return productTags.indexOf(t) === i; });
        }
        return allOptions.filter(function (tag) {
            //Always show checked filters, so that they may be unchecked
            if (_this.isSelected(tag))
                return true;
            if (_this.restrictByCollection && collectionTags.indexOf(tag) === -1)
                return false;
            if (_this.restrictByProducts && productTags.indexOf(tag) === -1)
                return false;
            return true;
        });
    };
    TagFacet.prototype.getOptions = function () {
        var _this = this;
        //Add all tags for all products
        var options = this.template.data.products.reduce(function (x, product) {
            if (!_this.template.data.isProductInCollection(product))
                return x;
            return x = __spreadArrays(x, product.tags);
        }, []);
        //Remove duplicates
        return options.filter(function (o, i) { return options.indexOf(o) === i; });
    };
    return TagFacet;
}(__1.Facet));
exports.TagFacet = TagFacet;
//# sourceMappingURL=TagFacet.js.map