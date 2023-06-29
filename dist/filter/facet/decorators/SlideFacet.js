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
exports.decorateSlideFacet = exports.SELECTOR_FACETED_NAV_SLIDER = exports.ATTR_NAV_SLIDER_RANGE = void 0;
var RangeFacet_1 = require("./RangeFacet");
exports.ATTR_NAV_SLIDER_RANGE = 'data-slider-range';
exports.SELECTOR_FACETED_NAV_SLIDER = "[" + exports.ATTR_NAV_SLIDER_RANGE + "]";
exports.decorateSlideFacet = function (FacetType) {
    return RangeFacet_1.decorateRangeFacet(/** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1(params) {
            var _this = _super.call(this, __assign(__assign({}, params), { options: ['min-max'] })) || this;
            _this.noUiSlider = params.noUiSlider;
            if (!_this.noUiSlider) {
                throw new Error("Missing noUiSlider optional dependency, make sure you do 'yarn add nouislider' and pass it as a param of this constructor");
            }
            _this.drawSlider();
            return _this;
        }
        class_1.prototype.getRange = function () {
            var settings = this.filter.getSettings();
            settings = settings.length ? settings[0] : 'min-max';
            return settings.split('-');
        };
        class_1.prototype.getPrint = function () {
            var range = this.getRange();
            return "<div class=\"c-collection-faceted-nav__price-group\">\n        <div " + exports.ATTR_NAV_SLIDER_RANGE + "></div>\n          <form>\n            <input type=\"hidden\" name=\"min-value\" value=\"\">\n            <input type=\"hidden\" name=\"max-value\" value=\"\">\n          </form>\n\n          <div class=\"noUi-results\">\n            " + this.formatRange(range[0], range[1]) + "\n          </div>\n      </div>";
        };
        class_1.prototype.getRangeMin = function () {
            return this.filter.getRangeMin ? this.filter.getRangeMin() : 0;
        };
        class_1.prototype.getRangeMax = function () {
            return this.filter.getRangeMin ? this.filter.getRangeMax() : 100;
        };
        class_1.prototype.print = function () {
            _super.prototype.print.call(this);
            this.drawSlider();
        };
        class_1.prototype.drawSlider = function () {
            var _this = this;
            var el = this.container.find(exports.SELECTOR_FACETED_NAV_SLIDER);
            if (!el.length)
                return;
            if (typeof this.rangeSlider !== typeof undefined)
                this.rangeSlider.destroy();
            var _a = this.getRange(), min = _a[0], max = _a[1];
            if (!min || min == 'min')
                min = 0;
            if (!max || max == 'max')
                max = 0;
            var rangeMin = this.getRangeMin();
            var rangeMax = this.getRangeMax();
            this.rangeElement = el[0];
            this.rangeSlider = this.noUiSlider.create(this.rangeElement, {
                start: [
                    min ? min : rangeMin,
                    max ? max : rangeMax
                ],
                step: 1,
                range: {
                    'min': [rangeMin],
                    'max': [rangeMax]
                },
                connect: true
            });
            this.rangeElement.noUiSlider.on('change', function (e) { return _this.onSliderUpdate(e); });
        };
        class_1.prototype.onSliderUpdate = function (e) {
            var min = e[0], max = e[1];
            min = parseFloat(min);
            max = parseFloat(max);
            var rangeMin = this.getRangeMin();
            var rangeMax = this.getRangeMax();
            //If within 5% of edge then snap
            if (isNaN(min) || !min || ((min - rangeMin) / (rangeMax - rangeMin)) < 0.05)
                min = 'min';
            if (isNaN(max) || !max || (rangeMax - max) / rangeMax < 0.05)
                max = 'max';
            this.setOptions([min + "-" + max]);
        };
        class_1.prototype.onProductsDrawn = function () {
            _super.prototype.onProductsDrawn.call(this);
            this.print();
        };
        return class_1;
    }(FacetType)));
};
//# sourceMappingURL=SlideFacet.js.map