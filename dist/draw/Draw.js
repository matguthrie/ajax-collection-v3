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
exports.Draw = void 0;
var Consts = require("./../constant/Constants");
var DisplayModes = require("./display/");
var Errors = require("./../error/Errors");
var $ = require("jquery");
var Draw = /** @class */ (function () {
    function Draw(template) {
        this.template = template;
        //Initialze our defaults.
        this.displayMode = DisplayModes.FirstAvailableVariant;
        this.drawnProducts = [];
        this.unpaginatedProducts = [];
        this.unpaginatedProductCount = 0;
    }
    Draw.prototype.getUnpaginatedVariantCount = function () {
        //Update count
        this.getUnpaginatedVariantsToDraw();
        return this.unpaginatedProductCount;
    };
    Draw.prototype.setDisplayMode = function (displayMode) {
        if (typeof displayMode === 'string' && !DisplayModes[displayMode])
            throw new Error(Errors.DISPLAY_MODE_INVALID);
        this.displayMode = displayMode;
        this.queueDraw();
    };
    Draw.prototype.isVariantPrinted = function (variant) {
        //Was the supplied argument a variant, or a variant id?
        if (typeof variant.id !== typeof undefined)
            variant = variant.id;
        var thumbnail = this.template.productsContainer.find(Consts.PRODUCT_THUMBNAILS_SELECTOR + "[data-variant-id=\"" + variant + "\"]");
        if (!thumbnail || !thumbnail.length)
            return false;
        return thumbnail;
    };
    Draw.prototype.getUnpaginatedVariantsToDraw = function () {
        var _this = this;
        //Return an array of variants to draw. You may opt to draw each kind
        //of variant, or may opt to draw only one kind (e.g. a product thumb)
        var draw = [];
        //Get all products...
        this.template.data.products.forEach(function (p) {
            //Is this product in this collection?
            if (!_this.template.data.isProductInCollection(p))
                return;
            //Is this a hidden product?
            if (p.isHidden === true)
                return;
            var variants = _this.getVariantsToDrawForProduct(p);
            variants.forEach(function (v) {
                //Duplicate the product (so the data can safely be modified)
                v = __assign({}, v);
                //Check our filters
                if (!_this.template.filters.filters.every(function (filter) { return filter.filter(p, v); }))
                    return;
                //Assign product (since it's cyclic this isn't stored, only modified)
                v.product = p;
                draw.push(v);
            });
        });
        //Now apply sorting
        draw = this.template.sort.sortVariants(draw);
        //Now store the unpaginated values..
        this.unpaginatedProducts = draw;
        this.unpaginatedProductCount = draw.length;
        return draw;
    };
    Draw.prototype.getVariantsToDraw = function () {
        var draw = this.getUnpaginatedVariantsToDraw();
        //Now Paginate.
        this.drawnProducts = draw = this.template.pagination.paginateVariants(draw);
        return draw;
    };
    Draw.prototype.getVariantsToDrawForProduct = function (product, modeOverride) {
        //Returns an array of variants to draw for a given product.
        //Use either all variants, only one variant (related to most relevant?)
        //or specific subset of variants (say.. colour?)
        //I've provided a few common examples here, you can chose to add your own
        var mode = modeOverride || this.displayMode || 'FirstAvailableVariant';
        //Check the modes, otherwise use the default and show an error.
        var modeFunction;
        if (typeof mode === 'function') {
            modeFunction = mode;
        }
        else {
            modeFunction = DisplayModes[mode] || (function (product, template) {
                console.error(Errors.DISPLAY_MODE_INVALID);
                return DisplayModes.FirstAvailableVariant(product, template);
            });
        }
        return modeFunction(product, this.template).filter(function (f) { return f; });
    };
    Draw.prototype.queueDraw = function () {
        var _this = this;
        //Due to high document writes, reads, iteration etc, particularly on small devices
        //We have this nice render timeout to make sure that rendering happens when
        //needed (Every 500ms or so)
        if (this.template.onDrawQueued)
            this.template.onDrawQueued();
        if (typeof this.renderTimeout !== typeof undefined)
            return;
        this.renderTimeout = setTimeout(function () { return _this.draw(); }, 500);
    };
    Draw.prototype.draw = function () {
        //Clear render timeout function
        if (typeof this.renderTimeout !== typeof undefined)
            clearTimeout(this.renderTimeout);
        delete this.renderTimeout;
        //Get the array of array of variants to draw.
        var draw = this.getVariantsToDraw();
        var _a = this.template, container = _a.container, productsContainer = _a.productsContainer;
        //Clear thumbs that no longer need to be printed...
        var thumbs = productsContainer.find(Consts.PRODUCT_THUMBNAILS_SELECTOR);
        var thumbArray = thumbs.toArray();
        for (var i = 0; i < thumbArray.length; i++) {
            var willBePrinted = false; //If true, stay printed, else remove
            var e = $(thumbArray[i]); //Element
            for (var x = 0; x < draw.length; x++) {
                var v = draw[x];
                if (v.id != e.attr('data-variant-id'))
                    continue;
                willBePrinted = true; //Stay printed.
                break;
            }
            if (willBePrinted)
                continue;
            //Remove
            e.remove();
        }
        if (container.find(Consts.PRODUCT_THUMBNAILS_SELECTOR).length > 2000) {
            return console.error('Attempted to print more than 2000 products on a single page...');
        }
        //Now we should only have the variants that are printed left
        var previous = null; //Used to track the "previously printed element"
        for (var i = 0; i < draw.length; i++) {
            var variant = draw[i];
            var element = this.isVariantPrinted(variant); //Returns false, or the jQuery element
            if (!element) {
                //Product is not printed... generate the HTML
                element = this.template.generatePrint(variant, i);
                //Is there a previous element?
                if (previous && previous.length) {
                    //This becomes the new previous
                    previous = $(element).insertAfter(previous);
                    continue;
                }
                //No previous element, this must be the first, let's put it first.
                var firstElement = productsContainer.children(Consts.PRODUCT_THUMBNAILS_SELECTOR).first(); //Is there any other element?
                if (firstElement && firstElement.length) { //Yes, insert before that
                    previous = $(element).insertBefore(firstElement);
                    continue;
                }
                //There is no previous element (this is the first), Inject HTML and get element.
                element = $(element);
                productsContainer.append(element);
                previous = element;
                continue;
            }
            //This is already printed, it will become the new previous, but first
            if (!previous) {
                //There is no previous element (meaning this will be the first)
                previous = element;
                continue;
            }
            //There is a previous element, so we are going to move to be after it.
            var prev = element.prev();
            if (previous && !prev.is(previous))
                element.insertAfter(previous);
            previous = element; //Now I am the new previous, the next item will go after me.
            if (previous.length > 1)
                previous = $(previous[0]);
        }
        //Update the internal list of drawn products.
        this.drawnProducts = draw;
        //Fire our event
        this.template.filters.onProductsDrawn();
        this.template.pagination.onProductsDrawn();
        this.template.content.redraw();
        this.template.onVariantsDrawn(draw);
    };
    return Draw;
}());
exports.Draw = Draw;
//# sourceMappingURL=Draw.js.map