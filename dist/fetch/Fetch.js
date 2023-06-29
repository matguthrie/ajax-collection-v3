"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.Fetch = void 0;
var pc_slate_tools_1 = require("@process-creative/pc-slate-tools");
var Errors = require("./../error/Errors");
var Fetch = /** @class */ (function () {
    function Fetch(template) {
        this.template = template;
        this.lastFetch = 0;
        this.isFetchRunning = false;
        this.isFetchPending = false;
    }
    Fetch.prototype.getNextPageToFetch = function () {
        //Determines the next page that should be fetched
        var currentPage = 1;
        var expectedPages = Math.ceil(this.template.data.productCount / this.template.perPage);
        //Now check each pageData
        for (var i = currentPage; i <= expectedPages; i++) {
            var pd = this.template.data.pageData[i];
            if (!pd || !pd.products || !pd.products.length)
                return i;
        }
        //We've fetched future pages, fetch past pages
        for (var i = 1; i <= expectedPages; i++) {
            var pd = this.template.data.pageData[i];
            if (!pd || !pd.products || !pd.products.length)
                return i;
        }
        //We've fetched all pages?
        this.lastFetchedPage = (this.lastFetchedPage || 0) + 1;
        if (this.lastFetchedPage > expectedPages + 1) {
            this.forceStopFetching = true;
            this.lastFetchedPage = 1;
        }
        return this.lastFetchedPage;
    };
    //Returns true if ALL the data has been fetched and stored in the data
    Fetch.prototype.isDataFetched = function () {
        var _this = this;
        if (this.forceStopFetching)
            return true;
        var _a = this.template.data, productCount = _a.productCount, products = _a.products;
        if (!productCount && !products.length)
            return true; //Check incase there are no products to fetch at all.
        return products.filter(function (p) {
            return _this.template.data.isProductInCollection(p);
        }).length >= productCount;
    };
    Fetch.prototype.fetch = function (page) {
        return __awaiter(this, void 0, void 0, function () {
            var now, diff, fetch_1, qsp_1, data, e_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        now = new Date().getTime();
                        diff = now - this.lastFetch;
                        if (!((now - diff) < 750)) return [3 /*break*/, 2];
                        //we haven't even passed 750ms since the last fetch.. let's wait a minute
                        this.isFetchPending = true;
                        console.log('Delaying 750ms...');
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                setTimeout(function () { return resolve(); }, 750);
                            })];
                    case 1:
                        _a.sent();
                        console.log('Delay over');
                        this.isFetchPending = false;
                        now = new Date().getTime();
                        _a.label = 2;
                    case 2:
                        this.isFetchRunning = true;
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        fetch_1 = this.template.getShopifyFetch(page);
                        //This is for my own sanity, I want to make sure we're preserving the 
                        //QS Params for theme previews.
                        fetch_1.params = fetch_1.params || {};
                        qsp_1 = pc_slate_tools_1.getQueryParams();
                        ['key', 'preview_theme_id'].forEach(function (k) { return fetch_1.params[k] = fetch_1.params[k] ? fetch_1.params[k] : qsp_1[k]; });
                        return [4 /*yield*/, pc_slate_tools_1.shopifyGet(fetch_1.url, fetch_1.params)];
                    case 4:
                        data = _a.sent();
                        this.template.data.loadCollectionJSON(data); //Load into our data store
                        this.template.filters.onProductsFetched();
                        this.template.pagination.onProductsFetched();
                        this.template.onProductsFetched(data); //Fire event
                        this.template.draw.queueDraw(); //Queue a draw..
                        this.lastFetch = now;
                        this.isFetchRunning = false;
                        return [2 /*return*/, data];
                    case 5:
                        e_1 = _a.sent();
                        console.error(Errors.FETCH_FAILED);
                        console.error(e_1);
                        this.lastFetch = now;
                        setTimeout(function () { return _this.fetchAndNext(); }, 1000);
                        this.template.cache.clearProductCache();
                        this.isFetchRunning = false;
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Fetch.prototype.fetchAndNext = function (page) {
        var _this = this;
        if (this.isDataFetched()) {
            console.log('Finished fetching all data.');
            return;
        }
        page = page || this.getNextPageToFetch();
        this.fetch(page).then(function (e) { return _this.fetchAndNext(); });
    };
    Fetch.prototype.start = function () {
        var _this = this;
        //Start by fetching page 1.
        this.fetch(1).then(function (data) { return _this.fetchAndNext(); });
    };
    return Fetch;
}());
exports.Fetch = Fetch;
//# sourceMappingURL=Fetch.js.map