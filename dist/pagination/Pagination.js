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
exports.Pagination = exports.VIEW_ALL_COUNT = void 0;
var paginators_1 = require("./paginators/");
exports.VIEW_ALL_COUNT = 999999;
var Pagination = /** @class */ (function () {
    function Pagination(template) {
        this.template = template;
        //Initialize a default paginator.
        this.paginator = new paginators_1.Paginator(template, this);
        //Content Aware Pagination, this will consider content blocks as taking up
        //a respective product thumbnail slot
        this.paginateContentAware = false;
    }
    Pagination.prototype.getCurrentPage = function () {
        if (this.isViewAll())
            return 1;
        var page = this.template.settings.settings.page;
        page = parseInt(page);
        if (isNaN(page) || !isFinite(page))
            page = 1;
        return this.clampPage(page);
    };
    Pagination.prototype.getTotalPagesWithoutOffset = function () {
        if (this.isViewAll())
            return 1;
        var total = this.template.draw.getUnpaginatedVariantCount();
        if (!total)
            return 1;
        return Math.ceil(total / this.getPerPage());
    };
    Pagination.prototype.getTotalPages = function () {
        if (this.isViewAll())
            return 1;
        var total = this.template.draw.getUnpaginatedVariantCount();
        if (!total)
            return 1;
        var pagesWithoutOffset = this.getTotalPagesWithoutOffset();
        //What we're doing here is adding the page offsets.
        //e.g. if There are 10 products per page, and we're trying to print 19 but
        //the offset is -3 then we need to forcibly add page 3
        total -= this.getEndOffset({
            page: pagesWithoutOffset,
            perPage: this.getPerPage(),
            paginator: this.paginator
        });
        return Math.ceil(total / this.getPerPage());
    };
    Pagination.prototype.getPerPage = function () {
        if (this.isViewAll())
            return exports.VIEW_ALL_COUNT;
        var perPage = this.template.settings.settings.perPage;
        perPage = parseInt(perPage || '');
        if (isNaN(perPage) || !isFinite(perPage))
            perPage = this.template.perPage;
        perPage = Math.max(1, Math.min(250, perPage)); //Clamp to 250 max.
        return perPage || 20;
    };
    Pagination.prototype.isViewAll = function () {
        var perPage = this.template.settings.settings.perPage;
        if (perPage === 'all')
            return true;
        perPage = parseInt(perPage);
        return !isNaN(perPage) && isFinite(perPage) && perPage >= exports.VIEW_ALL_COUNT;
    };
    Pagination.prototype.setPaginator = function (paginator) {
        this.paginator = paginator;
        this.template.draw.queueDraw();
    };
    Pagination.prototype.setPage = function (page) {
        this.template.settings.setSetting('page', this.clampPage(page));
        this.template.draw.draw();
        this.paginator.onPageChange();
        this.template.onPageChange(this.getCurrentPage());
    };
    Pagination.prototype.setPerPage = function (perPage) {
        if (perPage == this.template.perPage) {
            this.template.settings.setSetting('perPage', null);
        }
        else if (this.isViewAll()) {
            this.template.settings.setSetting('perPage', 'all');
        }
        else {
            this.template.settings.setSetting('perPage', perPage);
        }
        this.template.draw.queueDraw();
        this.paginator.onPerPageChange();
        this.template.onPerPageChange(this.getPerPage());
    };
    Pagination.prototype.getOffsetDueToContentBlocks = function (params) {
        var _this = this;
        //Count the offset based on the size of each content block
        var cb = this.template.content.getContentBlocksForPage(params);
        if (!cb || !cb.length)
            return 0;
        return cb.reduce(function (x, cb) { return x + _this.template.getContentBlockSize(__assign(__assign({}, params), { contentBlock: cb })); }, 0);
    };
    Pagination.prototype.getStartOffset = function (params) {
        if (this.isViewAll())
            return 0;
        var offset = 0;
        //Add the previous pages' end offset (basically the "last index we rendered")
        if (params.page > 1)
            offset += this.getEndOffset(__assign(__assign({}, params), { page: params.page - 1 }));
        return offset;
    };
    Pagination.prototype.getEndOffset = function (params) {
        if (this.isViewAll())
            return 0;
        //Start with the start offset of THIS page
        var offset = this.getStartOffset(params);
        //Offset this pages' content blocks
        if (this.paginateContentAware && this.template.content) {
            offset -= this.getOffsetDueToContentBlocks(params);
        }
        return offset;
    };
    Pagination.prototype.viewAll = function () {
        this.setPerPage(exports.VIEW_ALL_COUNT);
    };
    Pagination.prototype.paginateVariants = function (variants) {
        if (this.isViewAll())
            return variants;
        if (this.paginator)
            variants = this.paginator.paginate(variants);
        return variants;
    };
    Pagination.prototype.clampPage = function (page) {
        if (this.isViewAll())
            return 1;
        return Math.min(Math.max(page, 1), this.getTotalPages());
    };
    Pagination.prototype.load = function () {
        this.paginator.onPageReady();
    };
    //Events
    Pagination.prototype.onProductsDrawn = function () {
        this.paginator.onProductsDrawn();
    };
    Pagination.prototype.onProductsFetched = function () {
        this.paginator.onProductsFetched ? this.paginator.onProductsFetched() : null;
    };
    return Pagination;
}());
exports.Pagination = Pagination;
//# sourceMappingURL=Pagination.js.map