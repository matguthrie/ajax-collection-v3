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
exports.TypeFacet = void 0;
var __1 = require("./../");
var TypeFacet = /** @class */ (function (_super) {
    __extends(TypeFacet, _super);
    function TypeFacet(params) {
        var _this = _super.call(this, params) || this;
        var multiple = params.multiple;
        _this.multiple = typeof multiple !== typeof undefined ? multiple : true;
        return _this;
    }
    TypeFacet.prototype.getOptions = function () {
        return this.template.data.allTypes || [];
    };
    TypeFacet.prototype.setOption = function (o, v) {
        if (this.multiple) {
            return _super.prototype.setOption.call(this, o, v);
        }
        else {
            if (this.isOptionAll(o))
                this.setOptions(null);
            this.setOptions(v ? [o] : null);
        }
    };
    return TypeFacet;
}(__1.Facet));
exports.TypeFacet = TypeFacet;
//# sourceMappingURL=TypeFacet.js.map