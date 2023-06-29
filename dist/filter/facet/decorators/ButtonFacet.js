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
exports.decorateButtonFacet = void 0;
var $ = require("jquery");
exports.decorateButtonFacet = function (FacetType) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1(params) {
            var _this = _super.call(this, params) || this;
            _this.container.on('click', '[data-button-facet]', function (e) { return _this.onButtonClick(e); });
            return _this;
        }
        class_1.prototype.getPrint = function (e) {
            var _this = this;
            var options = this.getOptionsToDraw();
            return options.reduce(function (x, option) {
                var isSelected = _this.isSelected(option);
                return x += "\n          <button\n            type=\"button\" class=\"o-btn is-large " + (isSelected ? 'is-active' : '') + "\"\n            data-button-facet data-option=\"" + option + "\"\n          >\n            " + _this.getOptionName(option) + "\n          </button>\n        ";
            }, '');
            return x;
        };
        class_1.prototype.onButtonClick = function (e) {
            e.preventDefault();
            e.stopPropagation();
            var self = $(e.currentTarget);
            var option = self.attr('data-option');
            this.setOption(option, !this.filter.getSetting(option));
        };
        return class_1;
    }(FacetType));
};
//# sourceMappingURL=ButtonFacet.js.map