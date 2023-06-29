"use strict";
exports.__esModule = true;
exports.DiscountSlideFacet = exports.DiscountRangeCheckboxFacet = void 0;
var decorators_1 = require("./../decorators/");
var DiscountFacet_1 = require("./../logic/DiscountFacet");
exports.DiscountRangeCheckboxFacet = decorators_1.decorateCheckboxFacet(decorators_1.decorateRangeFacet(DiscountFacet_1.DiscountFacet));
exports.DiscountSlideFacet = decorators_1.decorateSlideFacet(DiscountFacet_1.DiscountFacet);
//# sourceMappingURL=DiscountFacets.js.map