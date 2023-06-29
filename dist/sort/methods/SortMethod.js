"use strict";
exports.__esModule = true;
exports.getVariantPosition = exports.getCollectionPosition = exports.SortMethod = void 0;
//Provides the basis for all sort methods. Do not export this as part of the
//list of sort methods!!
exports.SortMethod = {
    isVisible: function (template) { return true; },
    sort: function (collection, variants) { return variants; },
    reverse: false
};
//Returns the index of the PRODUCT (not variant) within the collection
exports.getCollectionPosition = function (collection, variant) {
    var handles = collection.data.productHandles || [];
    if (collection.data.pageData && collection.data.pageData[1]) {
        handles = collection.data.pageData[1].all_product_handles || handles;
    }
    var index = handles.indexOf(variant.product.handle);
    if (index === -1)
        return handles.length;
    return index;
};
//Returns the index of the variant within it's product
exports.getVariantPosition = function (variant) {
    for (var i = 0; i < variant.product.variants.length; i++) {
        if (variant.product.variants[i].id !== variant.id)
            continue;
        return i;
    }
    return -1;
};
//# sourceMappingURL=SortMethod.js.map