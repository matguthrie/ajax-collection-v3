"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.Facet = void 0;
var Errors = require("./../../error/Errors");
var Facet = /** @class */ (function () {
    function Facet(params) {
        //Get the options...
        var template = params.template, filter = params.filter, container = params.container, title = params.title, options = params.options, hasAll = params.hasAll, allName = params.allName;
        this.params = params;
        if (!template)
            throw new Error(Errors.MISSING_FACET_TEMPLATE);
        if (!filter)
            throw new Error(Errors.MISSING_FACET_FILTER);
        if (!container)
            throw new Error(Errors.MISSING_FACET_CONTAINER);
        if (!title)
            throw new Error(Errors.MISSING_FACET_TITLE);
        //Was the passed container a string? If so it's a selector, find it.
        if (typeof container === "string")
            container = template.container.find(container);
        this.template = template;
        this.filter = filter;
        this.container = container;
        this.title = title;
        this.options = options || [];
        this.hasAll = hasAll || false;
        this.allName = allName || 'All';
    }
    Facet.prototype.isSelected = function (option) {
        if (this.hasOptionAll() && this.isOptionAll(option)) {
            var settings = this.filter.getSettings();
            return !settings || !settings.length;
        }
        return this.filter.getSetting(option);
    };
    Facet.prototype.isOptionAll = function (option) {
        return option === 'all';
    };
    Facet.prototype.hasOptionAll = function () {
        return this.hasAll || false;
    };
    Facet.prototype.getOptionName = function (option) {
        if (this.isOptionAll(option))
            return this.template.escape(this.allName);
        return this.template.escape(option);
    };
    Facet.prototype.getPrint = function () {
        return "";
    };
    Facet.prototype.getOptionsToDraw = function () {
        var options = this.getVisibleOptions();
        if (this.hasOptionAll())
            options = __spreadArrays(['all'], options);
        return options;
    };
    Facet.prototype.getVisibleOptions = function () {
        return this.getOptions().filter(function (f) { return f && f.replace(/\s/g, '').length; });
    };
    Facet.prototype.getOptions = function () {
        return this.options;
    };
    Facet.prototype.setOption = function (o, v) {
        if (this.hasOptionAll() && this.isOptionAll(o)) {
            return this.filter.setSettings(null);
        }
        this.filter.setSetting(o, v);
    };
    Facet.prototype.setOptions = function (v) {
        var _this = this;
        if (this.hasOptionAll()) {
            var isAll = Array.isArray(v) ? v.some(function (o) { return _this.isOptionAll(o); }) : this.isOptionAll(v);
            if (isAll)
                return this.filter.setSettings(null);
        }
        this.filter.setSettings(v);
    };
    Facet.prototype.getTemplate = function (title, body) {
        return "\n      " + (this.params.showTitle === false ? '' : "<span class=\"c-collection-faceted-nav__title\">" + title + "</span>") + "\n      " + body + "\n    ";
    };
    Facet.prototype.print = function () {
        var body = this.getPrint();
        var x = this.getTemplate(this.title, body);
        if (this.currentPrint && this.currentPrint == x)
            return; //Not worth re-rendering.
        this.currentPrint = x;
        this.container.html(x);
        if (this.getVisibleOptions() && this.getVisibleOptions().length) {
            this.container.addClass('has-options');
        }
        else {
            this.container.removeClass('has-options');
        }
        if (this.filter.getSettings() && this.filter.getSettings().length) {
            this.container.addClass('is-filtering');
        }
        else {
            this.container.removeClass('is-filtering');
        }
    };
    Facet.prototype.onFilterUpdate = function () {
        this.print();
    };
    Facet.prototype.onProductsFetched = function () {
        this.print();
    };
    Facet.prototype.onProductsDrawn = function () {
        this.print();
    };
    return Facet;
}());
exports.Facet = Facet;
//# sourceMappingURL=Facet.js.map