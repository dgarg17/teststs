package com.cdw.aem.util;

import com.day.cq.wcm.api.Page;


public class LinkList {

    private String ctalabel;
    private String ctalink;
    private String ctatarget="_blank";
    private String eventDetails="";
    private String modelTaggingParam;


    public String getCtalabel() {
        return ctalabel;
    }

    public void setCtalabel(String ctalabel) {
        this.ctalabel = ctalabel;
    }

    public String getCtalink() {
        return  LinkUtil.updateUrl(ctalink);
    }

    public void setCtalink(String ctalink) {
        this.ctalink = ctalink;
    }

    public String getCtatarget() {
        return ctatarget;
    }

    public void setCtatarget(String ctatarget) {
        this.ctatarget = ctatarget;
    }

    public String getEventDetails() {
        return eventDetails;
    }

    public void setEventDetails(String eventDetails) {
        this.eventDetails = eventDetails;
    }

    public String getModelTaggingParam() {
        return modelTaggingParam;
    }

    public void setModelTaggingParam(String modelTaggingParam) {
        this.modelTaggingParam = modelTaggingParam;
    }
}
