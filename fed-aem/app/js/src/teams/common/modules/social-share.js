; (function ($, window, undefined) {
    "use strict";
    var document = window.document;

    $.fn.cdwshare = function (method) {
        var methods = {
            init: function (options) {
                this.cdwshare.settings = $.extend({}, this.cdwshare.defaults, options);
                var $this = $(this);
                var settings = this.cdwshare.settings,
                    networks = this.cdwshare.settings.networks,
                    theme = this.cdwshare.settings.theme,
                    orientation = this.cdwshare.settings.orientation,
                    affix = this.cdwshare.settings.affix,
                    margin = this.cdwshare.settings.margin,
                    useshorturl = this.cdwshare.settings.useShortUrl,
                    apikey = this.cdwshare.settings.googleapikey,
                    pageTitle = this.cdwshare.settings.title || "",
                    pageUrl = this.cdwshare.settings.url || "",
                    pageDesc = this.cdwshare.settings.description || "",
                    productimage = this.cdwshare.settings.image || "",
                    sitename = this.cdwshare.settings.sitename || "",
                    shortUrl = this.cdwshare.settings.url || "",
                    cmsuffix = "cm_mmc=ShareTool-_-|c|-_-NA-_-NA",
                    twitterhandle = "CDWCorp",
                    emulateProd = $this.find('[id$="hdnEmulateProd"]').val();
                $.each($(document).find('meta[property="og:description"]'), function (idx, item) {
                    pageDesc = $(item).attr("content");
                });
                $.each($(document).find('meta[property="og:title"]'), function (idx, item) {
                    pageTitle = $(item).attr("content");
                });
                $.each($(document).find('meta[property="og:image"]'), function (idx, item) {
                    productimage = $(item).attr("content");
                });
                $.each($(document).find('meta[property="og:url"]'), function (idx, item) {
                    var temppageUrl = $(item).attr("content");
                    if (emulateProd == 'True') {
                        var urlparser = document.createElement('a');
                        urlparser.href = temppageUrl;
                        if (urlparser.hostname.indexOf("cdw.com") !== -1) {
                            urlparser.hostname = "www.cdw.com";
                        }
                        else if (urlparser.hostname.indexOf("cdwg.com") !== -1) {
                            urlparser.hostname = "www.cdwg.com";
                        }
                        else if (urlparser.hostname.indexOf("cdw.ca") !== -1) {
                            urlparser.hostname = "www.cdw.ca";
                        }
                        pageUrl = urlparser.href;
                    }
                    else
                        pageUrl = temppageUrl;
                    var sep = (pageUrl.indexOf('?') > -1) ? '&' : '?';
                    pageUrl += sep + cmsuffix;
                    shortUrl = pageUrl;
                });
                $.each($(document).find('meta[property="og:site_name"]'), function (idx, item) {
                    sitename = $(item).attr("content");
                    if (sitename == "CDW.CA") {
                        twitterhandle = "CDWCanada";
                    }
                });
                // each instance of this plugin
                return this.each(function () {
                    var $element = $(this);
                    if (useshorturl == 'true' && typeof gapi != "undefined" && typeof gapi.client != "undefined") {
                        gapi.client.setApiKey(apikey);
                        gapi.client.load('urlshortener', 'v1', function () {
                            var request = gapi.client.urlshortener.url.insert({
                                'resource': {
                                    'longUrl': pageUrl.replace('|c|', 'twitter')
                                }
                            });
                            var resp = request.execute(function (resp) {
                                if (!resp.error) {
                                    shortUrl = resp.id;
                                }
                                else {
                                    if (typeof console != "undefined") {
                                        console.log(resp.error.message);
                                    }
                                    shortUrl = pageUrl.replace('|c|', 'twitter');
                                }
                                processshare();
                            });
                        });
                        //var uri = 'https://www.googleapis.com/urlshortener/v1/url?key=' + apikey;
                        //$.ajax({
                        //    url: uri,
                        //    type: 'POST',
                        //    contentType: 'application/json; charset=utf-8',
                        //    data: '{ longUrl: "' + pageUrl + '"}',
                        //    dataType: 'json',
                        //    success: serviceSucceeded,
                        //    error: function (xhr, status, errorThrown) {
                        //        console.log('@Error: ' + errorThrown);
                        //        console.log('@Status: ' + status);
                        //        console.log('@Status Text: ' + xhr.statusText);
                        //        processshare();
                        //    }
                        //});//commented as jsonp was not working and json will cause cross domain issues.
                    } else {
                        processshare();
                    }
                    //function serviceSucceeded(responseData) {
                    //    shortUrl = responseData.id;
                    //    processshare();
                    //}
                    function processshare() {
                        var id = $element.attr("id"),
                            u = encodeURIComponent(shortUrl),
                            t = encodeURIComponent(pageTitle.replace('|', '')),
                            d = encodeURIComponent(pageDesc.substring(0, 250)),
                            p = encodeURIComponent(productimage),
                            v = twitterhandle,
                            href, tnew;
                        var remlen = u.length + v.length + 2;
                        var dt = encodeURIComponent(pageDesc.substring(0, (140 - remlen)));
                        // append HTML for each network button
                        $.each(networks, function (i, item) {
                            if (sitename.length > 0) {
                                tnew = sitename + ": " + t;
                            } else {
                                tnew = t;
                            }
                            href = helpers.networkDefs[item].url;

                            if (item == 'twitter') {
                                href = href.replace('|u|', u).replace('|d|', d).replace('|v|', v);
                            } else {
                                var x = encodeURIComponent(pageUrl.replace('|c|', item));
                                href = href.replace('|u|', x).replace('|t|', tnew).replace('|d|', d).replace('|p|', p).replace('|u|', x);
                            }
                            $("<a href='" + href + "' title='Share this page on " + item + "' class='pop socialshare-" + theme + " socialshare-" + theme + "-" + item + "' onclick=\"cmCreatePageviewTag('" + item + "','Share');\"></a>").appendTo($element);
                        });
                        // customize css
                        // bind click
                        $('.pop').click(function () {
                            window.open($(this).attr('href'), 't', 'toolbar=0,resizable=1,status=0,width=640,height=528');
                            return false;
                        });
                    }
                }); // end plugin instance
            }
        };
        var helpers = {
            networkDefs: {
                facebook: { url: 'http://www.facebook.com/sharer/sharer.php?s=100&amp;p%5Btitle%5D=|t|&amp;p%5Burl%5D=|u|&amp;p%5Bsummary%5D=|d|&amp;p%5Bimages%5D%5B0%5D=|p|' },
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
                spiceit: { url: 'http://community.spiceworks.com/info/login?from=popup&href=|u|&referer=/info/addlink&utm_campaign=spice&utm_medium=dynamic&utm_source=|u|' }
            }
        };

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method "' + method + '" does not exist in social plugin');
        }
        return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    };

    $.fn.cdwshare.defaults = {
        networks: ['facebook', 'twitter', 'linkedin'],
        theme: 'square', // use round icons sprite
        autoShow: true,
        margin: '3px',
        useShortUrl: true,
        googleapikey: 'AIzaSyDOSV7KUmsHXTJO4irY9fd6e-ULsq0HNfI'
    };

    $.fn.cdwshare.settings = {};

})(jQuery, window);