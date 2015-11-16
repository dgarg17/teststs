
 var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/player_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


function onYouTubePlayerAPIReady() {
   // console.log("youtube ready");
	$(".cdw-youtube-video").each(function(index,value) {
		var width=parseInt($(this).data("video-width"));
		var height;
        console.log("width from AEM "+width);
		if($(this).data("video-size-unit")=="%"){
			width=$(this).parent().width()*(parseInt($(this).data("video-width"))/100);
		//	console.log("width after calculation "+width);
		//	console.log("width of the parent "+$(this).parent().width());
		}
	    height=parseInt(width*parseFloat($(this).data("video-aspect-ratio")));
	    //console.log("height after calcualtion  "+height);
		//var youtubePlayerID = $(this).data("video-id");
		//var trackingId = $(this).data("video-tracking-id");
		new YT.Player(this.id, {
			width: width+"px",
			height:height+"px",
			videoId: $(this).data("video-id"),
			events: {
				'onStateChange': function(event){
					if (event.data == 1) {
					//	console.log("youtube  event change play "+ youtubePlayerID+": "+trackingId);
					//	CdwTagMan.createPageViewTag('Video', 'Video Played | ' + trackingId);
					}
					if (event.data == 0) {
					//	console.log("youtube  event change play "+ youtubePlayerID+ ": "+trackingId) ;
					//	CdwTagMan.createPageViewTag('Video', 'Video Ended | ' + trackingId);
					}
				}
			}
		});
	});
}