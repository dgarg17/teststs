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
	private String formatPhoneNumber;

	private static String SITE_DOMAIN_PROPERTY = "siteDomain";
	private static String S7_CDW_PARTNER_LOGO_TREATMENT_PROPERTY = "s7CDWPartnerLogoTreatment";
	private static String S7_IMAGE_ROOT = "s7ImageRoot";
	private static String SERVICE_DOMAIN = "serviceDomain";
	private static String PRODUCT_SERVICE = "productService";

	private boolean isPublish =false;

	@Override
	public void activate() throws Exception {
		String propertyName = get("propertyName", String.class);
		String defaultValue = get("defaultValue",String.class);
		String phoneNumber = get("phoneno",String.class);

		if(getWcmMode().isDisabled()){
			isPublish =true;
		}
		siteRootPage = Utility.getSiteRootPage(getCurrentPage());

		siteRootPagePath = Utility.getSiteRootPath(getCurrentPage());

				formatPhoneNumber = Utility.formatPhoneNumber(phoneNumber);

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
	public String getFormatPhoneNumber(){
		return formatPhoneNumber;
	}

	public String getServiceDomain(){
		return  Utility.getSiteRootInheritedProperty(getCurrentPage().getContentResource(), SERVICE_DOMAIN, "");
	}
	public String getProductService(){
		return  Utility.getSiteRootInheritedProperty(getCurrentPage().getContentResource(), PRODUCT_SERVICE, "");
	}
	public String getS7ImageRoot(){
		String s7ImageRoot =   Utility.getSiteRootInheritedProperty(getCurrentPage().getContentResource(), S7_IMAGE_ROOT, "");
		if(s7ImageRoot.EndsWith("/")) {
			return s7ImageRoot;
		else
			return s7ImageRoot+"/";
	}
}
