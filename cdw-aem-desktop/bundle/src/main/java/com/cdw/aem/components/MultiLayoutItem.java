package com.cdw.aem.components;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.cdw.aem.components.MultiLayoutSubSectionItem;

public class  MultiLayoutItem {
	
	public String sectionTitle = "";
	public String sectionId = "";
	public String layout = "";
	public List<MultiLayoutSubSectionItem> subSections;
	
	public String getSectionTitle() {
		return sectionTitle;
	}
	
	public void setSectionTitle(String sectionTitle) {
		this.sectionTitle = sectionTitle;
	}
	
	public String getSectionId() {
		return sectionId;
	}
	
	public void setSectionId(String sectionId) {
		this.sectionId = sectionId;
	}
	
	public String getLayout() {
		return layout;
	}
	
	public void setLayout(String layout) {
		this.layout = layout;
		String[] tempSplit = layout.split("|");
		subSections = new ArrayList<MultiLayoutSubSectionItem>();
		for (int i=0; i < tempSplit.length(); i ++) {
			subSections.add(new MultiLayoutSubSectionItem(tempSplit[i], sectionId, i));
		}
	}
	
	public List<MultiLayoutSubSectionItem> getSubSections() {
		return subSections;
	}
	
}