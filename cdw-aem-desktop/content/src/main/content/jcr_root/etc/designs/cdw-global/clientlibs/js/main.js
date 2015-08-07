$(function() {
	/* Petite Header */
	$('header').find('.nav-collapsed').on('click', function() {
		$(this).next('.nav').slideToggle(300);
	});
	$(window).resize(function() {
		$('header').find('.nav').css('display','');
	});
});