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
exports.SelectSorter = void 0;
var Sorter_1 = require("./Sorter");
var SortMethods = require("./../methods/");
var $ = require("jquery");
var SelectSorter = /** @class */ (function (_super) {
    __extends(SelectSorter, _super);
    function SelectSorter(template, sortElement) {
        var _this = _super.call(this, template) || this;
        _this.sortElement = sortElement;
        sortElement.on('change', function (e) { return _this.onChange(e); });
        return _this;
    }
    SelectSorter.prototype.onChange = function (e) {
        var element = $(e.currentTarget);
        this.template.sort.setSort(element.val());
    };
    SelectSorter.prototype.onUpdate = function (selected) {
        var _this = this;
        window.test = SortMethods;
        var x = Object.entries(SortMethods).map(function (_a) {
            var key = _a[0], value = _a[1];
            //Skip invalid elements
            if (!value || !value.isVisible)
                return '';
            if (!value.isVisible(_this.template))
                return '';
            //Is checked?
            var checked = selected === value;
            //Generate print.
            return "<option value=\"" + value.handle + "\" " + (checked ? 'selected' : '') + ">" + _this.getOptionName(value, checked) + "</option>";
        }).join('');
        this.sortElement.html(x);
    };
    return SelectSorter;
}(Sorter_1.Sorter));
exports.SelectSorter = SelectSorter;
//# sourceMappingURL=SelectSorter.js.map