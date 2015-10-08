var $ = require('jquery');
var _ = require('lodash');
var jScroll = require('../vendor/jquery.jscrollpane.min.js');


import * as $http from './http-helper';

var opts,
    settings,
    hideTimer,
    $input,
    $dd,
    $close,
    $content;
    

var defaults = {
        onSuccess: $.noop
    };

    

function keyUp(e) {
    var keyword = $input.val();

    //13-Enter
    if (keyword.length >= 3 && e.keyCode !== 13) {
        getMatches();
    } else {
        $content.html("");
        hideTypeahead();
    }
}

function typeaheadSuccess(response) {
    var html = settings.template(response);
    showTypeahead();
    $content.html(html);
    
    //Run Success 
    settings.onSuccess();

}

function typeaheadFail(e, xhr, settings) {
    var msg = "";

    if (e.status == 404) {
        console.log(e.status);
    }

    hideTypeahead(true);
}

function getMatches() {

    var data = {
        'Filter': settings.search.val(),
        'WebClass': $("#wclss").val()
    }

    /// Remember to .trim()
    $http.get(settings.source, {"data": data, "dataType": "json"}).then(typeaheadSuccess, typeaheadFail);
}

function hideTypeahead(force) {
    if (!$dd.data('active') || force) {
        $dd.data('active', false).hide();
    }
}

function showTypeahead() {
    $dd.data('active', true).show();
}

//Initiate Typeahead
export function init(options) {
    //Save Settings
    settings = _.extend({}, defaults, options);
    $input = settings.search;
    $dd = settings.dropdown;
    $content = settings.content;
    $input.on('keyup', keyUp)
    .on("click", function () {
        if ($content.children().length > 0) {
            showTypeahead();
        }
    })
    .on("focusout", function () {
        if ($content.children().length > 0) {
            hideTypeahead(true);
        }
    });

    $dd.data('active', false);

    $dd.on("mouseleave", function () {
        $dd.data('active', false);
        hideTimer = setTimeout(hideTypeahead, 1000);
    })
    .on("mouseover", function () {
        $dd.data('active', true);
        if (typeof hideTimer !== "undefined") {
            clearTimeout(hideTimer);
        }
    });

    if (settings.close) {
        settings.close.on('click', function(e) {
            e.preventDefault();

            hideTypeahead(true);
        });
    }
    
}