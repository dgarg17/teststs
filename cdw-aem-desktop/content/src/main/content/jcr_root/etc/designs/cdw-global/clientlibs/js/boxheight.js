$(function() {

	resize2upBoxes();

	$(window).resize(function() {
		
		resize2upBoxes();

	});

});

var resize2upBoxes = function() {
	var $fixHeight = $('.layout .layout-6 .content-container-item').parent();
	$fixHeight.each(function() {
		if ($(window).width() > 734) {
			$(this).css('height', $(this).parents('.layout').height());
			$(this).find('.content-container-item').css('height', $(this).parents('.layout').height() - 20);
		}
		else {
			$(this).css('height', '');
			$(this).find('.content-container-item').css('height', '');
		}
	});
}