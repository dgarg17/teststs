package com.cdw.aem.util.components;

import org.apache.commons.lang3.StringUtils;
import com.cdw.aem.components.BaseComponent;
import com.cdw.aem.util.Utility;

import com.day.cq.wcm.api.Page;


/**
 * @author Adobe
 *
 */
public class UtilityWCMUseHelper extends BaseComponent {
	
	private String siteRootPagePath;
	private String siteRootInheritedProperty;
	private Page siteRootPage;
	
	private static String SITE_DOMAIN_PROPERTY = "siteDomain";
	private static String S7_CDW_PARTNER_LOGO_TREATMENT_PROPERTY = "s7CDWPartnerLogoTreatment";
	
	private boolean isPublish =false;
	
	@Override
	public void activate() throws Exception {
		String propertyName = get("propertyName", String.class);
		String defaultValue = get("defaultValue",String.class);
			
		if(getWcmMode().isDisabled()){
			isPublish =true;
		}
		siteRootPagePath = Utility.getSiteRootPath(getCurrentPage());
		
	    siteRootPage = Utility.getSiteRootPage(getCurrentPage());
		
		siteRootInheritedProperty = null;
		if(propertyName!=null ){
			siteRootInheritedProperty = Utility.getSiteRootInheritedProperty(getCurrentPage().getContentResource(), 
											propertyName, defaultValue);
		}

	}
	
	public String getSiteRootPagePath(){
		return siteRootPagePath;
	}
			
	public String getSiteDomainInheritedProperty(){
		return Utility.getSiteRootInheritedProperty(getCurrentPage().getContentResource(), SITE_DOMAIN_PROPERTY, "");
	}
	
	public String getS7CDWPartnerLogoTreatmentInheritedProperty(){
		return Utility.getSiteRootInheritedProperty(getCurrentPage().getContentResource(), S7_CDW_PARTNER_LOGO_TREATMENT_PROPERTY, "");
	}
	
	public Page getSiteRootPage() {
		return siteRootPage;
	}

}
