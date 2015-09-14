package com.cdw.aem.components;

import com.cdw.aem.util.LinkUtil;

public class SecondaryNavigationItem {
	
	private String ctaLink;
	private String ctaText;
	private String ctaTarget = "_self";
	private String isSecondary = "false";
	
	public String getCtaLink() {
		return ctaLink;
	}
	
	public void setCtaLink(String ctaLink) {
		this.ctaLink = LinkUtil.updateUrl(ctaLink);
	}
	
	public String getCtaText() {
		return ctaText;
	}
	
	public void setCtaText(String ctaText) {
		this.ctaText = ctaText;
	}
	
	public String getCtaTarget() {
		return ctaTarget;
	}
	
	public void setCtaTarget(String ctaTarget) {
		this.ctaTarget = ctaTarget;
	}
	
	public Boolean getIsSecondary() {
		return ("true".equals(isSecondary));
	}
	
	public void setIsSecondary(String isSecondary) {
		this.isSecondary = isSecondary;
	}
}