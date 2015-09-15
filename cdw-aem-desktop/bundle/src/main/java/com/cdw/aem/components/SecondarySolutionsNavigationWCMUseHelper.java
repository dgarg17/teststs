package com.cdw.aem.components;

import com.adobe.cq.sightly.WCMUse;
import com.cdw.aem.components.SecondaryNavigationItem;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;

import java.util.List;

public class SecondarySolutionsNavigationWCMUseHelper extends WCMUse {

    protected Logger log = LoggerFactory.getLogger(this.getClass());

	private List<SecondaryNavigationItem> primaryItems;
	private List<SecondaryNavigationItem> secondaryItems;
	private String[] linksJson;
	
	@Override
    public void activate() throws Exception {
		log.info("ACTIVATE");
        linksJson = get("json", String[].class);
        if (linksJson != null) {
            log.info("Setup Lists");
			setupLists();
        }
		log.info("DONE");
    }
	
	private void setupLists () {
		// initialize primary list with all items
		primaryItems = new Gson().fromJson(concatJson(linksJson), new TypeToken<List<SecondaryNavigationItem>>() {
        }.getType());
		// sort primary items to remove secondaries from the list
		if (primaryItems != null && (primaryItems.size() > 0)) {
			log.info("Setting Up Primary");
            for (int i = primaryItems.size(); i > 0; i--) {
				SecondaryNavigationItem item = primaryItems.get((i - 1));
                if (item.getIsSecondary()) {
					log.info("Item is secondary...removing item.");
					primaryItems.remove(item);
				}
            }
        }
		// initialize secondary list with all items
		secondaryItems = new Gson().fromJson(concatJson(linksJson), new TypeToken<List<SecondaryNavigationItem>>() {
         }.getType());
		// sort secondary items to remove primaries from the list
		if (secondaryItems != null && (secondaryItems.size() > 0)) {
			log.info("Setting Up Secondary");
            for (int i = secondaryItems.size(); i > 0; i--) {
				SecondaryNavigationItem item = secondaryItems.get((i - 1));
				log.info("item.getIsSecondary() : " + item.getIsSecondary());
                if (!item.getIsSecondary()) {
					log.info("Item is primary...removing item.");
					secondaryItems.remove(item);
				}
            }
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
	
	public List<SecondaryNavigationItem> getPrimaryItems(){
		return primaryItems;
	}
	
	public List<SecondaryNavigationItem> getSecondaryItems(){
		return secondaryItems;
	}
	
	public Boolean getHasSecondaryItems() {
		log.info("Inside 'hasSecondaryItems'");
		return (secondaryItems != null && secondaryItems.size() > 0);
	}
	
	public int getSecondaryItemsCount() {
		return (int) secondaryItems.size();
	}

}