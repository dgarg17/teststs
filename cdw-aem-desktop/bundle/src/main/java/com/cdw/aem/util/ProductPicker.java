package com.cdw.aem.util;

import com.cdw.aem.components.ElementType;
import com.cdw.aem.components.EnsightenTaggingWCMUseHelper;
import com.day.cq.wcm.api.Page;
import com.cdw.aem.util.LinkUtil;

import java.util.List;

public class ProductPicker {


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
    private String linkTitle;
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

    public String getLinkTitle() {
        return linkTitle;
    }

    public void setLinkTitle(String linkTitle) {
        this.linkTitle = linkTitle;
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
            String taggingEvent=EnsightenTaggingWCMUseHelper.getTaggingEvent(eventData,eventTitle,eventType);
            eventCTA = taggingEvent.replaceAll(EnsightenTaggingWCMUseHelper.ELEMENTTYPE, "CTA");
            eventImage = taggingEvent.replaceAll(EnsightenTaggingWCMUseHelper.ELEMENTTYPE, "IMG");
            eventHeader = taggingEvent.replaceAll(EnsightenTaggingWCMUseHelper.ELEMENTTYPE, "H");
        }
    }
}
