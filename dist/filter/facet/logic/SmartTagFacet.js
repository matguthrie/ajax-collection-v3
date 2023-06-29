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
exports.SmartTagFacet = exports.getTagsWithPrefixes = void 0;
var TagFacet_1 = require("./TagFacet");
exports.getTagsWithPrefixes = function (prefixes, tags, token) {
    tags = tags.filter(function (t) {
        var split = t.split(token);
        if (split.length < 2)
            return;
        var prefix = split[0];
        return prefixes.some(function (p) { return p.toLowerCase() == prefix.toLowerCase(); });
    });
    tags = tags.filter(function (t, i) {
        return i === tags.findIndex(function (t2) { return t2.toLowerCase() === t.toLowerCase(); });
    });
    tags.sort(function (l, r) {
        var _a = l.split(token), lprefix = _a[0], lsuffix = _a[1];
        var _b = r.split(token), rprefix = _b[0], rsuffix = _b[1];
        return lsuffix.localeCompare(rsuffix);
    });
    return tags;
};
var SmartTagFacet = /** @class */ (function (_super) {
    __extends(SmartTagFacet, _super);
    function SmartTagFacet(params) {
        var _this = _super.call(this, params) || this;
        var prefix = params.prefix, prefixes = params.prefixes, token = params.token;
        prefixes = prefixes || [];
        if (prefix)
            prefixes.push(prefix);
        _this.token = token || '_';
        _this.prefixes = prefixes;
        return _this;
    }
    SmartTagFacet.prototype.getOptions = function () {
        var options = _super.prototype.getOptions.call(this);
        if (!this.prefixes || !this.prefixes.length)
            return options;
        return exports.getTagsWithPrefixes(this.prefixes, options, this.token);
    };
    SmartTagFacet.prototype.getVisibleOptions = function () {
        var options = _super.prototype.getVisibleOptions.call(this);
        return exports.getTagsWithPrefixes(this.prefixes, options, this.token);
    };
    SmartTagFacet.prototype.getOptionName = function (option) {
        if (this.isOptionAll(option))
            return _super.prototype.getOptionName.call(this, option);
        var _a = option.split(this.token), prefix = _a[0], suffix = _a[1];
        var prefixOption = this.prefixes.find(function (p) { return p.toLowerCase() == prefix.toLowerCase(); });
        if (!prefixOption)
            return null;
        return suffix;
    };
    return SmartTagFacet;
}(TagFacet_1.TagFacet));
exports.SmartTagFacet = SmartTagFacet;
//# sourceMappingURL=SmartTagFacet.js.map