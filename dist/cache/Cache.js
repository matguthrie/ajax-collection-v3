"use strict";
/*
 *  AjaxCollectionCache
 *    Caching module for the Ajax Collection
 *
 *  Version:
 *    1.0.0 - 2019/01/09
 */
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
exports.Cache = exports.clearProductCache = void 0;
var Errors = require("./../error/Errors");
var Consts = require("./../constant/Constants");
exports.clearProductCache = function () {
    try {
        localStorage.removeItem(Consts.CACHE_DATA_KEY);
        localStorage.removeItem(Consts.CACHE_DATE_KEY);
    }
    catch (e) {
        console.error(Errors.CACHE_CLEAR_FAILED);
        console.error(e);
    }
};
var Cache = /** @class */ (function () {
    function Cache(template) {
        this.template = template;
    }
    Cache.prototype.readProductCache = function () {
        if (!this.isCacheAlive())
            return [];
        //Now, let's attempt a read
        try {
            var dataRaw = localStorage.getItem(Consts.CACHE_DATA_KEY);
            var data = JSON.parse(dataRaw);
            if (!Array.isArray(data))
                throw new Error(Errors.CACHE_NOT_ARRAY);
            //Good?
            return data;
        }
        catch (e) {
            console.error(Errors.CACHE_LOAD_FAILED);
            console.error(e);
        }
        return [];
    };
    Cache.prototype.writeProductCache = function () {
        if (!this.isCacheAvailable())
            return;
        if (typeof this.canWriteProductCache !== typeof undefined && !this.canWriteProductCache)
            return;
        //Only update the date if it's not set yet
        if (!localStorage.getItem(Consts.CACHE_DATE_KEY)) {
            localStorage.setItem(Consts.CACHE_DATE_KEY, JSON.stringify(new Date().getTime()));
        }
        else if (!this.isCacheAlive()) {
            this.canWriteProductCache = false; //Stop the ability to write to the cache further
            this.clearProductCache(); //Sanitize
            //Did the clear succeed?
            this.canWriteProductCache = (typeof localStorage.getItem(Consts.CACHE_DATA_KEY) === typeof undefined ||
                localStorage.getItem(Consts.CACHE_DATA_KEY) == null);
            return;
        }
        //Now we need to create a storeable set of products...
        //The products in the data section contain circular structures and won't be
        //able to be JSONified
        try {
            //We need to reformat the data and make sure we're not holding onto anything we shouldn't.
            var products = this.template.data.products.map(function (product) {
                var p = __assign({}, product); //Duplicate
                p.variants = p.variants.map(function (variant) {
                    var v = __assign({}, variant); //Duplicate
                    delete v.product; //Remove circular reference
                    return v;
                });
                return p;
            });
            //Write data.
            localStorage.setItem(Consts.CACHE_DATA_KEY, JSON.stringify(products));
        }
        catch (e) {
            console.error(Errors.CACHE_SAVE_FAILED);
            console.error(e);
        }
    };
    Cache.prototype.clearProductCache = function () {
        exports.clearProductCache();
    };
    Cache.prototype.isCacheAvailable = function () {
        //Checks the availability of caching functions.
        if (typeof localStorage === typeof undefined)
            return false;
        if (typeof localStorage.getItem === typeof undefined)
            return false;
        if (typeof localStorage.setItem === typeof undefined)
            return false;
        return true;
    };
    Cache.prototype.isCacheAlive = function () {
        //Returns TRUE if the cache is still allowed to be use, false if it has
        //expired.
        if (!this.isCacheAvailable())
            return false;
        if (!localStorage.getItem(Consts.CACHE_DATA_KEY))
            return false;
        if (!localStorage.getItem(Consts.CACHE_DATE_KEY))
            return false;
        //First, how old is this data?
        try {
            var dateRaw = localStorage.getItem(Consts.CACHE_DATE_KEY);
            var cacheAge = new Date(JSON.parse(dateRaw));
            var now = new Date();
            var diff = now - cacheAge;
            //Cache cannot be in the future
            if (diff < 0 || isNaN(diff) || !isFinite(diff))
                throw new Error(Errors.CACHE_DATE_FUTURE);
            if (diff > 1000 * 60 * 10)
                return false; //Cache expired (1000ms * 60s * 10mins)
            //Cache is good to use
        }
        catch (e) {
            console.error(Errors.CACHE_DATE_FAILED);
            console.error(e);
            return false;
        }
        return true;
    };
    Cache.prototype.load = function () {
        var products = this.readProductCache();
        this.template.data.addProducts(products);
    };
    return Cache;
}());
exports.Cache = Cache;
//# sourceMappingURL=Cache.js.map