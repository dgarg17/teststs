
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
		console.log("youtube  video  width "+ $(this).data("video-width")+$(this).data("video-size-unit"));
		console.log("youtube  video  height "+ parseInt(parseInt($(this).data("video-width"))*parseFloat($(this).data("video-aspect-ratio")))+$(this).data("video-size-unit"));
		new YT.Player(this.id, {
			//width: $(this).data("video-width")+$(this).data("video-size-unit"),
			//width: $(this).data("video-width")+$(this).data("video-size-unit"),
			//height: parseInt(parseInt($(this).data("video-width"))*parseFloat($(this).data("video-aspect-ratio")))+$(this).data("video-size-unit"),
			height: "600px",
			videoId: $(this).data("video-id"),
			events: {
				'onStateChange': function(event){
					if (event.data == 1) {
						console.log("youtube  event change play "+ youtubePlayerID+": "+trackingId);
					//	CdwTagMan.createPageViewTag('Video', 'Video Played | ' + trackingId);
					}
					if (event.data == 0) {
						console.log("youtube  event change play "+ youtubePlayerID+ ": "+trackingId) ;
					//	CdwTagMan.createPageViewTag('Video', 'Video Ended | ' + trackingId);
					}
				}
			}
		});
	});
}