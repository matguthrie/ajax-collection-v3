"use strict";
exports.__esModule = true;
exports.PriceSlideFacet = exports.PriceRangeCheckboxFacet = exports.PriceRangeFacet = void 0;
var PriceFacet_1 = require("../logic/PriceFacet");
var decorators_1 = require("./../decorators");
exports.PriceRangeFacet = decorators_1.decorateRangeFacet(PriceFacet_1.PriceFacet);
exports.PriceRangeCheckboxFacet = decorators_1.decorateCheckboxFacet(exports.PriceRangeFacet);
exports.PriceSlideFacet = decorators_1.decorateSlideFacet(PriceFacet_1.PriceFacet);
//# sourceMappingURL=PriceFacets.js.map