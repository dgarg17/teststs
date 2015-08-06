$(function() {
	/* Petite Header */
	$('header').find('.nav-collapsed').on('click', function() {
		$(this).next('.nav').slideToggle(300);
	});
});