package com.cdw.aem.components;

import com.cdw.aem.util.LinkUtil;

/**
 * Created by goutved on 11/20/2015.
 */
public class FooterLink {
    private String link;
    private String title;

    public FooterLink(String link, String title) {
        this.link = link;
        this.title = title;
    }

    public String getLink() {
        return LinkUtil.updateUrl(link);
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Override
    public String toString() {
        return "FooterLink{" +
                "link='" + link + '\'' +
                ", title='" + title + '\'' +
                '}';
    }
}
