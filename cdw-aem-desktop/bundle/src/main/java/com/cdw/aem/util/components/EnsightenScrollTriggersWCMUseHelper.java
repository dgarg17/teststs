package com.cdw.aem.util.components;

import com.adobe.cq.sightly.WCMUse;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.apache.commons.lang.StringUtils;
import org.slf4j.LoggerFactory;

import java.util.Arrays;
import java.util.List;

/**
 * Created by Will Carpenter
 */
public class EnsightenScrollTriggersWCMUseHelper extends WCMUse {

    protected org.slf4j.Logger log = LoggerFactory.getLogger(LinkListWCMUseHelper.class);
    private String triggersJson[];
	private List<ScrollTriggerItem> scrollTriggers;
	
	public void activate() throws Exception {
		triggersJson = get("json", String[].class);
        if (triggersJson == null) {
			triggersJson = new String[1];
            triggersJson[0] = get("json", String.class);
        }
		try {
			scrollTriggers = new Gson().fromJson(concatJson(triggersJson), new TypeToken<List<ScrollTriggerItem>>() {
	        }.getType());
			// workaround for if we have an empty item...
			ScrollTriggerItem item = scrollTriggers.get(0);
			if (item == null) {
				scrollTriggers.remove(item);
			}
		} catch (Exception e) {
			log.error("Caught Exception", e);
		}
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

	public String getScrollTriggers(){
		String scrollTriggerString = "";
		int count = 0;
		for (ScrollTriggerItem item : scrollTriggers) {
			if (item != null) {
				if (count > 0) scrollTriggerString += ",";
				scrollTriggerString += ("[\"" + item.getTagName() + "\",\"" + item.getElementName() + "\"]");
				count ++;
			}
		}
		return scrollTriggerString;
	}
	
	public Boolean getHasScrollTriggers() {
		log.info("Get Has Scroll Triggers");
		log.info("scrollTriggers != null : " + (scrollTriggers != null));
		log.info("scrollTriggers.size() : " + scrollTriggers.size());
		return (scrollTriggers != null && scrollTriggers.size() > 0);
	}

}