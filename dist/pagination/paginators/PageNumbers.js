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
exports.PageNumbers = void 0;
var Paginator_1 = require("./Paginator");
var PageNumbers = /** @class */ (function (_super) {
    __extends(PageNumbers, _super);
    function PageNumbers(template, container) {
        var _this = _super.call(this, template) || this;
        _this.container = container;
        //Standard Shopify Pagination controls
        _this.container.on('click touchstart', '.prev', function (e) { return _this.onPrevClick(e); });
        _this.container.on('click touchstart', '.next', function (e) { return _this.onNextClick(e); });
        _this.container.on('click touchstart', '.page', function (e) { return _this.onPageClick(e); });
        return _this;
    }
    PageNumbers.prototype.cancelClickEvent = function (e) {
        //Simple method that cancels event propogation
        if (typeof e === typeof undefined)
            return;
        if (typeof e.preventDefault !== typeof undefined)
            e.preventDefault();
        if (typeof e.stopPropagation !== typeof undefined)
            e.stopPropagation();
    };
    PageNumbers.prototype.redraw = function () {
        var _this = this;
        //Called anytime the filters are updated, products are loaded, pages are changed etc.
        var x = '';
        var page = this.pagination.getCurrentPage(); //Short hand
        var totalPages = this.pagination.getTotalPages();
        //Prev Button
        if (page > 1) {
            var url = this.template.settings.getSettingsUrl({ page: (page - 1) });
            x += " <span class=\"prev\"><a href=\"" + url + "\" title=\"\">\u00AB Previous</a></span> ";
        }
        //First, let's generate an array of numbers we want to draw (we always draw 1 and totalPages())
        var numbers = [];
        if (totalPages > 1)
            numbers = [1, totalPages];
        //Now add numbers page-2,page-1,page,page+1,page+2
        for (var i = page - 2; i <= page + 2; i++) {
            if (numbers.indexOf(i) !== -1)
                continue; //Already in the list
            if (i < 1)
                continue;
            if (i > totalPages)
                continue;
            numbers.push(i);
        }
        numbers = numbers.sort(function (l, r) { return l - r; });
        //Now we have a list of numbers, we can try and find gaps
        numbers.forEach(function (n, i) {
            if (n == 0)
                return;
            var isCurrent = n == page;
            x += " <span class=\"page " + (isCurrent ? 'current' : '') + "\">";
            if (!isCurrent) {
                var url = _this.template.settings.getSettingsUrl({ page: n });
                x += "<a href=\"" + url + "\" title=\"\">";
            }
            x += "" + n;
            if (!isCurrent)
                x += '</a>';
            x += '</span> ';
            //Is there a gap?
            var nextExpected = n + 1;
            if (typeof numbers[i + 1] !== typeof undefined && numbers[i + 1] != nextExpected) {
                x += ' <span class="deco">…</span> ';
            }
        });
        //Next Button
        if (page < totalPages) {
            var url = this.template.settings.getSettingsUrl({
                page: (page + 1)
            });
            x += " <span class=\"next\"><a href=\"" + url + "\" title=\"\">Next \u00BB</a></span> ";
        }
        this.container.html(x);
    };
    PageNumbers.prototype.onPageChange = function () {
        this.redraw();
    };
    PageNumbers.prototype.onPageReady = function () {
        this.redraw();
    };
    PageNumbers.prototype.onProductsDrawn = function () {
        this.redraw();
    };
    PageNumbers.prototype.onPerPageChange = function () {
        this.redraw();
    };
    //Pagination button functions
    PageNumbers.prototype.onPrevClick = function (e) {
        this.cancelClickEvent(e);
        this.pagination.setPage(this.pagination.getCurrentPage() - 1);
    };
    PageNumbers.prototype.onNextClick = function (e) {
        this.cancelClickEvent(e);
        this.pagination.setPage(this.pagination.getCurrentPage() + 1);
    };
    PageNumbers.prototype.onPageClick = function (e) {
        this.cancelClickEvent(e);
        var self = $(e.currentTarget);
        if (self.hasClass('current'))
            return;
        var page = parseInt(self.text());
        this.pagination.setPage(page);
    };
    return PageNumbers;
}(Paginator_1.Paginator));
exports.PageNumbers = PageNumbers;
//# sourceMappingURL=PageNumbers.js.map