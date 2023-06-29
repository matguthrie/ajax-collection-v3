"use strict";
/*
 *  AjaxCollection Template
 *    Contains the basic functionality for the AjaxCollection Template.
 *
 *  Version:
 *    3.0.0 - 2019/01/09
 */
exports.__esModule = true;
exports.AjaxCollectionTemplate = void 0;
var Consts = require("./constant/Constants");
var Errors = require("./error/Errors");
var pc_slate_tools_1 = require("@process-creative/pc-slate-tools");
var Cache_1 = require("./cache/Cache");
var Data_1 = require("./data/Data");
var Fetch_1 = require("./fetch/Fetch");
var Sort_1 = require("./sort/Sort");
var Draw_1 = require("./draw/Draw");
var Pagination_1 = require("./pagination/Pagination");
var CollectionFilters_1 = require("./filter/CollectionFilters");
var Settings_1 = require("./settings/Settings");
var Content_1 = require("./content/Content");
var AjaxCollectionTemplate = /** @class */ (function () {
    function AjaxCollectionTemplate(container) {
        /*** SETUP CONTAINER ***/
        //Validate Container
        if (!container || !container.length)
            throw new Error(Errors.CONTAINER_INVALID);
        if (container.attr('data-initialized'))
            throw new Error(Errors.CONTAINER_INITIALZED);
        this.container = container;
        this.container.attr('data-intialized', 'true');
        //Attributes
        this.handle = container.attr(Consts.COLLECTION_HANDLE_ATTR);
        this.perPage = parseInt(container.attr(Consts.COLLECTION_HANDLE_PER_PAGE));
        //Validate Attributes
        if (!this.handle)
            throw new Error(Errors.MISSING_COLLECTION_HANDLE);
        if (!this.perPage || isNaN(this.perPage) || !isFinite(this.perPage))
            throw new Error(Errors.MISSING_COLLECTION_PAGE_COUNT);
        this.productsContainer = container.find(Consts.PRODUCTS_CONTAINER_SELECTOR);
        if (!this.productsContainer.length)
            throw new Error(Errors.MISSING_PRODUCT_CONTAINER);
        //Variables
        this.started = false;
        /*** SETUP MODULES ***/
        this.data = new Data_1.Data(this); // Module for storing and managing data, doesn't manipulate or get in any way
        this.fetch = new Fetch_1.Fetch(this); // Module for talking to Shopify to get data and manage what to do when it has fetched
        this.cache = new Cache_1.Cache(this); // Module for reading and writing data to the cache to improve speed and load times
        this.settings = new Settings_1.Settings(this); // Module for managing settings, reading from URL, writing to url etc, filters, sorting and pagination will manipulate the settings as they see fit
        this.sort = new Sort_1.Sort(this); // Module for sorting products and variants
        this.content = new Content_1.Content(this); // Module for content blocks
        this.filters = new CollectionFilters_1.CollectionFilters(this); // Module for filtering products from facets and settings
        this.pagination = new Pagination_1.Pagination(this); // Module for paginating products to be printed
        this.draw = new Draw_1.Draw(this); // Module for rendering data, uses all other modules to work
        /*
          A Note on overriding:
          While you are able to and welcome to override any method or module,
          it is generally good practice to leave as many of these methods alone
          or as close to their original function as expected.
    
          A note on module overriding is that while it's fine to customize modules
          to suit a specific need, keep all logic within the respective init()
          for that module.
        */
    }
    AjaxCollectionTemplate.prototype.init = function () {
        //Begin by loading the data out of the cache, it's the oldest and is the least important to us.
        this.cache.load();
        //Now load the fresh data off the HTML
        this.data.load();
        //Load the settings
        this.settings.load();
        //Now set the fetch going.
        this.fetch.start();
        //Setup the filters
        this.filters.load();
        //Do the initial draw
        this.draw.draw();
        //Prepare the sorters
        this.sort.load();
        //Prepare content blocks
        this.content.load();
        //Prepare the paginators.
        this.pagination.load();
        //Mark that the AjaxCollection has started, good for knowing that things are working.
        this.started = true;
        this.onInitialized();
    };
    AjaxCollectionTemplate.prototype.escape = function (str) { return pc_slate_tools_1.escapeString(str); };
    AjaxCollectionTemplate.prototype.generatePrint = function (v, index) {
        //This is a generic template, you should definitely override this template with your own HTML
        var p = v.product;
        return "\n      <a href=\"" + this.getVariantUrl(v) + "\" " + this.generateThumbnailAttributes(v) + ">\n        " + this.generateThumbnailMeta(v) + "\n        " + index + " - " + this.escape(p.title) + " / " + this.escape(v.title) + "\n      </a>\n    ";
    };
    AjaxCollectionTemplate.prototype.generateThumbnailAttributes = function (v) {
        //Generates the necessary attributes for product thumbnails
        var p = v.product;
        return ("data-product-thumbnail data-product-handle=\"" + p.handle + "\" " +
            ("data-product-id=\"" + p.id + "\" data-variant-id=\"" + v.id + "\" ") +
            "itemprop=\"itemListElement\" itemscope itemtype=\"http://schema.org/Product\"");
    };
    AjaxCollectionTemplate.prototype.generateThumbnailMeta = function (v) {
        //Generates the necessary meta info for the product thumbnails.
        var p = v.product;
        var x = ("<meta itemprop=\"name\" content=\"" + escape(this.getVariantTitle(v)) + "\" />" +
            ("<meta itemprop=\"url\" content=\"" + (window.location.origin + v.url) + "\" />"));
        if (p.vendor.length)
            x += "<meta itemprop=\"brand\" content=\"" + escape(p.vendor) + "\" />";
        return x;
    };
    AjaxCollectionTemplate.prototype.generateThumbnailPicture = function (v, clazz) {
        //Generates the HTML for a thumbnail picture
        var featured_image = v.featured_image, product = v.product;
        var image = null;
        if (featured_image && featured_image.src) {
            image = featured_image.src;
        }
        else if (product && product.image && product.image) {
            image = product.image;
        }
        return pc_slate_tools_1.generatePicture(image, 500, [150, 250, 500], clazz, this.escape(v.featured_image ? v.featured_image.alt : this.getVariantTitle(v)), "itemprop=\"image\"");
    };
    //Utility Functions, you may override if the specific needs suit you.
    AjaxCollectionTemplate.prototype.isVariantAvailable = function (variant) {
        if (!variant)
            return false;
        return variant.available && !variant.product.isHidden;
    };
    AjaxCollectionTemplate.prototype.isVariantOnSale = function (variant) {
        if (variant.compare_at_price == null)
            return false;
        return variant.compare_at_price > 0 && variant.price < variant.compare_at_price;
    };
    AjaxCollectionTemplate.prototype.getShopifyFetch = function (page) {
        return {
            url: this.getUrl(),
            params: { page: page, view: 'json' }
        };
    };
    AjaxCollectionTemplate.prototype.getUrl = function () {
        return "/collections/" + this.handle;
    };
    AjaxCollectionTemplate.prototype.getVariantUrl = function (variant) {
        var product = variant.product;
        var url = this.getUrl() + "/products/" + product.handle;
        if (product.variants.length >= 2)
            url += "?variant=" + variant.id;
        return url;
    };
    AjaxCollectionTemplate.prototype.getVariantTitle = function (v) {
        var p = v.product;
        return p.title + (p.variants.length != 1 ? " - " + v.title : '');
    };
    AjaxCollectionTemplate.prototype.getOptionIndex = function (product, options) {
        if (!Array.isArray(options))
            options = [options];
        var _loop_1 = function (i) {
            var o = product.options[i].toLowerCase();
            if (options.some(function (match) { return o === match.toLowerCase(); }))
                return { value: i };
        };
        for (var i = 0; i < product.options.length; i++) {
            var state_1 = _loop_1(i);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        return -1;
    };
    AjaxCollectionTemplate.prototype.getContentBlockPosition = function (cb, drawnThumbs) {
        var oi = parseInt(cb.attr('data-original-index') || '');
        if (isNaN(oi) || !isFinite(oi))
            return -1;
        if (drawnThumbs.length < oi)
            return -1;
        return oi;
    };
    AjaxCollectionTemplate.prototype.getContentBlockSize = function (params) {
        //Returns the size (in product thumbnails) of the content block
        return 1;
    };
    //Some events, your collection may chose to use these
    AjaxCollectionTemplate.prototype.onProductsFetched = function (products) { }; //Gets called every time more products are fetched, but BEFORE they are printed.
    AjaxCollectionTemplate.prototype.onVariantsDrawn = function (variants) { }; //Gets called every time AFTER variants have been drawn.
    AjaxCollectionTemplate.prototype.onPageChange = function (newPage) { }; //Gets called every time the page is changed AFTER the queued draw
    AjaxCollectionTemplate.prototype.onPerPageChange = function (perPage) { }; //Gets called every time the per page count changes AFTER queued draw
    AjaxCollectionTemplate.prototype.onInitialized = function () { }; //Called after the ajax collection has finished intializing
    return AjaxCollectionTemplate;
}());
exports.AjaxCollectionTemplate = AjaxCollectionTemplate;
//# sourceMappingURL=AjaxCollectionTemplate.js.map