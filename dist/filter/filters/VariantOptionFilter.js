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
exports.VariantOptionFilter = exports.VO_MODE_VARIANT = exports.VO_MODE_PRODUCT = void 0;
var OperativeFilter_1 = require("./OperativeFilter");
exports.VO_MODE_PRODUCT = 'check-product';
exports.VO_MODE_VARIANT = 'check-variant';
var VariantOptionFilter = /** @class */ (function (_super) {
    __extends(VariantOptionFilter, _super);
    function VariantOptionFilter(template, handle, operation, optionNames, defaultMode) {
        var _this = _super.call(this, template, handle, operation) || this;
        _this.optionNames = optionNames || [];
        _this.mode = defaultMode || exports.VO_MODE_PRODUCT;
        _this.options = [];
        _this.shouldCheckVariant = function (p, v) { return true; };
        return _this;
    }
    VariantOptionFilter.prototype.getSetting = function (name) {
        if (!name)
            return this.options;
        return this.options.indexOf(name.toLowerCase()) !== -1;
    };
    VariantOptionFilter.prototype.getSettings = function () {
        return this.options;
    };
    VariantOptionFilter.prototype.getOptionValue = function (opt) {
        if (!opt)
            return null;
        return opt.toLowerCase();
    };
    VariantOptionFilter.prototype.setSetting = function (option, value) {
        if (value)
            return this.addOption(option);
        this.removeOption(option);
    };
    VariantOptionFilter.prototype.setSettings = function (options) {
        var _this = this;
        if (!Array.isArray(options))
            options = [options];
        this.options = options.filter(function (f) { return f; }).map(function (o) { return ("" + (o || '')).toLowerCase(); });
        this.options = this.options.filter(function (o, i) { return _this.options.indexOf(o) === i; });
        this.filters.onFilterUpdate();
    };
    VariantOptionFilter.prototype.setMode = function (mode) {
        this.mode = mode;
        this.filters.onFilterUpdate();
    };
    VariantOptionFilter.prototype.addOption = function (o) {
        o = o.toLowerCase();
        if (this.getSetting(o))
            return;
        this.options.push(o.toLowerCase());
        this.filters.onFilterUpdate();
    };
    VariantOptionFilter.prototype.removeOption = function (o) {
        o = o.toLowerCase();
        var index = this.options.indexOf(o);
        if (index === -1)
            return;
        this.options.splice(index, 1);
        this.filters.onFilterUpdate();
    };
    VariantOptionFilter.prototype.filterAnd = function (p, v) {
        if (!this.options.length)
            return true;
        var oi = this.template.getOptionIndex(p, this.optionNames);
        if (oi === -1)
            return false;
        if (this.mode == exports.VO_MODE_VARIANT)
            return this.filterAndVariant(p, v, oi);
        return this.filterAndProduct(p, v, oi);
    };
    VariantOptionFilter.prototype.filterOr = function (p, v) {
        if (!this.options.length)
            return true;
        var ci = this.template.getOptionIndex(p, this.optionNames);
        if (ci === -1)
            return false;
        if (this.mode == exports.VO_MODE_VARIANT)
            return this.filterOrVariant(p, v, ci);
        return this.filterOrProduct(p, v, ci);
    };
    VariantOptionFilter.prototype.filterAndProduct = function (p, v, ci) {
        var _this = this;
        return this.options.every(function (c) {
            var swatch = _this.getOptionValue(c);
            return p.variants.some(function (v) {
                if (!_this.shouldCheckVariant(p, v))
                    return false;
                return _this.getOptionValue(v.options[ci]) === swatch;
            });
        });
    };
    VariantOptionFilter.prototype.filterAndVariant = function (p, v, ci) {
        var _this = this;
        return this.options.every(function (c) {
            var swatch = _this.getOptionValue(c);
            return p.variants.every(function (v) {
                if (!_this.shouldCheckVariant(p, v))
                    return false;
                return _this.getOptionValue(v.options[ci]) === swatch;
            });
        });
    };
    VariantOptionFilter.prototype.filterOrProduct = function (p, v, ci) {
        var _this = this;
        return this.options.some(function (c) {
            var swatch = _this.getOptionValue(c);
            return p.variants.some(function (v) {
                if (!_this.shouldCheckVariant(p, v))
                    return false;
                return _this.getOptionValue(v.options[ci]) === swatch;
            });
        });
    };
    VariantOptionFilter.prototype.filterOrVariant = function (p, v, ci) {
        var _this = this;
        if (!this.shouldCheckVariant(p, v))
            return false;
        return this.options.some(function (c) {
            var swatch = _this.getOptionValue(c);
            return _this.getOptionValue(v.options[ci]) === swatch;
        });
    };
    return VariantOptionFilter;
}(OperativeFilter_1.OperativeFilter));
exports.VariantOptionFilter = VariantOptionFilter;
//# sourceMappingURL=VariantOptionFilter.js.map