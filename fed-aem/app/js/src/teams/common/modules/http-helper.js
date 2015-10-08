var $ = require('jquery');

var defaults = { 
    "dataType": "json",
    "contentType": "application/x-www-form-urlencoded; charset=UTF-8",
    "data": {},
    "timeout": 5000
}

export function get(url, opts) {   
    var settings = $.extend( {}, defaults, opts || {});

    return $.ajax({
        "url": url,
        "type": 'GET',
        "dataType": settings.dataType,
        "data": settings.data,
        "timeout": settings.timeout
    });    
}

export function post(url, data, opts) {

    if (!url || !data) {
        console.log("url and data must be set!");
        return false;
    }

    var settings = $.extend( {}, defaults, opts);

    return $.ajax({
        "url": url,
        "type": "POST",
        "dataType": settings.dataType,
        "data": data,
        "contentType": settings.contentType,
        "timeout": settings.timeout
    });    
}