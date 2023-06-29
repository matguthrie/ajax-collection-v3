"use strict";
exports.__esModule = true;
exports.Filter = void 0;
var Errors = require("./../../error/Errors");
var Filter = /** @class */ (function () {
    function Filter(template, handle) {
        if (!template)
            throw new Error(Errors.MISSING_FILTER_TEMPLATE);
        if (!handle || !handle.length)
            throw new Error(Errors.MISSING_FILTER_HANDLE);
        this.template = template;
        this.filters = this.template.filters;
        this.handle = handle;
    }
    Filter.prototype.getSettings = function () {
        //Return a list (either array or object) of all this filters' settings.
    };
    Filter.prototype.getSetting = function (key) {
        //Returns the setting specified by key (it's current value)
    };
    Filter.prototype.setSetting = function (key, value) {
        //Set the value at key with the value; value
    };
    Filter.prototype.setSettings = function (settings) {
        //Same as above but for all settings at once
    };
    Filter.prototype.clear = function () {
        this.setSettings(null);
    };
    Filter.prototype.filter = function (product, variant) {
        //Your custom filter may super this method.
        //Return true to keep this product, false to remove.
        return true;
    };
    Filter.prototype.init = function (settings) {
        //Init with the default settings, shouldn't be sub called, designed to use
        //whatever settings are defined at a collection level.
        if (typeof settings === typeof undefined || !settings)
            return;
        this.setSettings(settings);
    };
    return Filter;
}());
exports.Filter = Filter;
//# sourceMappingURL=Filter.js.map