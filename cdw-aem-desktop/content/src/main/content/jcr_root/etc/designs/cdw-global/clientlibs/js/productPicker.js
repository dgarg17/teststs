	function productdata(url ,uniqueId){

		$.ajax({
		    type: "GET",
		    dataType: "json",
		    url: url,
		    cache:false,
		    success: function(response) {
		        //alert("success! dynamic"+eval(response));
		        //alert("success author"+$('#products-'+productedc).val());
		        //console.log("success! dynamic"+eval(response));
		        //Uncomment this call when API is working and temporary static call is removed
		        compareProductJSON(response, eval($("#products-"+uniqueId).val()),uniqueId);
		    },
		    error: function(hr, txtStatus, error) {
		      $("#productError-"+uniqueId).append("<h5>\"Service Timeout\", \"No Data Returned From Service\"</h5>");
		      //  console.log(hr);
		        //alert("error! " + txtStatus);
		    }
		});

	}

	function compareProductJSON(response, override,uniqueId) {

		//console.log(override);
		var productsOverride = response;
		var productLayout=$("#productLayout-"+uniqueId).val();
		var productOverflow=$("#productOverflow-"+uniqueId).val();
		for(var j=0;j<productsOverride.length;j++){
				for (var i=0; i <override.length; i++) {
					if(productsOverride[j].productCode==override[i].productCode){
						//Create FrankenJSON from both objects
						for (var key in override[i]) {
							if (override[i].hasOwnProperty(key)) {
								if (override[i][key] != '') {
									//console.log(key + " -> " + override[i][key]);
									productsOverride[j][key] = override[i][key];
								}
							}
						}
						if(override[i].pctaklink==null||override[i].pctaklink==""){
							productsOverride[j].pctaklink=productsOverride[j].url;
						}else{
							productsOverride[j].pctaklink=override[i].pctaklink;
						}
						productsOverride[j].ctaText=override[i].ctaText;
						productsOverride[j].manufactureImage=override[i].manufactureImage;
						productsOverride[j].eventCTA=override[i].eventCTA;
						productsOverride[j].eventHeader=override[i].eventHeader;
						productsOverride[j].eventImage=override[i].eventImage;
						productsOverride[j].campaignid=override[i].campaignid;
						productsOverride[j].imagePosition=$("#imagePosition-"+uniqueId).val();
						productsOverride[j].productLayout=$("#productLayout-"+uniqueId).val();
						productsOverride[j].productOverflow=$("#productOverflow-"+uniqueId).val();
						productsOverride[j].ctaButtonStyle=$("#ctaButtonStyle-"+uniqueId).val();
						productsOverride[j].enableManufactureLogo=$("#enableManufactureLogo-"+uniqueId).val();
						if(override[i].hidePrice!=null&&override[i].hidePrice.length>0){
							productsOverride[j].hidePrice=override[i].hidePrice[0];
						}
						if(productsOverride[j].description.length>250){
						productsOverride[j].description=productsOverride[j].description.substr(0, 250)+"  ..."
						}
				}	}
		}

		if(productLayout=='4up'&&productOverflow!="wrap"){
               popCarousel(productsOverride,uniqueId);
		}else{
			popProducts(productsOverride,uniqueId,productLayout);
		  }
	}

	function popCarousel(products,uniqueId) {

		var $productContainer = $("#productContainer-" + uniqueId);
		var contentString="";
	   	contentString+="<div class='layout slick-carousel'>"
		for(var i=0;i<products.length;i++){
		 	contentString+="<div><div class='product-picker'>";
			if(products[i].enableManufactureLogo){
				contentString+="<div class='small-logos'>";
				contentString+="<img alt='logo' src='"+products[i].manufactureImage+"$mfg-aem$' />";
				contentString+="</div>"
			}

			contentString += "<div class='product-image'>";
			if(products[i].eventImage==null|| products[i].eventImage==""){
				contentString += "<a href='"+products[i].url +"'>";
				contentString += "<img alt='' src='"+ products[i].imageUrl+ "$product-200$'"+" />";
				contentString += "</a>";
			}else{
				contentString += "<a href='"+products[i].url +"'>";
				contentString += "<img alt='' src='"+ products[i].imageUrl+ "$product-200$'"+" onclick=\""+products[i].eventImage+"\" />";
				contentString += "</a>";
			}
			contentString += "</div>";

			contentString += "<div class='pp-header-hold'>";
			contentString += "<h6>";
			if(products[i].eventHeader==null||products[i].eventHeader==""){
				contentString += "<a href='" + products[i].url + "'>";
				contentString += products[i].name;
				contentString += "</a>";
			}else{
				contentString += "<a href='" + products[i].url + "'"+"onclick=\""+products[i].eventHeader+"\">";
				contentString += products[i].name;
				contentString += "</a>";

			}
			contentString += "</h6>";
			contentString += "</div>";

			contentString += "<div class='pp-copy-hold'>";
			contentString += "<p>" + products[i].description + "</p>";
			contentString += "</div>";

			contentString += "<div class='button-lockup'>";
			if(products[i].hidePrice!='true'){
				contentString += "<div class='pricing-block'>";
				contentString += "<b>" + products[i].price + "</b>";
				contentString += "<p>" + products[i].priceName + "</p>";
				contentString += "</div>";
			}
			if(products[i].eventCTA==null||products[i].eventCTA==""){
				contentString += "<a href='" + products[i].pctaklink + "' class='button -"+products[i].ctaButtonStyle+"'>"; //Override with pctaklink if provided
				contentString += products[i].ctaText; //Comes from page JSON
				contentString += "</a>";
			}else{
				contentString += "<a href='" + products[i].pctaklink + "' class='button -"+products[i].ctaButtonStyle+"'"+"onclick=\""+products[i].eventCTA+"\">"; //Override with pctaklink if provided
				contentString += products[i].ctaText; //Comes from page JSON
				contentString += "</a>";
			}
			contentString += "</div>";
			contentString += "</div>";
			contentString += "</div>";
		}

		$productContainer.append(contentString);
       	$('#productContainer-' + uniqueId + ' .slick-carousel').slick({
	        infinite: false,
		    slidesToShow: 4,
		    slidesToScroll: 4,
		    swipeToSlide: false,
		    prevArrow: '<span class="ico prev ico-chevron-left"></span>',
		    nextArrow: '<span class="ico next ico-chevron-right"></span>',
		    responsive: [
			    {
			      breakpoint: 970,
			      settings: {
			        slidesToShow: 3,
					slidesToScroll: 3
			      }
			    },
			    {
			      breakpoint: 750,
			      settings: {
			        slidesToShow: 2,
					slidesToScroll: 2
			      }
			    },
			    {
			      breakpoint: 580,
			      settings: {
			        slidesToShow: 1,
					slidesToScroll: 1, 
			        adaptiveHeight: true
			      }
			    }
			]
	    });
	}

	function popProducts(products,uniqueId,productLayout) {

		var $productContainer = $("#productContainer-" + uniqueId);
		var contentString="";
		var numberOfColumn=parseInt(productLayout.replace('up',''));
		var fullLayout='layout-'+12/numberOfColumn;
		for(var i=0;i<products.length;i++){
		if(i==0||((i)%numberOfColumn==0)){
		contentString+="<div class='layout'>"
		}
		contentString+="<div class='"+fullLayout+"'> ";
		contentString+="<div class='product-picker "+(productLayout=="2up"?"-"+ products[i].imagePosition:"")+ "'> ";
		if(products[i].enableManufactureLogo){
			contentString+="<div class='small-logos'> ";
			contentString+="<img alt='logo' src='"+products[i].manufactureImage+"$mfg-aem$'>";
			contentString+="</div> "
		}

		contentString += "<div class='product-image'>";
		if(products[i].eventImage==null|| products[i].eventImage==""){
			contentString += "<a href='"+products[i].url +"'>";
			contentString += "<img alt='' src='"+ products[i].imageUrl+ "$product-200$'"+" />";
			contentString += "</a>";
		}else{
			contentString += "<a href='"+products[i].url +"'>";
			contentString += "<img alt='' src='"+ products[i].imageUrl+ "$product-200$'"+" onclick=\""+products[i].eventImage+"\" />";
			contentString += "</a>";
		}
		contentString += "</div>";

		contentString += "<div class='pp-header-hold'>";
		contentString += "<h6>";
		if(products[i].eventHeader==null||products[i].eventHeader==""){
			contentString += "<a href='" + products[i].url + "'>";
			contentString += products[i].name;
			contentString += "</a>";
		}else{
			contentString += "<a href='" + products[i].url + "'"+"onclick=\""+products[i].eventHeader+"\">";
			contentString += products[i].name;
			contentString += "</a>";

		}
		contentString += "</h6>";
		contentString += "</div>";

		contentString += "<div class='pp-copy-hold'>";
		contentString += "<p>" + products[i].description + "</p>";
		contentString += "</div>";

		contentString += "<div class='button-lockup'>";
		if(products[i].hidePrice!='true'){
			contentString += "<div class='pricing-block'>";
			contentString += "<b>" + products[i].price + "</b>";
			contentString += "<br/><p>" + products[i].priceName + "</p>";
			contentString += "</div>";
		}
		if(products[i].eventCTA==null||products[i].eventCTA==""){
			contentString += "<a href='" + products[i].pctaklink + "' class='button -"+products[i].ctaButtonStyle+"'>"; //Override with pctaklink if provided
			contentString += products[i].ctaText; //Comes from page JSON
			contentString += "</a>";
		}else{
			contentString += "<a href='" + products[i].pctaklink + "' class='button -"+products[i].ctaButtonStyle+"'"+"onclick=\""+products[i].eventCTA+"\">"; //Override with pctaklink if provided
			contentString += products[i].ctaText; //Comes from page JSON
			contentString += "</a>";
		}
		contentString += "</div>";
		contentString += "</div>";
		contentString += "</div>";
		if((i+1)%numberOfColumn==0){
			contentString+="</div>"
		}
	}
		if(products.length%numberOfColumn!=0 ){
			contentString += "</div>";
		}
		$productContainer.append(contentString);
	}

	$(document).ready(function() {
		$(".productService").each(function( index ) {
			//alert($( this ).attr("id")+index);
			var id=$(this).attr("id");
			url=$("#"+id).val();
			var uniqueId=id.replace("productService-", "");
			console.log($("#"+id).val());
			productdata(url,uniqueId);

		});
	});
