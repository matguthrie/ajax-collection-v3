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
exports.decorateSelectFacet = void 0;
var Constants_1 = require("./../../../constant/Constants");
exports.decorateSelectFacet = function (FacetType) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1(params) {
            var _this = _super.call(this, params) || this;
            _this.container.on('change', Constants_1.FACET_SELECT_SELECTOR, function (e) { return _this.onChange(e); });
            return _this;
        }
        class_1.prototype.getPrint = function (e) {
            var _this = this;
            var options = this.getOptionsToDraw();
            return "<select data-facet-select class=\"c-collection-faceted-nav__select\">\n        " + options.reduce(function (x, o) { return (x + "<option value=\"" + o + "\">" + _this.getOptionName(o) + "</option>"); }, '') + "\n      </select>";
        };
        class_1.prototype.onChange = function (e) {
            this.setOptions([$(e.currentTarget).val()]);
        };
        return class_1;
    }(FacetType));
};
//# sourceMappingURL=SelectFacet.js.map