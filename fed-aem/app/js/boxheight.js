$(document).ready(function(){

	//resizeMultiupBoxes();
	
	$(window).resize(function() {
		resizeMultiupBoxes();
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

	
	
}

var alignButtons = function() {



}
