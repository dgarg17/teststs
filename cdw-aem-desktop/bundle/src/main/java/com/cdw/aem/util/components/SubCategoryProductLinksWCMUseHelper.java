package com.cdw.aem.util.components;

import com.adobe.cq.sightly.WCMUse;
import com.cdw.aem.util.SubCategoryProductLink;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.slf4j.LoggerFactory;

import java.util.List;

/**
 * Created by goutved on 7/29/2015.
 */
public class SubCategoryProductLinksWCMUseHelper extends WCMUse {

    protected org.slf4j.Logger log = LoggerFactory.getLogger(SubCategoryProductLinksWCMUseHelper.class);
    private String[] secondaryLinksJson;

    @Override
    public void activate() throws Exception {

        secondaryLinksJson = get("json", String[].class);
        if (secondaryLinksJson == null) {
            secondaryLinksJson = new String[1];
            secondaryLinksJson[0] = get("json", String.class);

        }
        log.debug(this.getClass().getName()+ "secondaryLinksJson "+secondaryLinksJson.length);
    }

    public   List<SubCategoryProductLink>  getSubCategoryProductLinks() {
        log.debug("List Output"+((List)(new Gson().fromJson(concatJson(secondaryLinksJson), new TypeToken<List<SubCategoryProductLink>>() {
        }.getType()))).size());
      return new Gson().fromJson(concatJson(secondaryLinksJson), new TypeToken<List<SubCategoryProductLink>>() {
        }.getType());

    }

    private String concatJson(String[] jsonArray) {

        String json = "";
        if (jsonArray == null || jsonArray.length < 1) {
            return json;
        } else if (jsonArray.length == 1) {
            return "["+jsonArray[0]+"]";
        }
        for (String i : jsonArray) {
            json += i + ",";
        }
        json = json.substring(0, json.lastIndexOf(','));


    return"["+json+"]";

    }
}
