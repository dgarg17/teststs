
 var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/player_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


function onYouTubePlayerAPIReady() {
console.log("youtube ready");
	$(".cdw-youtube-video").each(function(index,value) {

		var youtubePlayerID = $(this).data("video-id");
		var trackingId = $(this).data("video-tracking-id");
		console.log("youtube  video "+ youtubePlayerID+":"+trackingId);
		new YT.Player(this.id, {
			width: $(this).data("video-width"),
			height: $(this).data("video-height"),
			videoId: $(this).data("video-id"),
			events: {
				'onStateChange': function(event){
					if (event.data == 1) {
						console.log("youtube  event change play "+ youtubePlayerID+": "+trackingId);
						CdwTagMan.createPageViewTag('Video', 'Video Played | ' + trackingId);
					}
					if (event.data == 0) {
						console.log("youtube  event change play "+ youtubePlayerID+ ": "+trackingId) ;
						CdwTagMan.createPageViewTag('Video', 'Video Ended | ' + trackingId);
					}
				}
			}
		});
	});
}