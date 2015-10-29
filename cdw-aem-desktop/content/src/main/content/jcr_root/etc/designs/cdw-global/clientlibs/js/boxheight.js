$(document).ready(function(){

	resizeMultiupBoxes();
	
	$(window).resize(function() {
		resizeMultiupBoxes();
	});
	
});

var resizeMultiupBoxes = function() {

	var $fixHeight = $('.-box-height').parent();
	$fixHeight.each(function() {
		$fixHeight.css('height', '').find('.-box-height').css('height', '');
	});
	$fixHeight.promise().done(function() {
		if ($(window).width() > 735) {
			$(this).find('.-box-height').css('height', $(this).parents('.layout').height() - 50);
			$(this).find('.cdw-youtube-video').css('height', $(this).parents('.layout').height() - 20);
			$(this).find('.media iframe').css('height', $(this).parents('.layout').height() - 20);
			$(this).css('height', $(this).parents('.layout').height());
		}
		else {
			$(this).css('height', '').find('.-box-height').css('height', '');
		}
	});
}

var alignButtons = function() {



}



