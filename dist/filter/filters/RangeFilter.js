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
exports.RangeFilter = void 0;
var Filter_1 = require("./Filter");
var RangeFilter = /** @class */ (function (_super) {
    __extends(RangeFilter, _super);
    function RangeFilter(template, handle) {
        var _this = _super.call(this, template, handle) || this;
        _this.ranges = []; //"10-20", "20-30", "50-max", etc.
        return _this;
    }
    RangeFilter.prototype.getSettings = function () {
        if (this.ranges.length < 2 && this.ranges[0] == 'min-max')
            return [];
        return this.ranges;
    };
    RangeFilter.prototype.getSetting = function (key) {
        return this.ranges.some(function (r) { return r == key; });
    };
    RangeFilter.prototype.getRangeMin = function () {
        this.updateMinMax();
        return this.rangeMin;
    };
    RangeFilter.prototype.getRangeMax = function () {
        this.updateMinMax();
        return this.rangeMax;
    };
    RangeFilter.prototype.getValue = function (p, v) {
        //Super this to return the numeric data point for the range.
        //In future I may do some function to handle the min and max calculations.
        return 0;
    };
    RangeFilter.prototype.setSettings = function (settings) {
        settings = this.formatSettings(settings);
        this.ranges = settings;
        this.filters.onFilterUpdate();
    };
    RangeFilter.prototype.setSetting = function (key, value) {
        var i = this.ranges.indexOf(key);
        if ((value && i !== -1) || (!value && i === -1))
            return;
        if (value) {
            this.ranges.push(key);
        }
        else {
            this.ranges.splice(i, 1);
        }
        this.ranges = this.formatSettings(this.ranges);
        this.filters.onFilterUpdate();
    };
    RangeFilter.prototype.filter = function (p, v) {
        if (!this.ranges.length)
            return true;
        var value = this.getValue(p, v);
        return this.ranges.some(function (r) {
            var _a = r.split('-').map(function (e) {
                if (e == 'min' || e == 'max')
                    return e;
                return parseInt(e);
            }), min = _a[0], max = _a[1];
            if (min != 'min' && value < min)
                return false;
            if (max != 'max' && value > max)
                return false;
            return true;
        });
    };
    RangeFilter.prototype.formatSettings = function (s) {
        //Cleansing.
        if (!s)
            s = [];
        if (!Array.isArray(s))
            s = [s];
        return s.filter(function (b) {
            if (typeof b !== 'string')
                return false;
            b = b.split('-');
            return b.length === 2;
        });
    };
    RangeFilter.prototype.updateMinMax = function () {
        var _this = this;
        var rangeMin = Number.MAX_VALUE;
        var rangeMax = 0;
        this.template.data.variants.forEach(function (v) {
            var value = _this.getValue(v.product, v);
            if (!_this.template.data.isProductInCollection(v.product))
                return;
            rangeMin = Math.min(rangeMin, value);
            rangeMax = Math.max(rangeMax, value);
        }, 0);
        this.rangeMin = rangeMin;
        this.rangeMax = rangeMax;
    };
    return RangeFilter;
}(Filter_1.Filter));
exports.RangeFilter = RangeFilter;
//# sourceMappingURL=RangeFilter.js.map