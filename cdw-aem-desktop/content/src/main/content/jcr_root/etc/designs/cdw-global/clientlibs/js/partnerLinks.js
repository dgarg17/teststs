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
		else {
			window.location=$(this).find(':selected').data('link');
		}
	});
}