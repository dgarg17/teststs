package com.cdw.aem.components;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.Node;

public class YouTubeVideoItem {
	
	private String videoId = "";
	private String heroImagePath = "";
	private String headlineText = "";
	private String videoTitle = "";
	private String videoSummary = "";
	private String trackingId = "";
	private String thumbnailImagePath = "";
	
	YouTubeVideoItem(Node node) throws Exception {
		if (node != null) {
			if (node.hasProperty("videoId")) videoId = node.getProperty("videoId").getString();
			heroImagePath = thumbnailImagePath = heroImagePath = node.getPath().replace("/jcr:content/", "/_jcr_content/") + "/thumbnailImage.img.png";
			if (node.hasNode("heroImage")) heroImagePath = node.getPath().replace("/jcr:content/", "/_jcr_content/") + "/heroImage.img.png";
			if (node.hasProperty("headlineOne")) headlineText = node.getProperty("headlineOne").getString();
			if (node.hasProperty("headlineOne") && node.hasProperty("headlineTwo")) headlineText += " <span class='ico-and'></span> ";
			if (node.hasProperty("headlineTwo")) headlineText += node.getProperty("headlineTwo").getString();
			if (node.hasProperty("videoTitle")) videoTitle = node.getProperty("videoTitle").getString();
			if (node.hasProperty("videoSummary")) videoSummary = node.getProperty("videoSummary").getString();
			if (node.hasProperty("trackingId")) trackingId = node.getProperty("trackingId").getString();
		}
	}
	
	public String getVideoId() {
		return videoId;
	}
	public String getHeroImagePath() {
		return heroImagePath;
	}
	public String getHeadlineText() {
		return headlineText;
	}
	public String getVideoTitle() {
		return videoTitle;
	}
	public String getVideoSummary() {
		return videoSummary;
	}
	public String getTrackingId() {
		return trackingId;
	}
	public String getThumbnailImagePath() {
		return thumbnailImagePath;
	}
	
}