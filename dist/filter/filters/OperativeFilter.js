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
exports.OperativeFilter = exports.OPERATION_OR = exports.OPERATION_AND = void 0;
var Filter_1 = require("./Filter");
exports.OPERATION_AND = "AND";
exports.OPERATION_OR = "OR";
var OperativeFilter = /** @class */ (function (_super) {
    __extends(OperativeFilter, _super);
    function OperativeFilter(template, handle, operation) {
        var _this = _super.call(this, template, handle) || this;
        _this.operation = operation || exports.OPERATION_AND;
        return _this;
    }
    OperativeFilter.prototype.setOperation = function (operation) {
        this.operation = operation;
        this.filters.onFilterUpdate();
    };
    OperativeFilter.prototype.filter = function (p, v) {
        if (this.operation === exports.OPERATION_AND)
            return this.filterAnd(p, v);
        if (this.operation === exports.OPERATION_OR)
            return this.filterOr(p, v);
        return false;
    };
    OperativeFilter.prototype.filterAnd = function (p, v) { return true; };
    OperativeFilter.prototype.filterOr = function (p, v) { return true; };
    return OperativeFilter;
}(Filter_1.Filter));
exports.OperativeFilter = OperativeFilter;
//# sourceMappingURL=OperativeFilter.js.map