var $ = require('jquery');
var HoverIntent = require('../../../../libs/hoverIntent.js');
var Handlebars = require('handlebars/runtime');

import * as $http from './http-helper';
import * as typeahead from './typeahead';

//*****Templates
var templateFlyout1 = require('../../../../../templates/header/menu-flyout1.hbs'),
    templateBrands = require('../../../../../templates/header/menu-brands.hbs'),
    $dropdowns;

    Handlebars.registerPartial("linksPromos", require('../../../../../templates/header/menu-links-promos.hbs'));
    Handlebars.registerPartial("links2Col", require('../../../../../templates/header/menu-links-2col.hbs'));
    Handlebars.registerPartial("printerFinder", require('../../../../../templates/header/menu-printer-finder.hbs'));
    Handlebars.registerPartial("additionalLinks", require('../../../../../templates/header/menu-partial-links.hbs'));
    Handlebars.registerPartial("promos", require('../../../../../templates/header/menu-partial-promos.hbs'));
    
function ajaxFail(xhr, status, error) {
  console.log(status);
}
//****/Templates

//*****Global Alert
$('#alert-close').click(function(){
   $('.alert').css({'display':'none'});
});
//****/Global Alert

function setHover($el) {
   var $dd = $('#'+$el.data('flyout'));
   
    //Flyout 1 Hover
    $el.hoverIntent({
        over: function () {

            if($dd.hasClass('flyout-1')) {
                //Reset Width
                $dd.css({ 'width': '300px' });
            }
            
            $el.addClass('hover').siblings().removeClass('hover');

            $dd.data('hover', false);
            $dd.addClass('hover').siblings('.dropdown').removeClass('hover');
        },
        out: function (e) {
            if (!$dd.data('hover')) {
                $dd.removeClass('hover');
                $el.removeClass('hover');
            }
        },
        timeout: 75
    });
    
    $dd.on('mouseenter', function() {
        $dd.data('hover', true);
    });
     $dd.on('mouseleave', function() {
         $dd.data('hover', false);
     });

    // Reset flyout width 
     $dd.hoverIntent({
         over: function () {
             $dd.addClass('hover').siblings('.dropdown').removeClass('hover');
         },
         out: function () {
             if (!$dd.data('hover')) {
                 $el.removeClass('hover');
                 $dropdowns.children('.dropdown').removeClass('hover');
                 
                 if($dd.hasClass('flyout-1')) {
                     $dd.find('.flyout1 > .nav-links > li').removeClass('hover');
                     $('.flyout2').removeClass('active');
                     $dd.find('.flyout1').siblings('.flyout2-wrapper').hide();
                 }

             }
         },
         timeout: 75
     });
    
     if($dd.hasClass('flyout-1')) {
         //Flyout 2 Hover
         $dd.find('.flyout1 > .nav-links > li').hoverIntent({
             over: function () {
                 var $flyout1 = $(this).closest('.flyout1'),
                     $flyout2 = $('#' + $(this).data('flyout')),
                     $flyout2Wrapper = $flyout1.siblings('.flyout2-wrapper');

                 //Add hover to link
                 $(this).addClass('hover').siblings().removeClass('hover');
            
                 //Set Width
                 $dd.css({ 'width': 'auto' });
    
                 //Remove old
                 $('.flyout2').removeClass('active');
    
                 if ($(this).data('flyout') !== "") {
                     $(this).addClass('hover').siblings().removeClass('hover');
    
                     $flyout1.parent('.dropdown').css({ 'width': '100%'});
                     $flyout2.addClass('active');
                 } else {
                     $flyout1.parent('.dropdown').css({ 'width': $flyout1.outerWidth(true, true) + 'px' });
                 }

                 //Set Height
                 var flyout1Height = $flyout1.height();
                 $flyout2Wrapper.show().css({ 'height': 'auto' });
                 //console.log(flyout1Height + ' > ' + $flyout2Wrapper.height());
                 if (flyout1Height > $flyout2Wrapper.height()) {
                     $flyout2Wrapper.css({ 'height': flyout1Height + 'px' });
                 }

             },
             out: function () {             
                 //$(this).removeClass('hover').siblings();
             },
             timeout: 75
         });
     }
}

function menuSuccess($el, data) {
    var html = "";
    
    $el.data('flyout', data.id);
    
    switch(data.template) {
        case "Flyout1":
            html = templateFlyout1(data);
            break;
        case "FlyoutBrands":
            html = templateBrands(data);
            break;
        default:
            html = "";
    }
    
    if (html != "") {
        $dropdowns.append(html);

        setHover($el);

        //Finder Typeahead
        //Initiate Typeahead
        /*typeahead.init({
            "search": $('#ink-finder-input'),
            "dropdown": $('#ink-finder-results'),
            "content": $('#ink-finder-results').children('.results-content'),
            "source":  '/api/PrinterSuggestion',
            "template": require('../../../../../templates/header/ink-toner-matches.hbs')
        });*/
    }
}

