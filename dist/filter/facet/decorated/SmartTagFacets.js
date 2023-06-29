"use strict";
exports.__esModule = true;
exports.SmartTagSwatchFacet = exports.SmartTagSelectFacet = exports.SmartTagButtonFacet = exports.SmartTagCheckboxFacet = void 0;
var decorators_1 = require("./../decorators/");
var logic_1 = require("./../logic/");
exports.SmartTagCheckboxFacet = decorators_1.decorateCheckboxFacet(logic_1.SmartTagFacet);
exports.SmartTagButtonFacet = decorators_1.decorateButtonFacet(logic_1.SmartTagFacet);
exports.SmartTagSelectFacet = decorators_1.decorateSelectFacet(logic_1.SmartTagFacet);
exports.SmartTagSwatchFacet = decorators_1.decorateSwatchFacet(logic_1.SmartTagFacet);
//# sourceMappingURL=SmartTagFacets.js.map