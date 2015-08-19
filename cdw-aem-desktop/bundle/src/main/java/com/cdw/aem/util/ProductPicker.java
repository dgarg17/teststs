package com.cdw.aem.util;

import com.cdw.aem.util.LinkUtil;

/**
 * Created by goutved on 08/18/2015.
 productCode	:	12345
 s7Image	:	/content/dam/geometrixx-outdoors/social/Avatar_3.jpg
 s7MImage	:	/content/catalogs/geometrixx-outdoors/en/base-catalog/men/coats
 name	:	sdfsgdaggrgrg
 description	:	23433434sfsfsnsgalkgfangfldkhgfkgfgfdlkgagfgkflggfaglkfhgfagklhgfklgafhgflhgaglkhgglkhgdlghl
 pctaklink	:	egrgarg
 ctaText	:	egargrg
 campaignid	:	dgragvreagvrfgrf
 */
public class ProductPicker {
    private String productCode;
    private String imageUrl;
    private String manufacturerImage;
    private String name;
    private String description;
    private String pctaklink;
    private String ctaText;
    private String campaignid;

    private  String getManufacturerImage() {
        return manufacturerImage;
    }

    public void setManufacturerImage(String manufacturerImage) {
        this.manufacturerImage = manufacturerImage;
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


    public void updatePctaklink () {
        this.pctaklink = LinkUtil.updateUrl(pctaklink);
    }
}
