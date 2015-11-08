function setupScrollTriggers(scrollTriggers, scrollPageTitle, autoAddNav) {
	var windowHeight = $(window).height();
	var windowScroll = $(window).scrollTop();
	
	var scrollTriggerTop = [];
	var scrollTriggerState = [];
	
	// Automatically add solutions template side nav items
	if (autoAddNav == 1) {
		$(".target_side_nav").each(function() { 
			scrollTriggers.push([$(this).text(),"#" + $(this).attr("id")]);
		});
	}
	
	// Set all triggered states to 0 & set all trigger heights
	for (i=0; i<scrollTriggers.length; i++) {
		if ($(scrollTriggers[i][1]).length) {
			scrollTriggerTop[i] = $(scrollTriggers[i][1]).offset().top - windowHeight;
			scrollTriggerState[i] = 0;
		}
	}
	
	// Trigger all tagging on page load if page is already scrolled down
	for (i=0; i<scrollTriggers.length; i++) {
		if (windowScroll >= scrollTriggerTop[i] && scrollTriggerState[i] == 0) {
			fireTagging(scrollTriggers[i][0],i);
		}
	}

	window.onscroll = function (e) {  
		// Trigger tagging when document is scrolled to trigger height
		for (i=0; i<scrollTriggers.length; i++) {
			if ($(document).scrollTop() >= scrollTriggerTop[i] && scrollTriggerState[i] == 0) {
				fireTagging(scrollTriggers[i][0],i);
			}
		}
	}
	
	function fireTagging(tagName, tagNumber) {
		CdwTagMan.createElementPageTag(scrollPageTitle, scrollTriggers[tagNumber][0].substring(0, 49));
		//console.log("Tagging: " + scrollTriggers[tagNumber][0]);
		scrollTriggerState[tagNumber] = 1;
	}
	
}