function getNavigation($el, src) {
    $http.get(src).then(function(data) {
        menuSuccess($el, data);
    }, ajaxFail);
}

function blobSuccess($el, data) {
    $dropdowns.append(data);
    
    setHover($el);
}
function getBlob($el, src) {
    $http.get(src, { "dataType": "html" }).then(function(data) {
        blobSuccess($el, data);
    }, ajaxFail);
}

export function init() {
    var INTENT = 300;
    $dropdowns = $('#navigation-dropdowns');

    function hideDropdowns() {
        $('.js-dropdown').each(function() {
            var $btn = $(this),
                $dd = ($btn.data('dropdown')) ? $($btn.data('dropdown')) : $btn.next('.dropdown');

            $btn.removeClass('active');
            $dd.data({'active': false, 'open': false }).hide();
        });
    }


	$('.js-dropdown').on('click', function(e) {
		e.preventDefault();
		
		var $btn = $(this),
			$dd = ($btn.data('dropdown')) ? $($btn.data('dropdown')) : $btn.next('.dropdown');

		if ($dd.data('open')) {
		    $btn.removeClass('active');
		    $dd.slideUp(300).data({'active': false, 'open': false });
		}else {
		    $btn.addClass('active');
		    $dd.slideDown(300).data({'active': true, 'open': true });
		}
	});
    
	$('.js-dropdown').each(function() {
	    var $btn = $(this),
			$dd = ($btn.data('dropdown')) ? $($btn.data('dropdown')) : $btn.next('.dropdown');
            
        //Set Caller
	    $dd.data('caller', $btn); 
        //Set State
	    $dd.data('open', false); 

	    $dd.on('mouseenter', function() {
	        $dd.data('active', true);
	    });

	    $dd.on('mouseleave', function() {
	        $dd.data('active', false)
	        var timeout = setTimeout(function(){ 
	            if (!$dd.data('active')) {
	                hideDropdowns();
	            }
	        }, INTENT); 
	    });

	    $btn.on('mouseleave', function() {
	        var $dd = ($btn.data('dropdown')) ? $($btn.data('dropdown')) : $btn.next('.dropdown');
	        $dd.data('active', false)
	        var timeout = setTimeout(function(){ 
	            if (!$dd.data('active')) {
	                hideDropdowns();
	            }
	        }, INTENT); 
	    });
	});

	$('.js-dropdown').on('mouseleave', function() {
	    var $btn = $(this),
			$dd = ($btn.data('dropdown')) ? $($btn.data('dropdown')) : $btn.next('.dropdown');

	    var timeout = setTimeout(function(){ 
	        if (!$dd.data('active')) {
	            hideDropdowns();
	        }
	    }, INTENT); 
	});

    //Get Navigation
	$('.main-navigation .nav li[data-src]').each(function() {
        var $el = $(this),
            src = $el.data('src');
        getNavigation($el, src);
    });
    
    //Get Blob
	$('.main-navigation .nav li[data-blob]').each(function() {
        var $el = $(this),
            src = $el.data('blob');
        getBlob($el, src);
    });
    
    //*****SEARCH
    //Initiate Typeahead
	typeahead.init({
	    "search": $('#search-input'),
	    "dropdown": $('#search-results'),
	    "content": $('#search-results').children('.results-content'),
	    "close": $('#search-results').children('.btn-close'),
	    "source":  $('#search-input').data('rrta') == 'True' ? '/api/typeaheadservice/terms' : '/api/TypeaheadService/results',
	    "template": $('#search-input').data('rrta') == 'True' ? require('../../../../../templates/header/rr-matches.hbs') : require('../../../../../templates/header/search-matches.hbs'),
	    "onSuccess": function() {
	        $('#search-results .results-content').find('.scroll-box').jScrollPane();
	    }
	});

    //Search Dropdown
    $('#search-input').attr({ 'placeholder': $('#search-options-panel > a.selected').data('placeholder') });
	$('#search-options-panel > a').on('click', function(e) {
	    e.preventDefault();
	    var $a = $(this);
	   
	    $a.addClass('selected').siblings().removeClass('selected');

	    $('#search-input').attr({ 'placeholder': $a.data('placeholder') });

	    hideDropdowns();
	});
    
     //Search
	$('#search-form').on('submit', function (e) {
	    e.preventDefault();

	    $.ajax({
	        url: "/api/searchcookie?action=reset",
	        type: "post",
	        timeout: 200,
	        error: function () {
	            if (window.console) console.log('error when clearing search cookie');
	        },
	        complete: function () {
	            var keyword = $("#search-input").val(),
                    priceRange = "",
                    categoryFilter = "",
                    catalogFilter = $('#search-options-panel > a.selected').attr('href'),
                    brandFilter = "",
                    url = "/shop/search/result.aspx?key=" + keyword + "&wclsscat=" + categoryFilter + "&b="
                    + brandFilter + "&p=" + priceRange + "&ctlgfilter=" + catalogFilter + "&searchscope=all&sr=1";

	            window.location.href = url;
	        }
	    });

	});
    //****/SEARCH
}