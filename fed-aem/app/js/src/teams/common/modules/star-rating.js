var $ = require('jquery');
var _ = require('lodash');

var settings, 
	defaults = {
	"container": ".star-rating",
	"stars": 5,
};

function buildStars() {
	var html = '<div class="star-bg"></div><div class="stars">';
	
	for(var s=0; s<settings.stars; s++) {
		html+= '<i class="ico-star-cutout"></i>';
	}
	
	html+= '</div>';
	
	return html;
}

function getBgWidth($el) {
	var rating = $el.data('rating'),
		starWidth = $el.find('.stars > i:eq(0)').width(),
		spacing = 0,
		fullStars = Math.floor(rating);
		
		return rating * starWidth + ((settings.stars - fullStars) * spacing) ;
			
}

export function init(options) {
	settings = _.extend({}, defaults, options);
	
	$(settings.container).each(function() {
		$(this).html(buildStars());
		
		$(this).find('.star-bg').css('width', getBgWidth($(this)));
	});
}