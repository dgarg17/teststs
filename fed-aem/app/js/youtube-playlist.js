var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubePlayerAPIReady() {
   // console.log("youtube api ready");
}

function setupYouTubePlaylist() {
	$('.video-thumb:first').addClass('active');
	//$('.video-thumb').append("<div class='arrow-down'></div>");
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
	$(".video-hero-image-container h2").html(element.data("video-headline-text"));
	$(".youtube-playlist-video").attr("src","https://www.youtube.com/embed/" + element.data("video-id") + "?enablejsapi=1&amp;origin=http%3A%2F%2Fwww.cdw.com%3A4502");
	$(".youtube-playlist-video").attr("id",element.data('video-id'));
	$(".youtube-playlist-video").attr("data-tracking-id",element.data('tracking-id'));
	$(".youtube-playlist-video").attr("title",element.data('video-title'));
	$(".youtube-playlist-video").attr("data-video-summary",element.data('video-summary'));
	//$(".youtube-playlist-video").attr("data-video-width",element.data('video-width'));
	//$(".youtube-playlist-video").attr("data-video-size-unit",element.data('video-size-unit'));
	//$(".youtube-playlist-video").attr("data-video-aspect-ratio",element.data('video-aspect-ratio'));
	$(".video-hero-text-container h2").html(element.data('video-headline-text'));
	$(".video-hero-text-container .video-title").html(element.data('video-title'));
	$(".video-hero-text-container .video-summary").html(element.data('video-summary'));
	resizeYouTubePlaylistPlayer();
}

function buildYouTubePlaylistPlayer() {
	var firstVideo = $(".video-thumb").first();
	$('.video-hero').append('<iframe class="youtube-playlist-video" id="' + firstVideo.data('video-id') + '" data-video-id="' + firstVideo.data('video-id') + '" data-video-width="' + firstVideo.data('video-width') + '" data-video-size-unit="' + firstVideo.data('video-size-unit') + '" data-video-aspect-ratio="' + firstVideo.data('video-aspect-ratio') + '" data-tracking-id="' + firstVideo.data('tracking-id') + '" data-video-summary="' + firstVideo.data('video-summary') + '" frameborder="0" allowfullscreen="1" title="' + firstVideo.data('video-title') + '"  src="https://www.youtube.com/embed/' + firstVideo.data('video-id') + '?enablejsapi=1&amp;origin=http%3A%2F%2Fwww.cdw.com%3A4502"></iframe>');
	$(".video-hero-text-container h2").html(firstVideo.data('video-headline-text'));
	$(".video-hero-text-container .video-title").html(firstVideo.data('video-title'));
	$(".video-hero-text-container .video-summary").html(firstVideo.data('video-summary'));
}

function resizeYouTubePlaylistPlayer() {
	$(".video-hero iframe").width($(".video-hero-image-container").width());
	$(".video-hero iframe").height($(".video-hero-image-container").height());
}

if ($(".video-thumb").length && $(".video-thumb").data("video-id")) {
	buildYouTubePlaylistPlayer();
	setupYouTubePlaylist();
}