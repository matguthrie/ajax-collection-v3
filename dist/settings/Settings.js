"use strict";
/*
  Here's my "Really quick" How the URLs work for both parsing and unparsing
  Example Query:
    ?size=20,30,50&color=Red&group=(range%253D0-100%2526vendor%253DApple)

  Bloated:
    {
      size: [ 20, 30, 50 ],
      color: [ "Red" ],
      group: {
        range: {min:0, max:100},
        vendor: "Apple"
      }
    }

  Just an example.
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
exports.Settings = void 0;
var filter_1 = require("./../filter/");
var pc_slate_tools_1 = require("@process-creative/pc-slate-tools");
var Settings = /** @class */ (function () {
    function Settings(template) {
        this.template = template;
        //This will be populated later by a mixture of filters, sort and pagination.
        //Don't manually update this object, it won't trigger a url rewrite, facet change etc.
        this.settings = {};
        this.hasLoaded = true;
    }
    //Encodes an object into a format that can be used in a url, also recursive.
    Settings.prototype.urlEscapeObject = function (object) {
        var _this = this;
        object = object || {};
        //Get our objects keys
        var keys = Object.keys(object);
        //Create an array containing a list of encoded strings
        var bufferArray = [];
        keys.forEach(function (key) {
            var value = object[key];
            //If undefined just ignore.
            if (typeof value === typeof undefined)
                return;
            if (value == null)
                return;
            //Change the format depending on the type
            if (Array.isArray(value)) {
                if (!value.length)
                    return;
                value = value.filter(function (b) { return b; }).map(function (b) { return encodeURIComponent(b); }).join(','); //Comma seperate Arrays
            }
            else if (typeof value === "object") {
                var subBuffer = _this.urlEscapeObject(value); //Objects become wrapped subobjects
                if (!subBuffer.length)
                    return;
                value = "(" + subBuffer + ")"; //Wrapping occurs
            }
            else {
                value = "" + value; //Convert to string...
                if (!value.length)
                    return; //Empty string.
            }
            //Append to array!
            bufferArray.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
        });
        //Join with ampersands (They'll be escaped if sub objecting)
        return bufferArray.join('&');
    };
    //Decodes an object from a query string
    Settings.prototype.urlUnescapeObject = function (string) {
        var _this = this;
        var o = {};
        var parts = (string || '').split('&');
        parts.forEach(function (part) {
            var bits = part.split('=');
            var key = bits.shift();
            var value = bits.join('=');
            if (!key || !value)
                return;
            if (value.startsWith("(")) {
                value = value.substring(1, value.length - 1); //Remove brackets
                value = _this.urlUnescapeObject(decodeURIComponent(value)); //Unescape
            }
            else {
                value = decodeURIComponent(value);
                var decodeCrap_1 = function (crap) {
                    crap = crap.split(",").map(function (v) { return decodeURIComponent(v); });
                    if (!crap.length)
                        return;
                    if (crap.length === 1) {
                        crap = crap[0];
                        var fv = parseFloat(crap);
                        if (!isNaN(fv) && isFinite(fv) && crap.replace(/\D/g, '').length === crap.length)
                            return [fv];
                        if (crap === "true")
                            return [true];
                        if (crap === "false")
                            return [false];
                        return [crap];
                    }
                    else {
                        crap = crap.map(function (v) {
                            var nv = decodeCrap_1(v);
                            return nv.length === 1 ? nv[0] : nv;
                        });
                    }
                    return crap;
                };
                value = decodeCrap_1(value);
                if (value.length === 1)
                    value = value[0];
            }
            o[key] = value;
        });
        return o;
    };
    //Takes the current setting (as well as any override object you pass) and
    //returns a url string that can later be decoded and used.
    Settings.prototype.getSettingsUrl = function (overrides) {
        //Check overrides, custom overrides for the internal settings.
        if (!overrides)
            overrides = {};
        //Returns the url for the page, based on current filter settings.
        var x = this.template.getUrl();
        //Fallback Tag support, tag only the first tag from each filter and put them
        //into a nice + array, not exactly the same but close enough for native support
        var tags = [];
        this.template.filters.filters.forEach(function (f) {
            if (!(f instanceof filter_1.TagFilter))
                return;
            if (!f.tags.length)
                return;
            if (f.handle != 'tags')
                return;
            //Check the operation type, if it's AND we may be able to do it the old
            //fashioned way.
            if (f.operation == filter_1.OPERATION_AND) {
                //Awesome, this is an AND Filter, we can be more specific
                tags.push.apply(tags, f.tags);
                return;
            }
            tags.push(f.tags[0]); //Only going to use the first tag.
        });
        //Now remove duplicates
        tags = tags.filter(function (t, i) { return tags.indexOf(t) === i; });
        if (tags.length)
            x += "/" + tags.join('+').toLowerCase(); //Shopify convers the tags to lowercase
        //Query String Parameters
        var params = __assign(__assign({}, this.settings), overrides);
        //Sanitize the url, here we can remove some query settings if we need
        if (params.page && parseInt(params.page) <= 1)
            delete params.page;
        if (params.sort_by && params.sort_by == this.template.sort.getDefaultSortMethod())
            delete params.sort_by;
        delete params.tags;
        if (this.template.modifyUrlParams)
            params = this.template.modifyUrlParams(params);
        //Escape
        var query = this.urlEscapeObject(params);
        if (query.length)
            x += '?' + query; //Append to url
        return x;
    };
    Settings.prototype.getSettingsFromUrl = function (urlString) {
        var _this = this;
        var url = new URL(urlString);
        //Functional Opposite of above.
        var _a = url.search.split('?'), emptyString = _a[0], qs = _a[1];
        var settings = {};
        if (qs && qs.length)
            settings = __assign(__assign({}, settings), this.urlUnescapeObject(qs));
        //Tag the tags from the url
        var _b = url.pathname.split('/'), empty = _b[0], collection = _b[1], myHandle = _b[2], tags = _b[3];
        if (tags && tags.length) {
            settings.tags = tags.split('+').map(function (t) {
                //Find the real tag, since this tag is a handle representation
                if (!t.length)
                    return null;
                var realTag = _this.template.data.allTags.find(function (real) {
                    return pc_slate_tools_1.handlize(real) === t;
                });
                return realTag;
            }).filter(function (t) { return t; });
        }
        return settings;
    };
    Settings.prototype.setSetting = function (key, value) {
        if (!this.hasLoaded)
            return;
        //Update the value, null values are removed
        this.settings[key] = value;
        this.updateHistory();
    };
    Settings.prototype.setSettings = function (settings) {
        if (!this.hasLoaded)
            return;
        //Bulk update settings
        this.settings = __assign(__assign({}, this.settings), settings);
        this.updateHistory();
    };
    Settings.prototype.updateHistory = function () {
        //Update the history
        var h = history || window.history;
        if (!h)
            return;
        h.replaceState(this.settings, "", this.getSettingsUrl());
    };
    Settings.prototype.load = function () {
        this.hasLoaded = true;
        //Attempt to load from the url
        this.settings = this.getSettingsFromUrl(window.location.toString());
    };
    return Settings;
}());
exports.Settings = Settings;
//# sourceMappingURL=Settings.js.map