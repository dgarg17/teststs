package com.cdw.aem.util;

import com.day.cq.wcm.api.Page;


public class SubCategoryProductLink {

    private String ctalabel;
    private String ctalink;
    private String ctatarget="_blank";

    public String getCtalabel() {
        return ctalabel;
    }

    public void setCtalabel(String ctalabel) {
        this.ctalabel = ctalabel;
    }

    public String getCtalink() {
        return ctalink;
    }

    public void setCtalink(String ctalink) {
        this.ctalink = ctalink;
    }

    public String getCtatarget() {
        return LinkUtil.updateUrl(ctalink);
    }

    public void setCtatarget(String ctatarget) {
        this.ctatarget = ctatarget;
    }

}
