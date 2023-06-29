"use strict";
exports.__esModule = true;
exports.CollectionFilters = void 0;
var filters_1 = require("./filters/");
var CollectionFilters = /** @class */ (function () {
    function CollectionFilters(template) {
        this.template = template;
        this.filters = [];
        this.facets = [];
    }
    CollectionFilters.prototype.isFiltering = function () {
        return this.filters.some(function (f) {
            if (f.getSettings() && f.getSettings().length)
                return true;
            return false;
        });
    };
    CollectionFilters.prototype.addFilter = function (filter) {
        if (this.filters.indexOf(filter) !== -1)
            return;
        this.filters.push(filter);
    };
    CollectionFilters.prototype.addFacet = function (facet) {
        if (this.facets.indexOf(facet) !== -1)
            return;
        this.facets.push(facet);
        facet.print();
    };
    CollectionFilters.prototype.removeFilter = function (filter) {
        var index = this.filters.indexOf(filter);
        if (index === -1)
            return;
        this.filters.splice(index, 1);
    };
    CollectionFilters.prototype.removeFacet = function (facet) {
        var index = this.facets.indexOf(facet);
        if (index === -1)
            return;
        this.facets.splice(index, 1);
    };
    CollectionFilters.prototype.clearFilters = function () {
        this.filters.forEach(function (f) { return f.setSettings(null); });
    };
    CollectionFilters.prototype.load = function () {
        var _this = this;
        var settings = this.template.settings.settings;
        //Take the settinsg and give them to our filters
        Object.entries(settings).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            _this.filters.some(function (filter) {
                if (!filter || filter.handle != key)
                    return false;
                filter.setSettings(value);
                return true;
            });
        });
        if (settings.tags) {
            // let done = this.filters.some(filter => {
            //   if(!(filter instanceof TagFilter)) return false;
            //   if(settings.tags.length > 1 && filter.operation !== OPERATION_AND) return false;
            //   filter.setSettings(settings.tags);
            //   return true;
            // });
            //
            // if(!done) {
            this.urlTagFilter = new filters_1.TagFilter(this.template, 'tags', filters_1.OPERATION_AND, settings.tags);
            this.addFilter(this.urlTagFilter);
            // }
        }
        this.facets.forEach(function (facet) { return facet.print(); });
    };
    CollectionFilters.prototype.onFilterUpdate = function () {
        //Filters should call this when something causes them to change.
        //This function will trigger facets to be redrawn, followed by products, and then settings to be saved
        var settings = {};
        this.filters.forEach(function (filter) { return settings[filter.handle] = filter.getSettings(); });
        this.template.settings.setSettings(settings);
        this.facets.forEach(function (facet) { return facet.onFilterUpdate(); });
        //Fire pre-queue event
        if (this.template.onFilterChange)
            this.template.onFilterChange();
        //Queue a redraw of products
        this.template.draw.queueDraw();
    };
    CollectionFilters.prototype.onProductsFetched = function () {
        this.facets.forEach(function (facet) { return facet.onProductsFetched(); });
    };
    CollectionFilters.prototype.onProductsDrawn = function () {
        this.facets.forEach(function (facet) { return facet.onProductsDrawn(); });
    };
    return CollectionFilters;
}());
exports.CollectionFilters = CollectionFilters;
//# sourceMappingURL=CollectionFilters.js.map