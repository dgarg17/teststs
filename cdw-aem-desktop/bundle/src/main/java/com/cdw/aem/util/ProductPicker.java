package com.cdw.aem.util;

import com.cdw.aem.components.ElementType;
import com.day.cq.wcm.api.Page;
import com.cdw.aem.util.LinkUtil;

import java.util.List;

/**
 * Created by goutved on 08/18/2015.
 * productCode	:	12345
 * s7Image	:	/content/dam/geometrixx-outdoors/social/Avatar_3.jpg
 * s7MImage	:	/content/catalogs/geometrixx-outdoors/en/base-catalog/men/coats
 * name	:	sdfsgdaggrgrg
 * description	:	23433434sfsfsnsgalkgfangfldkhgfkgfgfdlkgagfgkflggfaglkfhgfagklhgfklgafhgflhgaglkhgglkhgdlghl
 * pctaklink	:	egrgarg
 * ctaText	:	egargrg
 * campaignid	:	dgragvreagvrfgrf
 */
public class ProductPicker {
    public final static String ELEMENTTYPE="ELEMENT_TYPE";
    public final static String ENSIGHTENPAGENAME="ENSIGHTEN_PAGE_NAME";
    public final static String COMPONENTNAME="COMPONENT_NAME";

    private static String S7ImageRoot = "s7ImageRoot";
    private String productCode;
    private String imageUrl;
    private String manufactureImage;
    private String name;
    private String url;
    private String description;
    private String pctaklink;
    private String ctaText;
    private String[] hidePrice;
    private String campaignid;
    private String eventData;
    private String eventTitle;
    private String eventType;
    private String eventHeader = "";
    private String eventCTA = "";
    private String eventImage = "";

    public String getManufactureImage() {
        return manufactureImage;
    }

    public void setManufactureImage(String manufactureImage) {
        this.manufactureImage = manufactureImage;
    }

    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    public String geImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPctaklink() {
        return pctaklink;
    }

    public void setPctaklink(String pctaklink) {
        this.pctaklink = LinkUtil.updateUrl(pctaklink);
    }

    public String getCtaText() {
        return ctaText;
    }

    public void setCtaText(String ctaText) {
        this.ctaText = ctaText;
    }

    public String getCampaignid() {
        return campaignid;
    }

    public void setCampaignid(String campaignid) {
        this.campaignid = campaignid;
    }

    public String[] getHidePrice() {
        return hidePrice;
    }

    public void setHidePrice(String[] hidePrice) {
        this.hidePrice = hidePrice;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getEventData() {
        return eventData;
    }

    public void setEventData(String eventData) {
        this.eventData = eventData;
    }

    public String getEventTitle() {
        return eventTitle;
    }

    public void setEventTitle(String eventTitle) {
        this.eventTitle = eventTitle;
    }

    public String getEventType() {
        return eventType;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
    }

    public String getEventCTA() {
        return eventCTA;
    }

    public void setEventCTA(String eventCTA) {
        this.eventCTA = eventCTA;
    }

    public String getEventHeader() {
        return eventHeader;
    }

    public void setEventHeader(String eventHeader) {
        this.eventHeader = eventHeader;
    }

    public String getEventImage() {
        return eventImage;
    }

    public void setEventImage(String eventImage) {
        this.eventImage = eventImage;
    }


    public void updateProductPicker(Page currentPage) {
        this.pctaklink = LinkUtil.updateUrl(pctaklink);
        this.url = LinkUtil.updateUrl(url);
        if (imageUrl != null && !imageUrl.isEmpty() && !imageUrl.equalsIgnoreCase("null")) {
            this.imageUrl = Utility.getSiteRootInheritedProperty(currentPage.getContentResource(), S7ImageRoot, "") + imageUrl + "?";
        }
        if (manufactureImage != null && !manufactureImage.isEmpty() && !manufactureImage.equalsIgnoreCase("null")) {
            this.manufactureImage = Utility.getSiteRootInheritedProperty(currentPage.getContentResource(), S7ImageRoot, "") + manufactureImage + "?";
        }
        if (!eventData.isEmpty() || !eventTitle.isEmpty()) {
            eventCTA = getTaggingEvent().replaceAll(ELEMENTTYPE, "CTA");
            eventImage = getTaggingEvent().replaceAll(ELEMENTTYPE, "IMG");
            eventHeader = getTaggingEvent().replaceAll(ELEMENTTYPE, "H");
        }
    }

    private String getMethodName() {
        if (eventType.equalsIgnoreCase("pEvent")) {
            return "CdwTagMan.createPromotionTag";
        }
        return "CdwTagMan.createElementPageTag";
    }

    private String getFirstParam() {
        if (eventType.equalsIgnoreCase("pEvent")) {
            return "Site Promotion";
        }
        return ENSIGHTENPAGENAME;
    }

    private String getSecondParam() {
        return COMPONENTNAME+ "|" + eventTitle + "-" + ELEMENTTYPE + "|" + eventData;
    }

    private String getTaggingEvent() {
        return getMethodName() + "(\'" + getFirstParam() + "\',\'" + getSecondParam() + "\')";
    }


}
