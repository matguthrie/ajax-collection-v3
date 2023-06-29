"use strict";
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
exports.Sort = void 0;
var SortMethods = require("./methods/");
var Sort = /** @class */ (function () {
    function Sort(template) {
        this.template = template;
        this.sorters = [];
        this.sortMethods = __assign({}, SortMethods);
        //Setup the default method for sort by
        //Starts empty so that the read collection data will set this and start
        //using this sorting method. By using the default sortby it won't appear in
        //the url.
        this.defaultSortBy = '';
    }
    Sort.prototype.getSortMethods = function () {
        return this.sortMethods;
    };
    //Internal method only, don't use front facing.
    Sort.prototype.getSortSetting = function () {
        return this.template.settings.settings.sort_by;
    };
    Sort.prototype.getSortMethodByHandle = function (handle) {
        return Object.values(this.getSortMethods()).find(function (method) { return method && method.handle === handle; });
    };
    Sort.prototype.getSortMethod = function () {
        var method = this.getSortMethodByHandle(this.getSortSetting() || this.defaultSortBy || 'manual');
        return method && method.isVisible(this.template) ? method : null || this.sortMethods.ManualSort || SortMethods.ManualSort;
    };
    Sort.prototype.getDefaultSortMethod = function () {
        return this.defaultSortBy || 'manual';
    };
    Sort.prototype.setDefaultSort = function (defaultSort) {
        var _this = this;
        var current = this.defaultSortBy || 'manual';
        this.defaultSortBy = defaultSort;
        if (current != defaultSort)
            this.template.draw.queueDraw();
        this.sorters.forEach(function (sorter) { return sorter.onUpdate(_this.getSortMethod()); });
    };
    Sort.prototype.setSort = function (sort) {
        var _this = this;
        var value = sort;
        if (sort == (this.defaultSortBy || 'manual'))
            value = null;
        if (value && !this.getSortMethodByHandle(value))
            value = null;
        this.template.settings.setSetting('sort_by', value);
        this.template.draw.draw(); //Immediate redraw
        this.sorters.forEach(function (sorter) { return sorter.onUpdate(_this.getSortMethod()); });
    };
    Sort.prototype.sortVariants = function (variants) {
        var method = this.getSortMethod();
        if (!method)
            return variants;
        var sorted = method.sort(this.template, variants, method);
        if (method.reverse)
            sorted.reverse();
        if (this.template.onSort)
            return this.template.onSort({ method: method, variants: variants, sorted: sorted });
        return sorted;
    };
    Sort.prototype.addSorter = function (sorter) {
        this.sorters.push(sorter);
        sorter.onUpdate(this.getSortMethod());
    };
    Sort.prototype.load = function () {
        this.redraw();
    };
    Sort.prototype.redraw = function () {
        var sort = this.getSortMethod();
        this.sorters.forEach(function (sorter) { return sorter.onUpdate(sort); });
    };
    return Sort;
}());
exports.Sort = Sort;
//# sourceMappingURL=Sort.js.map