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
			});
        });
		$('.cdw-multi-button .sub-cat-select').each(function() {
			$(this).select2({
				placeholder: $(this).data("secondary-label"),
				minimumResultsForSearch: Infinity,
			});
        });
		
		$('.select2-arrow').each(function() {
			$(this).append('<i class="ico ico-down-arrow"></i>');
		});
		$(".partner-links").change(function() {
      		$(this).prev("div.partner-links").children(".select2-choice").children(".select2-chosen").text($(this).data("secondary-label"));
    	});
	});