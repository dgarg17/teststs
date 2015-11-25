var openModal = function (o) {
	// No Constructor
};

openModal.prototype.open = function(url, ensightenEventType, ensightenEventData) {
	var self = this;
	var width = 800;
	var height = 600;

	if (typeof CdwTagMan !== 'undefined' && ensightenEventData.length > 0) {
		if (ensightenEventType == 'pEvent') {
			CdwTagMan.createPromotionTag('Site Promotion', ensightenEventData);
		}
		else {
			CdwTagMan.createElementPageTag(window.cdwTagManagementData.page_name, ensightenEventData);
		}
	}
	
	$.ajax({
		url: url,
		context: document.body
	}).done(function(content) {
		$('body').append('<div class="modal-overlay"><div class="modal-inner"></div></div>');
		$(".modal-inner").html(content);
		$(".modal-overlay").prepend("<i class='close-button ico-x'></i>");
		self.resize(width,height);
		self.setupClickHandlers();
	}).error(function() {
		$('body').append('<div class="modal-overlay"><div class="modal-inner"></div></div>');
		$(".modal-inner").html("<div class='error-message'>Page not found.</div>");
		$(".modal-overlay").prepend("<i class='close-button ico-x'></i>");
		self.resize(width,height);
		self.setupClickHandlers();
	});
	
	$(window).resize(function() {
		self.resize(width,height);
	});
}

openModal.prototype.resize = function(width, height) {
	if (width < $(window).width()) {
		$(".modal-inner").width(width);
	}
	else {
		$(".modal-inner").width($(window).width() - 50);
	}
	
	if (height < $(window).height()) {
		$(".modal-inner").height(height);
	}
	else {
		$(".modal-inner").height($(window).height() - 50);
	}
	$(".modal-inner").css('top',($(window).height() - $(".modal-inner").height()) / 2);
	this.positionCloseButton();
}

openModal.prototype.positionCloseButton = function(width, height) {
	$(".modal-overlay .close-button").css('top',($(window).height() - $(".modal-inner").height()) / 2 + 0);
	$(".modal-overlay .close-button").css('left',(($(window).width() / 2) + ($(".modal-inner").width() / 2) + 5));
}

openModal.prototype.setupClickHandlers = function() {
	$(".close-button").click(function(e) {
		$(".modal-overlay").remove();
	});
	$(".modal-overlay").click(function(e) {
		$(".modal-overlay").remove();
	});
	$(".modal-inner").click(function(e) {
		e.stopPropagation();
	});
}

var cdwModal = new openModal();