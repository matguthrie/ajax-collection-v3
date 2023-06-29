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
exports.TagFilter = void 0;
var OperativeFilter_1 = require("./OperativeFilter");
var TagFilter = /** @class */ (function (_super) {
    __extends(TagFilter, _super);
    function TagFilter(template, handle, operation, initialTags) {
        var _this = _super.call(this, template, handle, operation) || this;
        _this.tags = (initialTags || []).map(function (tag) { return tag.toLowerCase(); });
        return _this;
    }
    TagFilter.prototype.getSettings = function () { return this.tags; };
    TagFilter.prototype.getSetting = function (tag) {
        if (!tag)
            return this.tags;
        return this.tags.indexOf(tag.toLowerCase()) !== -1;
    };
    TagFilter.prototype.setSetting = function (tag, value) {
        if (value)
            return this.addTag(tag);
        this.removeTag(tag);
    };
    TagFilter.prototype.setSettings = function (tags) {
        if (!Array.isArray(tags))
            tags = [tags];
        this.tags = tags.filter(function (t) { return t; }).map(function (tag) { return tag.toLowerCase(); });
        this.filters.onFilterUpdate();
    };
    TagFilter.prototype.addTag = function (tag) {
        if (this.getSetting(tag))
            return;
        this.tags.push(tag.toLowerCase());
        this.filters.onFilterUpdate();
    };
    TagFilter.prototype.removeTag = function (tag) {
        tag = tag.toLowerCase();
        var index = this.tags.indexOf(tag);
        if (index === -1)
            return;
        this.tags.splice(index, 1);
        this.filters.onFilterUpdate();
    };
    TagFilter.prototype.filterAnd = function (p, v) {
        if (!this.tags.length)
            return true;
        return this.tags.every(function (tag) {
            return p.tags.some(function (productTag) { return tag.toLowerCase() === productTag.toLowerCase(); });
        });
    };
    TagFilter.prototype.filterOr = function (p, v) {
        if (!this.tags.length)
            return true;
        return this.tags.some(function (tag) {
            return p.tags.some(function (productTag) { return tag.toLowerCase() === productTag.toLowerCase(); });
        });
    };
    return TagFilter;
}(OperativeFilter_1.OperativeFilter));
exports.TagFilter = TagFilter;
//# sourceMappingURL=TagFilter.js.map