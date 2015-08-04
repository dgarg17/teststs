package com.cdw.aem.util.components;

import com.adobe.cq.sightly.WCMUse;
import com.cdw.aem.util.LinkUtil;

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
}
