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
exports.decorateCheckboxFacet = void 0;
var Consts = require("./../../../constant/Constants");
var $ = require("jquery");
exports.decorateCheckboxFacet = function (FacetType) {
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1(params) {
            var _this = _super.call(this, params) || this;
            _this.allowMultiple = typeof params.allowMultiple === typeof undefined ? true : params.allowMultiple;
            _this.container.on('change', Consts.FACET_CHECKBOX_SELECTOR, function (e) { return _this.onChange(e); });
            return _this;
        }
        //Is Checked for checkboxes, not in sync with the filter due to DOM delays
        class_1.prototype.isChecked = function (option) {
            if (!this.getCheckboxElement(option).prop('checked'))
                return false;
            return true;
        };
        class_1.prototype.getCheckedOptions = function () {
            var _this = this;
            return this.getOptions().filter(function (o) { return _this.isChecked(o); });
        };
        class_1.prototype.getCheckboxElement = function (option) {
            return this.container.find(Consts.FACET_CHECKBOX_SELECTOR + "[" + Consts.FACET_CHECKBOX_OPTION + "=\"" + option + "\"]");
        };
        class_1.prototype.getPrint = function (e) {
            var _this = this;
            var options = this.getOptionsToDraw();
            var x = "<ul class=\"c-collection-faceted-nav__check-group\">";
            options.forEach(function (option, i) {
                x += "<li class=\"c-collection-faceted-nav__check-item\">\n          <div class=\"o-checkbox\">\n            <input\n              type=\"checkbox\" class=\"o-checkbox__checkbox\"\n              data-index=\"" + i + "\" data-option=\"" + _this.template.escape(option) + "\"\n              data-facet-checkbox " + (_this.isSelected(option) ? 'checked' : '') + "\n            />\n            <label class=\"o-checkbox__label\">" + _this.getOptionName(option) + "</label>\n          </div>\n        </li>";
            });
            x += "</ul>";
            return x;
        };
        class_1.prototype.onChange = function (e) {
            var option = $(e.target).attr(Consts.FACET_CHECKBOX_OPTION);
            if (this.allowMultiple) {
                this.setOption(option, this.isChecked(option));
            }
            else {
                this.setOptions(option);
            }
        };
        return class_1;
    }(FacetType));
};
//# sourceMappingURL=CheckboxFacet.js.map