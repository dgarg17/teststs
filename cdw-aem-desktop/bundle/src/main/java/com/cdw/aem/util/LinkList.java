package com.cdw.aem.util;

import com.day.cq.wcm.api.Page;


public class LinkList {

    private String ctalabel;
    private String ctalink;
    private String ctatarget="_blank";
    private String eventSelect="";
    private String eventHeater="";

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

    public String getEventSelect() {
        return eventSelect;
    }

    public void setEventSelect(String eventSelect) {
        this.eventSelect = eventSelect;
    }

    public String getEventHeater() {
        return eventHeater;
    }

    public void setEventHeater(String eventHeater) {
        this.eventHeater = eventHeater;
    }

    @Override
    public String toString() {
        return "LinkList{" +
                "ctalabel='" + ctalabel + '\'' +
                ", ctalink='" + ctalink + '\'' +
                ", ctatarget='" + ctatarget + '\'' +
                ", eventSelect='" + eventSelect + '\'' +
                ", eventHeater='" + eventHeater + '\'' +
                '}';
    }
}
