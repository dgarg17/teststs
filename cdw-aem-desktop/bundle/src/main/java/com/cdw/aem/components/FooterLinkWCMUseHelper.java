package com.cdw.aem.components;

import com.adobe.cq.sightly.WCMUse;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.slf4j.LoggerFactory;

import java.util.List;

/**
 * Created by goutved on 11/20/2015.
 */
public class FooterLinkWCMUseHelper extends WCMUse {
    private String[]  footerLinkList;
    protected org.slf4j.Logger log = LoggerFactory.getLogger(FooterLinkWCMUseHelper.class);

    @Override
    public void activate() throws Exception {
        footerLinkList = get("json", String[].class);
        if ( footerLinkList == null) {
            footerLinkList = new String[1];
            footerLinkList[0] = get("json", String.class);
        }
        log.debug("footer link json length "+footerLinkList.length);
    }
    public List<FooterLink> getFooterLinks(){

        List<FooterLink> linkLists = (new Gson().fromJson(concatJson( footerLinkList), new TypeToken<List<FooterLink>>() {
        }.getType()));
        log.debug("footer link size "+linkLists.size());
        return linkLists;

    }
    private String concatJson(String[] jsonArray) {

        String json = "";
        if (jsonArray == null || jsonArray.length < 1) {
            return json;
        } else if (jsonArray.length == 1) {
            return "[" + jsonArray[0] + "]";
        }
        for (String i : jsonArray) {
            json += i + ",";
        }
        json = json.substring(0, json.lastIndexOf(','));

        return "[" + json + "]";
    }
}
