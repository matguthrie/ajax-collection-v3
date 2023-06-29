"use strict";
exports.__esModule = true;
exports.Sorter = void 0;
var Sorter = /** @class */ (function () {
    function Sorter(template) {
        this.template = template;
    }
    Sorter.prototype.onUpdate = function () { };
    Sorter.prototype.getOptionName = function (value, checked) {
        return this.template.escape(value.name);
    };
    return Sorter;
}());
exports.Sorter = Sorter;
//# sourceMappingURL=Sorter.js.map