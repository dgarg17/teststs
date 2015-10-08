'use strict';

var $ = require('jquery');
var _ = require('lodash');

export function backToTop(options) {
    var $backToTop,
        settings, 
	defaults = {
	    "el": "#backToTop",
        "fromTop": 250
	};

    settings = _.extend({}, defaults, options);

    $backToTop = $(settings.el);

    $(window).scroll(function () {
        if (showBackToTop()) {
            $backToTop.fadeIn(1000);
        } else {
            $backToTop.fadeOut(100);
        }
    })
    .resize(function () {
        if (showBackToTop()) {
            $backToTop.show();
        } else {
            $backToTop.hide();
        }
    });

    $backToTop.on('click', function () {
        $('body,html').animate({ scrollTop: 0 }, 800);
    });

    function showBackToTop() {
        return $(window).scrollTop() > settings.fromTop;
    }

}