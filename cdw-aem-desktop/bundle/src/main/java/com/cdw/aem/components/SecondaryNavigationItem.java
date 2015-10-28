package com.cdw.aem.components;

import com.cdw.aem.util.LinkUtil;

import java.util.Arrays;

public class  SecondaryNavigationItem {
	
	private String ctaLink;
	private String ctaText;
	private String ctaTarget = "_self";
	private String isSecondary[];
	private String eventDetails="";
	
	public String getCtaLink() {
		return LinkUtil.updateUrl(ctaLink);
	}
	
	public void setCtaLink(String ctaLink) {
		this.ctaLink = ctaLink;
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
		if (isSecondary.length > 0) {
			return true;
		} else {
			return false;
		} 
	}
	
	public void setIsSecondary(String[] isSecondary) {
		this.isSecondary = isSecondary;
	}

	public String getEventDetails() {
		return eventDetails;
	}

	public void setEventDetails(String eventDetails) {
		this.eventDetails = eventDetails;
	}

	@Override
	public String toString() {
		return "SecondaryNavigationItem{" +
				"ctaLink='" + ctaLink + '\'' +
				", ctaText='" + ctaText + '\'' +
				", ctaTarget='" + ctaTarget + '\'' +
				", isSecondary=" + Arrays.toString(isSecondary) +
				", eventDetails='" + eventDetails + '\'' +
				'}';
	}
}