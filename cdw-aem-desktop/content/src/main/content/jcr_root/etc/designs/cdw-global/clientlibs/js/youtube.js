function onYouTubePlayerAPIReady() {
	$(".cdw-youtube-video").each(function(index,value) {
		var youtubePlayerID = $(this).data("video-id");
		new YT.Player(this.id, {
			width: $(this).data("video-width"),
			height: $(this).data("video-height"),
			videoId: $(this).data("video-id"),
			events: {
				'onStateChange': function(event){
					if (event.data == 1) {
						CdwTagMan.createPageViewTag('Video', 'Video Played | ' + youtubePlayerID);
					}
					if (event.data == 0) {
						CdwTagMan.createPageViewTag('Video', 'Video Ended | ' + youtubePlayerID);
					}
				}
			}
		});
	});
}