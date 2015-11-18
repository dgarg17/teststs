package com.cdw.aem.components;

import com.adobe.cq.sightly.WCMUse;
import com.cdw.aem.components.YouTubeVideoItem;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.ArrayList;
import javax.jcr.Node;
import javax.jcr.NodeIterator;

public class YouTubePlaylistWCMUseHelper extends WCMUse {
	
	protected Logger log = LoggerFactory.getLogger(this.getClass());
	
	private Boolean hasData = false;
	private List<YouTubeVideoItem> videos = new ArrayList<YouTubeVideoItem>();
	
	@Override
    public void activate() throws Exception {
		Node currentNode = getResource().adaptTo(Node.class);
		if (currentNode != null && currentNode.hasNodes()) {
			hasData = true;
			NodeIterator nodes = currentNode.getNodes();
			while (nodes.hasNext()) {
				Node node = nodes.nextNode();
				if (node != null) {
					YouTubeVideoItem item = new YouTubeVideoItem(node);
					videos.add(item);
				}
			}
		}
    }
	
	public Boolean getHasData() {
		return hasData;
	}
	
	public List<YouTubeVideoItem> getVideos() {
		return videos;
	}
}