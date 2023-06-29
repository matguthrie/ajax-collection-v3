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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.TypeFilter = void 0;
var Filter_1 = require("./Filter");
var TypeFilter = /** @class */ (function (_super) {
    __extends(TypeFilter, _super);
    function TypeFilter(template, handle, types) {
        var _this = _super.call(this, template, handle) || this;
        _this.types = types || [];
        return _this;
    }
    TypeFilter.prototype.getSettings = function () { return this.types; };
    TypeFilter.prototype.getSetting = function (type) {
        if (!type)
            return this.types;
        return this.types.indexOf(type) !== -1;
    };
    TypeFilter.prototype.setSetting = function (type, value) {
        if (value)
            return this.addType(type);
        this.removeType(type);
    };
    TypeFilter.prototype.setSettings = function (types) {
        if (!Array.isArray(types))
            types = [types];
        this.types = __spreadArrays(types).filter(function (t) { return t; });
        this.filters.onFilterUpdate();
    };
    TypeFilter.prototype.addType = function (type) {
        if (this.getSetting(type))
            return;
        this.types.push(type);
        this.filters.onFilterUpdate();
    };
    TypeFilter.prototype.removeType = function (type) {
        var index = this.types.indexOf(type);
        if (type === -1)
            return;
        this.types.splice(index, 1);
        this.filters.onFilterUpdate();
    };
    TypeFilter.prototype.filter = function (p, v) {
        if (!this.types.length)
            return true;
        return this.types.some(function (type) { return p.type === type; });
    };
    return TypeFilter;
}(Filter_1.Filter));
exports.TypeFilter = TypeFilter;
//# sourceMappingURL=TypeFilter.js.map