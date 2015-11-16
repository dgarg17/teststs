var $ = require('jquery');
var jQueryDialog = require('jquery-ui/dialog');
var handlebars = require('handlebars/runtime');
var _ = require('lodash');

import * as HandleBarsHelpers from './modules/handlebars-helpers';
import * as productPlacement from './modules/product-placement';
import * as socialShare from './modules/social-share';

/* Variables */
window.CDW = {};

CDW.productPlacement = productPlacement; 

$(function() {
	//Social Share
    socialShare.init();

});