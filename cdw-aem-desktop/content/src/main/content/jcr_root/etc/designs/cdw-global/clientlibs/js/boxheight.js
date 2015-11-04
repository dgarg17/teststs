$(document).ready(function(){

	resizeMultiupBoxes();
	
	$(window).resize(function() {
		resizeMultiupBoxes();
<<<<<<< HEAD
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
=======
	});
	
});

var resizeMultiupBoxes = function() {

	$(".-box-height").each(function() {
		$(this).parent().parent().parent().addClass("-box-height-container");
        //var theHeight = $(this).parent().parent().height();
       // alert(theHeight);
	});

	$(".-box-height-container").each(function() {

        	var maxHeight = 0;
            $(this).children().each(function() {
				if ($(this).children().children().height() > maxHeight) {
					maxHeight = $(this).children().children().height();
                }
            });
            $(this).children().each(function() {
            	if ($(this).children().children(".-box-height").hasClass("youtube-wrapper")) {
					$(this).children().children(".-box-height").children().height(maxHeight+39);
                }
                else {
					$(this).children().children(".-box-height").height(maxHeight);
                }
            });


	});

	
	
>>>>>>> develop
}

var alignButtons = function() {



<<<<<<< HEAD
}



=======
}
>>>>>>> develop
