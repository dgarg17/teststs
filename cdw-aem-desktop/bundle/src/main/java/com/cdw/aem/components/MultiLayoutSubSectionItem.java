package com.cdw.aem.components;

public class MultiLayoutSubSectionItem {
	
	public String layoutClass = "layout-12";
	public String parsysPath = "";
	
	public MultiLayoutSubSectionItem(String layoutClass, String sectionId, int index) {
		this.layoutClass = layoutClass;
		this.parsysPath = "section-" + sectionId + "/col-" + index + "-par";
	}
	
	public String getLayoutClass() {
		return layoutClass;
	}
	
	public String getParsysPath() {
		return parsysPath;
	}
	
}