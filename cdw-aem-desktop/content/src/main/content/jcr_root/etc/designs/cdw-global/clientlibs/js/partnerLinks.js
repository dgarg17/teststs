$(document).ready(function(){
	partnerLinks();
});

var partnerLinks = function() {
	$(".partner-links").change(function() {


		if(!($(this).find(':selected').data('change')==null)){
			eval($(this).find(':selected').data('change'));
		}

		if ($(this).find(':selected').data('target') == "_blank") {
			window.open($(this).find(':selected').data('link'),'_blank');
		}
		else if($(this).find(':selected').data('target') == "_model"){
		console.log("javascript from model "+$(this).find(':selected').data('eventtype') +" "+$(this).find(':selected').data('modeltaggingdata') );
			cdwModal.open($(this).find(':selected').data('link') , $(this).find(':selected').data('eventtype'), $(this).find(':selected').data('modeltaggingdata'));
			console.log("javascript from model after "+$(this).find(':selected').data('eventtype') +" "+$(this).find(':selected').data('modeltaggingdata') );
		}else{
		window.location=$(this).find(':selected').data('link');
		}
	});
}