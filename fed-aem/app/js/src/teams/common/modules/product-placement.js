var $ = require('jquery');
var _ = require('lodash');
var Handlebars = require('handlebars/runtime');

//import * as starRating from '../../common/modules/star-rating';
import * as productPricing from '../../common/modules/product-pricing';

var settings,
defaults = {};

/* Home Placement */
function typeHome() {
	window.R3_HOME = new r3_home();
}

/* Search Placement */
function typeSearch() {
	window.R3_SEARCH = new r3_search();
	R3_SEARCH.setTerms(settings.dataType.terms);
	
	// for each item (LIMIT of 15) on the search page, iterate over the list with the following setter:
	for(var i=0; i<settings.typeData.id.length; i++) {
		R3_SEARCH.addItemId(settings.typeData.itemId[i]); // if item has parent id, pass the parent id
	}
}

/* Category Placement */
function typeCategory() {
	window.R3_CATEGORY = new r3_category();
	R3_CATEGORY.setId(settings.typeData.categoryId); // category id must match a category id as passed in catalog feed
	R3_CATEGORY.setName(settings.typeData.categoryName); // category name as it should be displayed to customers, overrides the value provided in the catalog feed for this category id
	// provide product id’s for items displayed on the category page (LIMIT of 15). Use the following line of code for each product id.
	for(var i=0; i<settings.typeData.id.length; i++) {
		R3_COMMON.addItemId(settings.typeData.itemId[i]); // if item has parent id, pass the parent id
	}
}

/* Item Placement */
function typeItem() {
	window.R3_ITEM = new r3_item();
	R3_ITEM.setId(settings.typeData.itemId[0]);
	R3_ITEM.setName(settings.typeData.name);
	
	if (settings.typeData.brand) {
		R3_ITEM.setBrand(settings.typeData.brand);
	}
	//R3_ITEM.addCategory('I0','Video Conferencing');
};

/* Personal Placement */
function typePersonal() {
	window.R3_PERSONAL = new r3_personal();
}

/* Brand Placement */
function typeBrand() {
	R3_COMMON.setPageBrand(settings.typeData.brand);
	window.R3_BRAND = new r3_brand();
}

/* AddToCart Placement */
function typeAddToCart() {
	R3_COMMON.addCategoryHintId(settings.typeData.categoryId);

	window.R3_ADDTOCART = new r3_addtocart();
	R3_ADDTOCART.addItemIdToCart(settings.typeData.itemId[0]);
}

/* Cart Placement */
function typeCart() {
	window.R3_CART = new r3_cart();
	for(var i=0; i<settings.typeData.itemId.length; i++) {
		R3_CART.addItemId(settings.typeData.itemId[i]); // iterate over this line for each item in the cart
	}
}

/* Purchased Placement */
function typePurchased() {
	window.R3_PURCHASED = new r3_purchased();
	R3_PURCHASED.setOrderNumber(settings.typeData.orderNumber);
	
	var cartItems = settings.typeData.cartItems;
	for(var i=0; i<cartItems.length; i++) {
		R3_PURCHASED.addItemIdPriceQuantity(cartItems[i].id, cartItems[i].price, cartItems[i].qty);
	}
}

/* Error Placement */
function typeError() {
	window.R3_ERROR = new r3_error();
}

function typeSpecific() { 
	switch(settings.type) {
	    case "home":
	        	typeHome();
	        break;
		case "search":
	        	typeSearch();
	        break;
		case "category":
	        	typeCategory();
	        break;
		case "item":
	        	typeHome();
	        break;	
	    case "personal":
	        	typePersonal();
	        break;
		case "brand":
	        	typeBrand();
	        break;
		case "addToCart":
	        	typeAddToCart();
	        break;
		case "cart":
	        	typeCart();
	        break;
		case "purchased":
	        	typePurchased();
	        break;
		case "error":
	        	typeError();
	        break;
	    default:
	    	typeItem();
	}
};

function addPlacements(placements) {
	for(var p=0; p<placements.length; p++) {
		R3_COMMON.addPlacementType(placements[p]);
	}
}

function initRR() {
  
	window.R3_COMMON = new r3_common();
	
	R3_COMMON.setApiKey(settings.apiKey);
	R3_COMMON.setBaseUrl(settings.baseUrl);
	R3_COMMON.setClickthruServer(window.location.protocol + '//' + window.location.host);
	R3_COMMON.setSessionId(settings.sessionId);
	R3_COMMON.setUserId(settings.userId);
	//R3_COMMON.addClickthruParams(0,'RecommendedForEDC=00000001&RecoType=RH&cm_sp=homepage-_-WaysToShop&ProgramIdentifier=3');
	
	addPlacements(settings.placements);
	
	typeSpecific();
	
	rr_flush_onload();
	
	r3(); // make sure your callback function has been defined before you make this call
}

function addStar() { 
	$(".product-placement .rr-product-frame").each(function() {
        var reviews = $(this).find("span.reviews").length;
        if (reviews) {
            // update/insert image path for star rating
            var imagePath = "//img.cdw.com/assets/stars/rating-";
            var rating = $(this).find("img.starImage").attr("data-rating").replace(".", "_");
            imagePath = imagePath + rating + ".png";
            $(this).find("img.starImage").attr("src", imagePath);
        } 
    });
}

function buildPlacement(data) { 
    var template = require('../../../../../templates/product-placement/richrelevance.hbs'),
        productList = [];
	
    for(var p=0; p<data.length; p++) {
        $('.product-placement[data-placement="'+data[p].placement_name+'"]').append(template(data[p]));
		
        for(var i=0; i < data[p].items.length; i++) {
            if (data[p].items[i].id) {
                productList.push(data[p].items[i].id);
            }
        }
    }

	productPricing.getPrice({ 
	    "productList": productList
	});

    //starRating.init();
	addStar(); //Temporary function to do stars the old way

    //Add Compare
	window.$('.product-placement .rrProductsWrapper').compareCheckboxes({
	    //"showCompare": true
	});

    //Scrollable
    window.$('.product-placement .scrollable').scrollableRecoPanel();

}

export function init(options) {
	settings = _.extend({}, defaults, options);
	RR.jsonCallback = function() {
		buildPlacement(RR.data.JSON.placements);
	};
	        			
	initRR();
}