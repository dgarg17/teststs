package com.cdw.aem.util;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.jcr.RepositoryException;
import javax.jcr.Value;
import javax.jcr.ValueFormatException;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.day.cq.commons.inherit.HierarchyNodeInheritanceValueMap;
import com.day.cq.commons.inherit.InheritanceValueMap;
import com.day.cq.wcm.api.Page;

/**
 * @author Adobe
 *
 */
public class Utility {
	
	private static final Logger log = LoggerFactory.getLogger(Utility.class);
	
		
	/**
	 * Finds the nearest parent site root page path with respect to current page(passed as input param)
	 * 
	 * @param currentPage
	 * @return
	 */
	public static String getSiteRootPath(Page currentPage) {		
		String siteRootPath = null;
		try{
			Page siteRootPage = Utility.getSiteRootPage(currentPage);
			siteRootPath = (siteRootPage != null) ? siteRootPage.getPath() : "";
		}
		catch (Exception e) {
			log.error("Utility : Exception",e);
		}
		return siteRootPath;
	}
			
	/**
	 * Get the nearest configured property value from site root page. 
	 * Method search for the nearest parent page where property is configured.
	 * 
	 * @param resource
	 * @param propertyName
	 * @param defaultValue
	 * @return
	 */
	public static String getSiteRootInheritedProperty(Resource resource, String propertyName, String defaultValue) {
		InheritanceValueMap properties = new HierarchyNodeInheritanceValueMap(resource);
		String staticRoot = properties.getInherited(propertyName, defaultValue);
		return staticRoot;
	}
	
	/**
	 * It returns formatted phone number. If input phone number is of length 10,
	 * then it automatically adds 1 as the country code and returns number in
	 * the format "1 xxx xxx xxxx"
	 * 
	 * @param phoneNumber
	 * @return Formatted phone number string
	 */
	public static String formatPhoneNumber(String phoneNumber) {
		String formattedNumber = "";
		if (phoneNumber != null) {
			formattedNumber = String.format("%s.%s.%s",
					phoneNumber.substring(0, 3),
					phoneNumber.substring(3, 6),
					phoneNumber.substring(6, 10));		
			} 
		return formattedNumber;
	}	
	
	/**
	 * Finds the nearest parent site root page with respect to current page(passed as input param)
	 * 
	 * @param currentPage
	 * @return
	 */
	public static Page getSiteRootPage(Page currentPage) {
		Page siteRootPage = null;
		boolean siteRootTemplateFound = false;
		try {
			while (!siteRootTemplateFound && currentPage != null) {
				if (currentPage.getProperties().get("cq:template", "")
						.matches("(.*)siterootpage")) {
					siteRootTemplateFound = true;
					siteRootPage = currentPage;
				} else
					currentPage = currentPage.getParent();
			}
		} catch (Exception e) {
			log.error("Utility : Exception", e);
		}
		return siteRootPage;
	}
	
}
