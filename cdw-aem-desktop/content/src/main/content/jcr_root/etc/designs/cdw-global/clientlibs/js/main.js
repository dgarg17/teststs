$(function() {
	/* Partner Solution Nav */
	$('header').find('.nav-collapsed').on('click', function() {
		$(this).next('.nav').slideToggle(300);
	});
	$(window).resize(function() {
		$('header').find('.nav').css('display','');
		if ($(window).width() > 970) {
			$('.partner-menu').show().css('display', '');
		}
	});

	//Partner Solution Nav Mobile Menu
	$('.partner-header').on('click', '.mobileNav', togglePartnerMenu);
	
	
});

//Pin Partner Nav to top on scoll
$(window).scroll(function () {
    if ($(window).scrollTop() > $('.partner-header-wrapper').offset().top) {
        $('.partner-header').addClass('stick');
    } else {
        $('.partner-header').removeClass('stick');
    }
});

var togglePartnerMenu = function() {
	switch ($('.partner-menu').is(':visible')) {
		case true:
			$('.mobileNav').removeClass('ico-uni52').addClass('ico-uni71');
			$('.partner-menu').slideUp();
			break;
		case false:
			$('.mobileNav').removeClass('ico-uni71').addClass('ico-uni52');
			$('.partner-menu').slideDown();
			break;
	}
}
