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
exports.ColorFilter = void 0;
var VariantOptionFilter_1 = require("./VariantOptionFilter");
var Constants_1 = require("./../../constant/Constants");
var pc_slate_tools_1 = require("@process-creative/pc-slate-tools");
var ColorFilter = /** @class */ (function (_super) {
    __extends(ColorFilter, _super);
    function ColorFilter(template, handle, operation, defaultMode) {
        var _this = _super.call(this, template, handle, operation, Constants_1.COLOR_OPTIONS, defaultMode) || this;
        if (!Swatches)
            throw new Error("Cannot find Swatches, make sure this is setup.");
        return _this;
    }
    ColorFilter.prototype.getSwatchByColor = function (color) {
        if (!color)
            return null;
        var colorHandle = pc_slate_tools_1.handlize(color);
        return Swatches.find(function (s) {
            if (s.name && pc_slate_tools_1.handlize(s.name) == colorHandle)
                return true;
            return (s.handles || []).find(function (h) { return h && h == colorHandle; });
        });
    };
    ColorFilter.prototype.getOptionValue = function (opt) {
        return this.getSwatchByColor(opt) || opt;
    };
    return ColorFilter;
}(VariantOptionFilter_1.VariantOptionFilter));
exports.ColorFilter = ColorFilter;
//# sourceMappingURL=ColorFilter.js.map