var $ = require('jquery');
var _ = require('lodash');

import * as $http from '../../common/modules/http-helper';

var settings,
defaults = {};

function priceSuccess(data) { 
    var template = require('../../../../../templates/product-placement/pricing.hbs'); 

    for(var p=0; p<data.length; p++) {
        $('#price_'+data[p].productCode).html(template(data[p]));
    }
}

function priceFail()
{ 
    console.log("Product Pricing Failure");
}

export function getPrice(options) {
    settings = _.extend({}, defaults, options);

    var data = {
           productIdentifiers: settings.productList
    }

    $http.get('/api/productprice/prices', {"data": data}).then(priceSuccess, priceFail);
}