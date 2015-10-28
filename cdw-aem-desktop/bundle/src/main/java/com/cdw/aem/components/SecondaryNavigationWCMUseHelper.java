package com.cdw.aem.components;

import com.adobe.cq.sightly.WCMUse;
import com.cdw.aem.components.SecondaryNavigationItem;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;

import java.util.List;

public class SecondaryNavigationWCMUseHelper extends EnsightenTaggingWCMUseHelper {

    protected Logger log = LoggerFactory.getLogger(this.getClass());
    public static String PRIMARY_ELEMENT_TYPE="LINK";
    public static String SECONDARY_ELEMENT_TYPE="LINK-SECONDARY";
	private List<SecondaryNavigationItem> primaryItems;
	private List<SecondaryNavigationItem> secondaryItems;
	private String[] linksJson;
	
	@Override
    public void activate() throws Exception {
		super.activate();
		linksJson = get("json", String[].class);
        if (linksJson == null) {
			linksJson = new String[1];
            linksJson[0] = get("json", String.class);
        }
		setupLists();
    }
	
	private void setupLists () {
		// initialize primary list with all items
		primaryItems = new Gson().fromJson(concatJson(linksJson), new TypeToken<List<SecondaryNavigationItem>>() {
        }.getType());
		// sort primary items to remove secondaries from the list
		if (primaryItems != null && (primaryItems.size() > 0)) {
			for (int i = primaryItems.size(); i > 0; i--) {
				SecondaryNavigationItem item = primaryItems.get((i - 1));
                if (item.getIsSecondary()) {
					primaryItems.remove(item);
				}
            }
			for (int i = 1; i <=primaryItems.size(); i++) {
				SecondaryNavigationItem item = primaryItems.get((i - 1));
					if(i==1&&primaryItems.size()==1){
						item.setEventDetails(getTaggingEvent(getEventData(), getEventTitle(), getEventType()).replaceAll(COMPONENTNAME, getComponent().getName()).replaceAll(ELEMENTTYPE, PRIMARY_ELEMENT_TYPE));
					}else {
						item.setEventDetails(getTaggingEvent(getEventData(), getEventTitle(), getEventType()).replaceAll(COMPONENTNAME, getComponent().getName()).replaceAll(ELEMENTTYPE, PRIMARY_ELEMENT_TYPE + "-" + i));
					}
				}
			}


		// initialize secondary list with all items
		secondaryItems = new Gson().fromJson(concatJson(linksJson), new TypeToken<List<SecondaryNavigationItem>>() {
         }.getType());
		// sort secondary items to remove primaries from the list
		if (secondaryItems != null && (secondaryItems.size() > 0)) {
			for (int i = secondaryItems.size(); i > 0; i--) {
				SecondaryNavigationItem item = secondaryItems.get((i - 1));
				if (!item.getIsSecondary()) {
					secondaryItems.remove(item);
				}
            }
			for (int i = 1; i <= secondaryItems.size(); i++) {
				SecondaryNavigationItem item = secondaryItems.get((i - 1));
				if(i==1&&secondaryItems.size()==1){
					item.setEventDetails(getTaggingEvent(getEventData(), getEventTitle(), getEventType()).replaceAll(COMPONENTNAME, getComponent().getName()).replaceAll(ELEMENTTYPE, SECONDARY_ELEMENT_TYPE));
				}else {
					item.setEventDetails(getTaggingEvent(getEventData(), getEventTitle(), getEventType()).replaceAll(COMPONENTNAME, getComponent().getName()).replaceAll(ELEMENTTYPE, SECONDARY_ELEMENT_TYPE + "-" + i));
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
		return (secondaryItems != null && secondaryItems.size() > 0);
	}
	
	public int getSecondaryItemsCount() {
		return (int) secondaryItems.size();
	}

}