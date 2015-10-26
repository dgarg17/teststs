package com.cdw.aem.components;

import com.adobe.cq.sightly.WCMUse;
import com.cdw.aem.util.ProductPicker;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class EnsightenTaggingWCMUseHelper extends WCMUse {

    public final static String ELEMENTTYPE="ELEMENT_TYPE";
    public final static String ENSIGHTENPAGENAME="window.cdwTagManagementData.page_name";
    public final static String COMPONENTNAME="COMPONENT_NAME";

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
            eventType = "sEvent";
        }
        eventTitle = get("eventTitle", String.class);
        if (eventTitle == null) {
            eventTitle = getProperties().get("eventTitle", String.class);
        }
        if (eventTitle == null) {
            eventTitle = "";
        }
        eventData = get("eventData", String.class);
        if (eventData == null) {
            eventData = getProperties().get("eventData", String.class);
        }
        if (eventData == null) {
            eventData = "";
        }
        elementType = get("elementType", String.class);
        if (elementType == null) {
            elementType = getProperties().get("elementType", String.class);
        }
    }

    public static String getMethodName(String eventType) {
        if (eventType.equalsIgnoreCase("pEvent")) {
            return "CdwTagMan.createPromotionTag";
        }
        return "CdwTagMan.createElementPageTag";
    }

    public String getMethodName() {
       return getMethodName(elementType);
    }

   /* public String getEventType() {
        return "onClick";
    }*/

    public static  String getFirstParam(String eventType) {
        if (eventType.equalsIgnoreCase("pEvent")) {
            return "\'Site Promotion\'";
        }
        return ENSIGHTENPAGENAME;
    }
    public String getFirstParam() {
        return getFirstParam(eventType);
    }

    public static String getSecondParam(String eventData,String eventTitle ) {
        return COMPONENTNAME + "|" + eventTitle + "-" + ELEMENTTYPE  + "|" + eventData;
    }
    public String getSecondParam() {
        return getSecondParam(eventData,eventTitle).replaceAll(COMPONENTNAME,getComponent().getName()).replaceAll(ELEMENTTYPE,elementType.toUpperCase());
    }

    public String getTaggingEvent() {
        return getMethodName() + "(" + getFirstParam() + ",\'" + getSecondParam() + "\')";
    }
    public static String getTaggingEvent(String eventData,String eventTitle,String eventType) {
        return getMethodName(eventType) + "(" + getFirstParam(eventType) + ",\'" + getSecondParam(eventData,eventTitle) + "\')";
    }

}