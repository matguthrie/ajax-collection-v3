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
exports.Content = void 0;
var Consts = require("./../constant/Constants");
var Content = /** @class */ (function () {
    function Content(template) {
        this.template = template;
        this.contentBlocks = [];
    }
    Content.prototype.load = function () {
        var _this = this;
        this.contentBlocks = this.template.productsContainer.find(Consts.CONTENT_BLOCK_SELECTOR);
        this.contentBlocks = this.contentBlocks ? this.contentBlocks.toArray() : [];
        this.contentBlocks = this.contentBlocks.map(function (cb) { return $(cb); });
        this.contentBlocks.forEach(function (cb) { return cb.attr('data-original-index', cb.index()); });
        $(window).on('resize', function () {
            if (_this.resizeTimeout)
                return;
            _this.resizeTimeout = setTimeout(function () { return _this.redraw(); }, 200);
        });
        //Redraw now, but due to how blocks shift pagination we also queueDraw
        this.redraw();
        if (this.contentBlocks.length)
            this.template.draw.queueDraw();
    };
    Content.prototype.addContentBlock = function (x) {
        if (typeof x === typeof '')
            x = $(x);
        this.contentBlocks.push(x);
        this.redraw();
    };
    Content.prototype.removeContentBlock = function (x) {
        var remove = [];
        this.contentBlocks = this.contentBlocks.filter(function (cb) {
            var is = cb.is(x);
            if (is)
                remove.push(x);
            return !is;
        });
        remove.forEach(function (x) { return x.remove(); });
        this.redraw();
    };
    Content.prototype.getContentBlocksForPage = function (params) {
        if (typeof this.template.getContentBlocksForPage === typeof undefined)
            return -1;
        return this.template.getContentBlocksForPage(__assign(__assign({}, params), { contentBlocks: this.contentBlocks }));
    };
    Content.prototype.redraw = function () {
        var _this = this;
        //Stop the resize timeout
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = null;
        //Detach all content blocks;
        var detach = [];
        var thumbnailElements = this.template.productsContainer.find(Consts.PRODUCT_THUMBNAILS_SELECTOR);
        var x = {}; //What is X? X is a passable variable that will be persistant between each iteration.
        this.contentBlocks.forEach(function (cb) {
            //Get the position of this content block
            var i = _this.template.getContentBlockPosition(cb, thumbnailElements, _this.template.draw.drawnProducts, x);
            if (i === -1)
                return detach.push(cb);
            //Now get the DOM Node this needs to go before.
            var element = thumbnailElements[i];
            if (element)
                return cb.insertBefore($(element));
            //That DOM Node doesn't exist, try the last one after.
            element = thumbnailElements[thumbnailElements.length - 1];
            if (element)
                return cb.insertAfter($(element));
            //That one doesn't exist (likely we're the only thing rendering)
            _this.template.productsContainer.append(cb);
        });
        detach.forEach(function (d) { return d.detach(); });
    };
    return Content;
}());
exports.Content = Content;
//# sourceMappingURL=Content.js.map