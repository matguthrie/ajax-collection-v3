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
exports.Paginator = void 0;
var Paginator = /** @class */ (function () {
    function Paginator(template, pagination) {
        this.template = template;
        this.pagination = pagination || template.pagination;
    }
    Paginator.prototype.getOffsets = function (params) {
        var params = __assign({ paginator: this }, params);
        return {
            start: this.pagination.getStartOffset(params),
            end: this.pagination.getEndOffset(params)
        };
    };
    Paginator.prototype.getStart = function (params) {
        return (params.page - 1) * params.perPage;
    };
    Paginator.prototype.getEnd = function (params) {
        return params.start + params.perPage;
    };
    Paginator.prototype.paginate = function (variants) {
        var params = {
            perPage: this.pagination.getPerPage(),
            page: this.pagination.getCurrentPage(),
            paginator: this,
            variants: variants
        };
        //Start & End Index in array
        params.start = this.getStart(params);
        params.end = this.getEnd(params);
        //Get Offsets
        params.offsets = this.getOffsets(params);
        params.start += params.offsets.start;
        params.end += params.offsets.end;
        //Paginated array
        return variants.slice(params.start, Math.min(params.variants.length, params.end));
    };
    Paginator.prototype.onPageChange = function () { };
    Paginator.prototype.onPageReady = function () { };
    Paginator.prototype.onProductsDrawn = function () { };
    Paginator.prototype.onPerPageChange = function () { };
    return Paginator;
}());
exports.Paginator = Paginator;
//# sourceMappingURL=Paginator.js.map