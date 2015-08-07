package com.cdw.aem.util.components;

import com.adobe.cq.sightly.WCMUse;
import com.cdw.aem.util.LinkUtil;
import com.day.cq.wcm.api.Page;

/**
 * Created by goutved on 7/29/2015.
 */
public class LinkUtilWCMUseHelper extends WCMUse {

    private LinkUtil linkUtil=new LinkUtil();
    private String url;

    @Override
    public void activate() throws Exception {

        url=get("url",String.class);
    }

    public String urlUpdate(){
        return linkUtil.updateUrl(url);
    }
    
    public String getHeaderLinkLabel() {
    	
		return linkUtil.getLinkLabel(url,getPageManager());
	}

}
