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
	private static String CANONICAL_DOMAIN_PROPERTY = "canonicalDomain";
	private static String S7_CDW_PARTNER_LOGO_TREATMENT_PROPERTY = "s7CDWPartnerLogoTreatment";
	private static String S7_IMAGE_ROOT = "s7ImageRoot";
	private static String SERVICE_DOMAIN = "serviceDomain";
	private static String PRODUCT_SERVICE = "productService";
	private static String JS_API_CMS_SETTINGS_TOKEN = "jsApiCmsSettingsToken";
	private static String JS_API_CMS_SETTINGS_TOKEN_DEFAULT = "cdw";
	private static String ENSIGHTEN_BOOTSTRAP_PATH = "ensightenBootstrapPath";
	private static String ENSIGHTEN_VOUCHER_CODE = "ensightenVoucherCode";
	private static String DISABLE_ENSIGHTEN_TAGGING = "disableEnsightenTagging";
	private static String RICH_RELEVENCE_BASEURL = "richRelevenceBaseUrl";
	private static String RICH_RELEVENCE_APIKEY = "richRelevenceApiKey";
	private static String RICH_RELEVENCE_BOOTSTRAPURL = "richRelevenceBootUrl";
	
	private static String OG_TITLE_PROPERTY = "ogTitle";
	private static String OG_DESCRIPTION_PROPERTY = "ogDescription";
	private static String OG_PAGE_TYPE_PROPERTY = "ogPageType";

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
	
	public String getCanonicalDomain() {
		String canonicalDomain = Utility.getSiteRootInheritedProperty(getCurrentPage().getContentResource(), CANONICAL_DOMAIN_PROPERTY, "");
		if (canonicalDomain.endsWith("/")) canonicalDomain = canonicalDomain.substring(0, (canonicalDomain.length() - 1));
		return canonicalDomain;
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
		if(s7ImageRoot.endsWith("/")) 
			return s7ImageRoot;
		else
			return s7ImageRoot+"/";
	}
	public String getJsApiCmsSettingsToken(){
		return  Utility.getSiteRootInheritedProperty(getCurrentPage().getContentResource(),JS_API_CMS_SETTINGS_TOKEN, JS_API_CMS_SETTINGS_TOKEN_DEFAULT);
	}
	public String getEnsightenBootstrapPath(){
		return  Utility.getSiteRootInheritedProperty(getCurrentPage().getContentResource(),ENSIGHTEN_BOOTSTRAP_PATH, "");
	}
	public String getEnsightenVoucherCode(){
		return  Utility.getSiteRootInheritedProperty(getCurrentPage().getContentResource(),ENSIGHTEN_VOUCHER_CODE, "");
	}
	public String getDisableEnsightenTagging(){
		return  Utility.getSiteRootInheritedProperty(getCurrentPage().getContentResource(),DISABLE_ENSIGHTEN_TAGGING, "");
	}
	public String getRichRelevenceBaseUrl(){
		return  Utility.getSiteRootInheritedProperty(getCurrentPage().getContentResource(),RICH_RELEVENCE_BASEURL, "");
	}
	public String getRichRelevenceApiKey(){
		return  Utility.getSiteRootInheritedProperty(getCurrentPage().getContentResource(),RICH_RELEVENCE_APIKEY, "");
	}
	public String getRichRelevenceBootUrl(){
		return  Utility.getSiteRootInheritedProperty(getCurrentPage().getContentResource(),RICH_RELEVENCE_BOOTSTRAPURL, "");
	}
	public String getOpenGraphTitle(){
		String ogTitle = getCurrentPage().getProperties().get(OG_TITLE_PROPERTY,"");
		if ("".equals(ogTitle)) ogTitle = getCurrentPage().getTitle();
		return ogTitle;
	}
	public String getOpenGraphDescription(){
		String ogDescription = getCurrentPage().getProperties().get(OG_DESCRIPTION_PROPERTY,"");
		if ("".equals(ogDescription)) ogDescription = getCurrentPage().getDescription();
		return ogDescription;
	}
	public String getOpenGraphPageType(){
		return getCurrentPage().getProperties().get(OG_PAGE_TYPE_PROPERTY,"website");
	}
}
