$(document).ready(function() {
		//Initialize custom select drop downs
		$('.product-display .sub-cat-select').each(function() {
			$(this).select2({
				placeholder: $(this).data("secondary-label"),
				minimumResultsForSearch: Infinity
			});
		});
		$('.featured-item .sub-cat-select').each(function() {
			$(this).select2({
				placeholder: $(this).data("secondary-label"),
				minimumResultsForSearch: Infinity
			});
        });
		$('.partner-menu .sub-cat-select').each(function() {
			$(this).select2({
				placeholder: $(this).data("secondary-label"),
				minimumResultsForSearch: Infinity,
				color: "blue"
			});
			/*
			$('.select2-result').each(function() {
				var background-color-result = $(this).parent().css('background-color')
				$(this).css('background-color', background-color-result);
        	});
			*/
        });
		
		$('.select2-arrow').each(function() {
			$(this).append('<i class="ico ico-down-arrow"></i>');
		});
		$(".partner-links").change(function() {
      		$(this).prev("div.partner-links").children(".select2-choice").children(".select2-chosen").text($(this).data("secondary-label"));
    	});
	});