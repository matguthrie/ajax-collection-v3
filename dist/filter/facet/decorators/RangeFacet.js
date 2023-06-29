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
exports.decorateRangeFacet = void 0;
exports.decorateRangeFacet = function (FacetType) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_1.prototype.getOptionName = function (o) {
            var split = o.split('-');
            return this.formatRange(split[0], split[1]);
        };
        class_1.prototype.formatMin = function (v) {
            return _super.prototype.formatMin ? _super.prototype.formatMin.call(this, v) : v;
        };
        class_1.prototype.formatMax = function (v) {
            return _super.prototype.formatMax ? _super.prototype.formatMax.call(this, v) : v;
        };
        class_1.prototype.formatRange = function (min, max) {
            return _super.prototype.formatRange ? _super.prototype.formatRange.call(this, min, max) : (this.formatMin(min) + " - " + this.formatMax(max));
        };
        class_1.prototype.getVisibleOptions = function () {
            var options = this.getOptions();
            var rangeMin = this.filter.getRangeMin();
            var rangeMax = this.filter.getRangeMax();
            return options.filter(function (e) {
                var _a = e.split('-'), min = _a[0], max = _a[1];
                if (max != 'max' && max < rangeMin)
                    return false;
                if (min != 'min' && min > rangeMax)
                    return false;
                return true;
            });
        };
        return class_1;
    }(FacetType));
};
//# sourceMappingURL=RangeFacet.js.map