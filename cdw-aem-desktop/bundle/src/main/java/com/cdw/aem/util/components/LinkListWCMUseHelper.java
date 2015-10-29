package com.cdw.aem.util.components;

import com.adobe.cq.sightly.WCMUse;
import com.cdw.aem.components.EnsightenTaggingWCMUseHelper;
import com.cdw.aem.util.LinkList;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.apache.commons.lang.StringUtils;
import org.slf4j.LoggerFactory;

import java.util.Arrays;
import java.util.List;

/**
 * Created by goutved on 7/29/2015.
 */
public class LinkListWCMUseHelper extends EnsightenTaggingWCMUseHelper {

    protected org.slf4j.Logger log = LoggerFactory.getLogger(LinkListWCMUseHelper.class);
    private String linksJson[];
    private int startWith=1;


    @Override
    public void activate() throws Exception {
        super.activate();
         linksJson = get("json", String[].class);
        if ( linksJson == null) {
             linksJson = new String[1];
             linksJson[0] = get("json", String.class);

        }
        String i=get("startWith", String.class);
       if(i!=null&& StringUtils.isNumeric(i)){
           log.debug("startWith is integer  " +Integer.parseInt(i));
           startWith=Integer.parseInt(i);
       }else if(get("startWith", Integer.class)!=null){
           startWith=get("startWith", Integer.class);
       }else{
           startWith=1;
       }
        log.debug(this.getClass().getName() + "LinksJson " +  linksJson.length);
    }

    public List<LinkList> getLinkDetails() {
        List<LinkList> linkLists = (new Gson().fromJson(concatJson( linksJson), new TypeToken<List<LinkList>>() {
        }.getType()));
        int count=startWith;
        for(LinkList linkList:linkLists){
            if(count==1&&linkLists.size()==1){
                linkList.setEventSelect(getTaggingEvent());
            }else {
                linkList.setEventSelect(getTaggingEvent(getEventData(), getEventTitle(), getEventType()).replaceAll(COMPONENTNAME, getComponent().getName()).replaceAll(ELEMENTTYPE, getElementType().toUpperCase() + "-" + count));

            }count++;
        }
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

    public int getCount() {
        return  linksJson.length;
    }

    @Override
    public String toString() {
        return "LinkListWCMUseHelper{" +
                "secondaryLinksJson=" + Arrays.toString(secondaryLinksJson) +
                ", startWith=" + startWith +
                ", EnsightenTaggingWCMUseHelper=" + super.toString() +
                '}';
    }
}
