package com.cdw.aem.components;

import com.adobe.cq.sightly.WCMUse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class TagginWCMUseHelper extends WCMUse {

    protected Logger log = LoggerFactory.getLogger(this.getClass());

    private String eventType;
    private String eventTitle;
    private String eventData;
    private String elementType;

    @Override
    public void activate() throws Exception {
        eventType = get("eventType", String.class);
        if (eventType == null) {
            eventType = getProperties().get("eventType", String.class);
        }
        if (eventType == null) {
            eventType="sEvent";
        }
        eventTitle = get("eventTitle", String.class);
        if (eventTitle == null) {
            eventTitle = getProperties().get("eventTitle", String.class);
        }
        if (eventTitle == null) {
            eventTitle="";
        }
        eventData = get("eventData", String.class);
        if (eventData == null) {
            eventData = getProperties().get("eventData", String.class);
        }
        if (eventData == null) {
            eventData="";
        }
        elementType = get("elementType", String.class);

    }

    public String getMethodname() {
        if (eventType.equalsIgnoreCase("pEvent")) {
            return "cmCreatePromotionTag";
        }
        return "cmCreateElementTag";
    }

    public String getEventType() {
        return "onClick";
    }

    public String getFirstParam() {
        if (eventType.equalsIgnoreCase("pEvent")) {
            return "Site Promotion";
        }
        if(getCurrentPage().getProperties().get("ensightenPageName", String.class)==null){
            return "";
        }
        return getCurrentPage().getProperties().get("ensightenPageName", String.class);
    }

    public String getSecondParam() {
        return getComponent().getName() + "|" + eventTitle + "-"+ElementType.find(elementType).getName()+"+" + eventData;
    }

    public String getEventData() {
        return getMethodname() + "(\'" + getFirstParam() + "\',\'" + getSecondParam() + "\')";
    }

}