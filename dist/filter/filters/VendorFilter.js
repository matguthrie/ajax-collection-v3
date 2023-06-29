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
exports.VendorFilter = void 0;
var Filter_1 = require("./Filter");
var VendorFilter = /** @class */ (function (_super) {
    __extends(VendorFilter, _super);
    function VendorFilter(template, handle, vendors) {
        var _this = _super.call(this, template, handle) || this;
        _this.vendors = vendors || [];
        return _this;
    }
    VendorFilter.prototype.getSettings = function () { return this.vendors; };
    VendorFilter.prototype.getSetting = function (vendor) {
        if (!vendor)
            return this.vendors;
        return this.vendors.indexOf(vendor) !== -1;
    };
    VendorFilter.prototype.setSetting = function (vendor, value) {
        if (value)
            return this.addVendor(vendor);
        this.removeVendor(vendor);
    };
    VendorFilter.prototype.setSettings = function (settings) {
        if (!Array.isArray(settings))
            settings = [settings];
        this.vendors = settings.filter(function (v) { return v; });
        this.filters.onFilterUpdate();
    };
    VendorFilter.prototype.addVendor = function (vendor) {
        if (this.getSetting(vendor))
            return;
        this.vendors.push(vendor);
        this.filters.onFilterUpdate();
    };
    VendorFilter.prototype.removeVendor = function (vendor) {
        var index = this.vendors.indexOf(vendor);
        if (index === -1)
            return;
        this.vendors.splice(index, 1);
        this.filters.onFilterUpdate();
    };
    VendorFilter.prototype.filter = function (p, v) {
        if (!this.vendors.length)
            return true;
        return this.vendors.some(function (type) { return p.vendor === type; });
    };
    return VendorFilter;
}(Filter_1.Filter));
exports.VendorFilter = VendorFilter;
//# sourceMappingURL=VendorFilter.js.map