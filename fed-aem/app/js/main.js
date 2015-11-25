$(function() {
	
	// jQuery UI tabs
	$( "#tabs" ).tabs();
	
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
	
	
	$('.partner-header').click(function() {
		if ($(this).find(".mobileNav").css("display") == "block") {
			//alert("partner header clicked blk");
			togglePartnerMenu();
		}
		
	});

SocialShare.init();	


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
			$('.mobileNav').removeClass('ico-uni52').addClass('ico-uni71');
			$('.partner-menu').slideUp();
			
	}

