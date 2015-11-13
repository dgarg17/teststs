package com.cdw.aem.components;

import com.adobe.cq.sightly.WCMUse;
import com.day.cq.wcm.api.Page;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;

public class BreadCrumbsWCMUseHelper extends WCMUse {
    private List<BreadCrumbsItem> breadCrumbItems;
    private String delimStr;
    private String trailStr;
    protected Logger log = LoggerFactory.getLogger(this.getClass());

    @Override
    public void activate() throws Exception {
        breadCrumbItems = new ArrayList<BreadCrumbsItem>();
        long level = getCurrentStyle().get("absParent", 2L);
        long endLevel = getCurrentStyle().get("relParent", 1L);
        delimStr = getCurrentStyle().get("delim", ">");
        trailStr = getCurrentStyle().get("trail", "");
        int currentLevel = getCurrentPage().getDepth();
        while (level < currentLevel - endLevel) {
            Page trail = getCurrentPage().getAbsoluteParent((int) level);
            if (trail == null) {
                break;
            }
            String title = trail.getNavigationTitle();
            if (title == null || title.equals("")) {
                title = trail.getNavigationTitle();
            }
            if (title == null || title.equals("")) {
                title = trail.getTitle();
            }
            if (title == null || title.equals("")) {
                title = trail.getName();
            }
            if (level+1== currentLevel) {
                breadCrumbItems.add(new BreadCrumbsItem(null, title));
            } else {
                breadCrumbItems.add(new BreadCrumbsItem(trail.getPath() + ".html", title));
            }
            level++;
        }
    }

    public List<BreadCrumbsItem> getBreadCrumbItems() {
        return breadCrumbItems;
    }

    public String getDelimStr() {
        return delimStr;
    }

    public String getTrailStr() {
        return trailStr;
    }

    public boolean isEnabled(){
      String enabled= (String)getCurrentPage().getProperties().get("enableBreadcrumbs");
        return enabled!=null&&enabled.equalsIgnoreCase("true");

    }
}