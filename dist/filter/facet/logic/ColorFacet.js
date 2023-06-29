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
exports.ColorFacet = void 0;
var VariantOptionFacet_1 = require("./VariantOptionFacet");
var Constants_1 = require("./../../../constant/Constants");
var pc_slate_tools_1 = require("@process-creative/pc-slate-tools");
var ColorFacet = /** @class */ (function (_super) {
    __extends(ColorFacet, _super);
    function ColorFacet(params) {
        return _super.call(this, __assign(__assign({}, params), { optionNames: Constants_1.COLOR_OPTIONS })) || this;
    }
    ColorFacet.prototype.getSwatch = function (opt) {
        if (!opt)
            return null;
        if (!this.filter.getSwatchByColor)
            return null;
        return this.filter.getSwatchByColor(opt);
    };
    ColorFacet.prototype.getOptionValue = function (opt) {
        if (!opt)
            return null;
        var swatch = this.getSwatch(opt);
        if (swatch && swatch.name)
            return pc_slate_tools_1.handlize(opt.name);
        return pc_slate_tools_1.handlize(opt);
    };
    ColorFacet.prototype.getOptionName = function (opt) {
        if (!opt)
            return null;
        var swatch = this.getSwatch(opt);
        if (swatch && swatch.name)
            return this.template.escape(swatch.name);
        return _super.prototype.getOptionName.call(this, opt);
    };
    return ColorFacet;
}(VariantOptionFacet_1.VariantOptionFacet));
exports.ColorFacet = ColorFacet;
//# sourceMappingURL=ColorFacet.js.map