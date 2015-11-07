var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubePlayerAPIReady() {
   // console.log("youtube api ready");
}

function setupYouTubePlaylist() {
	$('.video-thumb:first').addClass('active');
	$('.video-thumb').append("<div class='arrow-down'></div>");
	$(".ico-play-circle-o").click(function() {
		$(".video-hero-image-container").hide();
		$(".youtube-playlist-video").show();
	});
	$(".video-thumb").click(function() {
		$(".video-thumb").removeClass("active");
		$(this).addClass("active");
		switchYouTubePlaylist($(this));
	});
	resizeYouTubePlaylistPlayer();
}

function switchYouTubePlaylist(element) {
	$(".youtube-playlist-video").hide();
	$(".video-hero-image-container").show();
	$(".video-hero-image").attr("src",element.data("hero-image"));
	$(".video-hero-image-container h2").html(element.data("video-header-text"));
	$(".youtube-playlist-video").attr("src","https://www.youtube.com/embed/" + element.data("video-id") + "?enablejsapi=1&amp;origin=http%3A%2F%2Fwww.cdw.com%3A4502");
	$(".youtube-playlist-video").attr("id",element.data('video-id'));
	$(".youtube-playlist-video").attr("data-tracking-id",element.data('tracking-id'));
	$(".youtube-playlist-video").attr("title",element.data('video-title'));
	$(".youtube-playlist-video").attr("data-video-summary",element.data('video-summary'));
	resizeYouTubePlaylistPlayer();
}

function resizeYouTubePlaylistPlayer() {
	$(".video-hero iframe").width($(".video-hero-image-container").width());
	$(".video-hero iframe").height($(".video-hero-image-container").height());
}

if ($(".youtube-playlist-player").length > 0 && $(".youtube-playlist-video").data("video-id")) {
	setupYouTubePlaylist();
}