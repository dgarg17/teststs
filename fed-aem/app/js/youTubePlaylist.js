var youtubePlaylist = function (thisPlayer) {
	this.buildPlayer(thisPlayer);
	this.setupPlayer(thisPlayer);
};

youtubePlaylist.prototype.buildPlayer = function(thisPlayer) {
	var firstVideo = thisPlayer.find(".video-thumb").first();
	var globalVideoSettings = thisPlayer.find(".global-video-settings");
	$('.video-hero').append('<iframe class="youtube-playlist-video" id="' + firstVideo.data('video-id') + '" data-video-id="' + firstVideo.data('video-id') + '" data-video-width="' + globalVideoSettings.data('video-width') + '" data-video-size-unit="' + globalVideoSettings.data('video-size-unit') + '" data-video-aspect-ratio="' + globalVideoSettings.data('video-aspect-ratio') + '" data-tracking-id="' + firstVideo.data('tracking-id') + '" data-video-summary="' + firstVideo.data('video-summary') + '" frameborder="0" allowfullscreen="1" title="' + firstVideo.data('video-title') + '"  src="https://www.youtube.com/embed/' + firstVideo.data('video-id') + '?enablejsapi=1&amp;origin=http%3A%2F%2Fwww.cdw.com%3A4502"></iframe>');
	$(".video-hero-text-container h2").html(firstVideo.data('video-headline-text'));
	$(".video-hero-text-container .video-title").html(firstVideo.data('video-title'));
	$(".video-hero-text-container .video-summary").html(firstVideo.data('video-summary'));
}

youtubePlaylist.prototype.formatUrl = function(url) {
	return "https://www.youtube.com/embed/" + url + "?enablejsapi=1&amp;origin=http%3A%2F%2Fwww.cdw.com%3A4502";
}

youtubePlaylist.prototype.resizePlayer = function(thisPlayer) {
	thisPlayer.find(".video-hero iframe").width($(".video-hero-image-container").width());
	thisPlayer.find(".video-hero iframe").height($(".video-hero-image-container").height());
}

youtubePlaylist.prototype.setupPlayer = function(thisPlayer) {
	var that = this;
	thisPlayer.find('.video-thumb').first().addClass('active');
	$(".ico-play-circle-o").click(function() {
		thisPlayer.find(".video-hero-image-container").hide();
		thisPlayer.find(".youtube-playlist-video").show();
	});
	$(".video-thumb").click(function() {
		thisPlayer.find(".video-thumb").removeClass("active");
		$(this).addClass("active");
		that.swapPlayer($(this),thisPlayer);
	});
	this.resizePlayer(thisPlayer);
}

youtubePlaylist.prototype.swapPlayer = function(element, thisPlayer) {
	thisPlayer.find(".youtube-playlist-video").hide();
	thisPlayer.find(".video-hero-image-container").show();
	
	// Set Background Image
	thisPlayer.find(".video-hero-image").attr("src",element.data("hero-image"));
	
	// Set Data Attributes
	thisPlayer.find(".youtube-playlist-video").attr("src",this.formatUrl(element.data("video-id")));
	thisPlayer.find(".youtube-playlist-video").attr("id",element.data('video-id'));
	thisPlayer.find(".youtube-playlist-video").attr("title",element.data('video-title'));
	thisPlayer.find(".youtube-playlist-video").attr("data-tracking-id",element.data('tracking-id'));
	
	
	// Set HTML Contents
	var htmlElements = ["video-headline-text","video-title","video-summary"];
	for (var i=0; i<htmlElements.length; i++) {
		if (element.data(htmlElements[i])) {
			thisPlayer.find(".video-hero-text-container ." + htmlElements[i]).html(element.data(htmlElements[i]));
		}
		else {
			thisPlayer.find(".video-hero-text-container ." + htmlElements[i]).html("");
		}
	}

	this.resizePlayer(thisPlayer);
}

// Check that the element is found and has data, then instantiate
/*
if ($(".video-thumb").length && $(".video-thumb").data("video-id")) {
	var youtubePlaylist1 = new youtubePlaylist();
}
*/

var youtubePlaylistPlayer = [];

$.each($(".youtube-playlist-player"), function(index, value) {
	if ($(this).find($(".video-thumb")).data("video-id")) {
		youtubePlaylistPlayer[index] = new youtubePlaylist($(this));
	}
});
