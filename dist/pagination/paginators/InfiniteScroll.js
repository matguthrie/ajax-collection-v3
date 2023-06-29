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
exports.InfiniteScroll = void 0;
var Paginator_1 = require("./Paginator");
var pc_slate_tools_1 = require("@process-creative/pc-slate-tools");
var InfiniteScroll = /** @class */ (function (_super) {
    __extends(InfiniteScroll, _super);
    function InfiniteScroll(template, params) {
        var _this = _super.call(this, template) || this;
        _this.onPageLoad(pc_slate_tools_1.getQueryParams());
        $(window).on('scroll', function (e) { return _this.onWindowScroll(e); });
        return _this;
    }
    InfiniteScroll.prototype.getStart = function () { return 0; };
    InfiniteScroll.prototype.onWindowScroll = function (e) {
        var _this = this;
        if (this.timeout)
            return;
        this.timeout = setTimeout(function (e) {
            _this.updateScrollPagination();
        }, 150);
    };
    InfiniteScroll.prototype.onPageLoad = function (params) {
        this.pageOnLoad = params && params.page ? params.page : null;
    };
    InfiniteScroll.prototype.onProductsFetched = function () {
        if (!this.pageOnLoad)
            return;
        var total = this.pagination.getTotalPages();
        var curr = this.pagination.getCurrentPage();
        if (this.pageOnLoad > total)
            return;
        if (curr > this.pageOnLoad)
            return;
        if (curr == this.pageOnLoad)
            return;
        this.pagination.setPage(this.pageOnLoad);
    };
    InfiniteScroll.prototype.updateScrollPagination = function () {
        //Tells the scroll event(s) that we are allowed to request another
        //frame.
        this.timeout = null;
        //Page count check.
        if (this.pagination.getCurrentPage() >= this.pagination.getTotalPages())
            return;
        //We're trying to calculate the percentage down the products conatiner we're
        //at. This involves determining the window size and position, as well as the
        //products container size and position, and extrapolate a percentage.
        var w = $(window);
        var wScroll = w.scrollTop(); //Y Position of the screen
        var wHeight = w.height();
        var pcOff = this.template.productsContainer.offset(); //Get the Product Container Offset
        var pcHeight = this.template.productsContainer.outerHeight();
        var relativePosition = (pcOff.top + pcHeight) - (wScroll + wHeight);
        //Do we have more than the height of a full set of products remaining?
        if (relativePosition >= pcHeight / this.pagination.getCurrentPage())
            return;
        //Now increase page
        this.pagination.setPage(this.pagination.getCurrentPage() + 1);
    };
    return InfiniteScroll;
}(Paginator_1.Paginator));
exports.InfiniteScroll = InfiniteScroll;
//# sourceMappingURL=InfiniteScroll.js.map