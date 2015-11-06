
 var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/player_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);




function onYouTubePlayerAPIReady() {
   // console.log("youtube ready");
   
   //alert("youtube api is ready");
  
   
   
   
   
   

}

function setupYouTubePlaylist() {
	
	$(".ico-play-circle-o").click(function() {
		$(".video-hero-image-container").hide();
		$(".youtube-playlist-video").show();
	});

}

setupYouTubePlaylist();