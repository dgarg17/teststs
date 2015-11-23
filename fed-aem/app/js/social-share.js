var SocialShare = ( function( window, undefined ) {
	
	var defaults = {
		container: $('#social-share'),
		networks: ['twitter', 'facebook', 'linkedin', 'spiceworks'],
		networkDefs: {
			facebook: { url: 'http://www.facebook.com/sharer/sharer.php?s=100&p=|u|' },
			twitter: { url: 'https://twitter.com/intent/tweet?text=|d|&url=|u|&via=|v|' },
			linkedin: { url: 'http://www.linkedin.com/shareArticle?mini=true&url=|u|?&title=|t|&summary=|d|&source=|u|' },
			in1: { url: 'http://www.in1.com/cast?u=|u|', w: '490', h: '529' },
			tumblr: { url: 'http://www.tumblr.com/share?v=3&u=|u|' },
			digg: { url: 'http://digg.com/submit?url=|u|&title=|t|' },
			googleplus: { url: 'https://plusone.google.com/_/+1/confirm?hl=en&url=|u|' },
			reddit: { url: 'http://reddit.com/submit?url=|u|' },
			pinterest: { url: 'http://pinterest.com/pin/create/button/?url=|u|&media=&description=|d|' },
			posterous: { url: 'http://posterous.com/share?linkto=|u|&title=|t|' },
			stumbleupon: { url: 'http://www.stumbleupon.com/submit?url=|u|&title=|t|' },
			email: { url: 'mailto:?subject=|t|' },
			spiceworks: { url: 'http://community.spiceworks.com/info/login?from=popup&href=|u|&referer=/info/addlink&utm_campaign=spice&utm_medium=dynamic&utm_source=|u|' }
		},
		theme: 'round',
		twitterHandle: 'CDWCorp' 
	};
    
    var settings,
        $container,
        shareUrl = $(document).find('meta[property="og:url"]').attr("content") || window.location,
        shareTitle = $(document).find('meta[property="og:title"]').attr("content") || "",
        shareDesc = $(document).find('meta[property="og:description"]').attr("content") || "",
        shareImage = $(document).find('meta[property="og:image"]').attr("content") || "",
        siteName = $(document).find('meta[property="og:site_name"]').attr("content") || "";
	
	function buildShares() {
		var u = encodeURIComponent(shareUrl),
			t = encodeURIComponent(shareTitle.replace('|', '')),
			d = encodeURIComponent(shareDesc.substring(0, 250)),
			p = encodeURIComponent(shareImage),
			v = settings.twitterHandle;
	
			//Override Title
			if (siteName.length > 0) {
				t = siteName + ": " + t;
			}
	
		$.each(settings.networks, function (i, item) {
			var href = settings.networkDefs[item].url.replace(/\|u\|/g, u).replace(/\|t\|/g, t).replace(/\|d\|/g, d).replace(/\|p\|/g, p).replace(/\|v\|/g, v);
	
			$container.append("<li><a href='" + href + "' title='Share this page on " + item + "' class=''><i class='ico-"+ item +"'></i></a></li>");
		});
	}
	
	function init(opts) {   
		settings = $.extend( {}, defaults, opts || {});
		
		$container = settings.container;
		
		//Twitter Handler Canada
		if(siteName.toLowerCase() === "cdw.ca") {
			settings.twitterHandle = "CDWCanada";
		}
		
		
		buildShares();
		
		
		$container.find('a').click(function (e) {
			e.preventDefault();
			window.open($(this).attr('href'), 't', 'toolbar=0,resizable=1,status=0,width=640,height=528');
		
		});
	}

  
  // explicitly return public methods when this object is instantiated
  return {
    init: init
  };
  
})(window);