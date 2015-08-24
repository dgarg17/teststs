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
		        console.log(hr);
		        //alert("error! " + txtStatus);
		    }
		});

	}

	function compareProductJSON(response, override,uniqueId) {

		console.log(override);
		var productsOverride = response;
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
						productsOverride[j].manufacturerImage=override[i].manufacturerImage;
						productsOverride[j].campaignid=override[i].campaignid;
						productsOverride[j].imagePosition=$("#imagePosition-"+uniqueId).val();
						productsOverride[j].ctaButtonStyle=$("#ctaButtonStyle-"+uniqueId).val();
					}
				}
		}
		console.log(productsOverride);
		popProducts(productsOverride,uniqueId);
	}

	function popProducts(products,uniqueId) {

		var contentString;
		var $productContainer = $("#productContainer-" + uniqueId);
		for (var i=0; i < products.length; i++) {
			contentString = '';
			contentString += "<div id='product-" + products[i].productCode + "' class='layout-"+(12/products.length)+"'>";
			contentString += "<div class='featured-item -"+ products[i].imagePosition+"'>";
			contentString += "<div class='small-logos'>";
			contentString += "<img alt='' src='"+((products[i].manufacturerImage.endsWith('?')) ? (products[i].manufacturerImage+"$mfg-aem$'") : (products[i].manufacturerImage+"?$mfg-aem$'"))+"/>"; //Image src comes from page JSON
			contentString += "</div>";
			contentString += "<div class='product-image'>";
		//  contentString += "<a href='"+products[i].url +"'>";
			contentString += "<img alt='' src='" + ((products[i].imageUrl.endsWith('?')) ? (products[i].imageUrl+ "$product-200$'") : (products[i].imageUrl+ "?$product-200$'"))+" />";
		//	contentString += "</a>";
			contentString += "</div>";
			contentString += "<h6>";
			contentString += "<a href='" + products[i].url + "'>";
			contentString += products[i].name;
			contentString += "</a>";
			contentString += "</h6>";
			contentString += "<p>" + products[i].description + "</p>";
			contentString += "<div class='button-lockup'>";
			contentString += "<div class='pricing-block'>";
			contentString += "<b>" + products[i].price + "</b>";
			contentString += "<br/><b>" + products[i].priceName + "</b>";
			contentString += "</div>";
			contentString += "<a href='" + products[i].pctaklink + "' class='button -"+products[i].ctaButtonStyle+"'>"; //Override with pctaklink if provided
			contentString += products[i].ctaText; //Comes from page JSON
			contentString += "</a>";
			contentString += "</div>";
			contentString += "</div>";
			$productContainer.append(contentString);
		}
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
