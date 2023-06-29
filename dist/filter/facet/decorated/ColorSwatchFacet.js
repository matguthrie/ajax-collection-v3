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
exports.ColorSwatchFacet = exports.SWATCH_FILTER = void 0;
var $ = require("jquery");
var ColorFacet_1 = require("../logic/ColorFacet");
var pc_slate_tools_1 = require("@process-creative/pc-slate-tools");
exports.SWATCH_FILTER = '[data-swatch-value]';
var ColorSwatchFacet = /** @class */ (function (_super) {
    __extends(ColorSwatchFacet, _super);
    function ColorSwatchFacet(params) {
        var _this = _super.call(this, params) || this;
        _this.container.on('click', exports.SWATCH_FILTER, function (e) { return _this.onSwatchClick(e); });
        return _this;
    }
    ColorSwatchFacet.prototype.getPrint = function () {
        var _this = this;
        var options = this.getOptionsToDraw();
        var x = "<div class=\"c-collection-faceted-nav__swatch-group o-swatch__container is-color\">";
        options.forEach(function (o) {
            x += _this.getSwatch(o);
        });
        x += "</div>";
        return x;
    };
    ColorSwatchFacet.prototype.getSwatch = function (o) {
        return "\n      <button\n        type=\"button\" data-swatch-value=\"" + pc_slate_tools_1.handlize(o) + "\"\n        class=\"o-swatch " + (this.isSelected(o) ? "is-selected" : "") + "\"\n      >\n        <div class=\"o-swatch__inner o-swatch--color__inner s-swatch--" + pc_slate_tools_1.handlize(o) + "\">\n        </div>\n      </button>\n    ";
    };
    ColorSwatchFacet.prototype.isSelected = function (option) {
        return this.filter.getSetting(option);
    };
    ColorSwatchFacet.prototype.onSwatchClick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        var self = $(e.currentTarget);
        var color = self.attr('data-swatch-value');
        if (self.hasClass('is-selected')) {
            self.removeClass('is-selected');
            this.filter.setSetting(color, false);
        }
        else {
            self.addClass('is-selected');
            this.filter.setSetting(color, true);
        }
    };
    ColorSwatchFacet.prototype.setOptions = function (options) {
        //Simply set the options
        this.options = options;
        this.print();
    };
    return ColorSwatchFacet;
}(ColorFacet_1.ColorFacet));
exports.ColorSwatchFacet = ColorSwatchFacet;
//# sourceMappingURL=ColorSwatchFacet.js.map