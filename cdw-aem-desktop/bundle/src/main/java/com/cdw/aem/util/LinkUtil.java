package com.cdw.aem.util;

import jdk.nashorn.internal.runtime.regexp.RegExp;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.regex.Pattern;

/**
 * Created by goutved on 7/29/2015.
 */
public class LinkUtil {

    private static boolean isInternalUrl( String url){
        return  Pattern.compile("^(?!/content/dam)/content/(.*)").matcher(url).find();
    }

    private static boolean isExternalUrl( String url){
        return Pattern.compile("^((http|https):\\/\\/)?(([\\w+]{1,}[.]{1,}){1,})(.*)").matcher(url).find();
    }

    private static boolean isExternalUrlWithProtocol( String url){
        return Pattern.compile("^((http|https):\\/\\/)(([\\w+]{1,}[.]{1,}){1,})(.*)").matcher(url).find();
    }

    /*
    Update the URL with the below condition
    1. validate and add ".html" to local url(relative)
    2. add "//" to the url with any protocol (http://,https://,//)
     */
    public static  String updateUrl(String url) {
        if(isInternalUrl(url)&&!url.endsWith(".html")){
                return url + ".html";
        }else if(!isInternalUrl(url)&&isExternalUrl(url)&&!isExternalUrlWithProtocol(url)){
            return "//"+url;
        }
        return url;
    }
}
