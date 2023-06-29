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
exports.LoadMore = void 0;
var Paginator_1 = require("./Paginator");
var Constants_1 = require("./../../constant/Constants");
var LoadMore = /** @class */ (function (_super) {
    __extends(LoadMore, _super);
    function LoadMore(template, container) {
        var _this = _super.call(this, template) || this;
        _this.container = container;
        _this.container.on('click', function (e) { return _this.onClick(e); });
        return _this;
    }
    LoadMore.prototype.onClick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        this.pagination.setPage(this.pagination.getCurrentPage() + 1);
    };
    LoadMore.prototype.getStart = function () { return 0; };
    LoadMore.prototype.getEnd = function (params) { return params.perPage * params.page; };
    LoadMore.prototype.updateVisibility = function () {
        if (this.pagination.getCurrentPage() >= this.pagination.getTotalPages()) {
            return this.container.addClass(Constants_1.CLASS_HIDDEN);
        }
        return this.container.removeClass(Constants_1.CLASS_HIDDEN);
    };
    LoadMore.prototype.onPageChange = function () {
        this.updateVisibility();
    };
    LoadMore.prototype.onPageReady = function () {
        this.updateVisibility();
    };
    LoadMore.prototype.onProductsDrawn = function () {
        this.updateVisibility();
    };
    LoadMore.prototype.onPerPageChange = function () {
        this.updateVisibility();
    };
    return LoadMore;
}(Paginator_1.Paginator));
exports.LoadMore = LoadMore;
//# sourceMappingURL=LoadMore.js.map