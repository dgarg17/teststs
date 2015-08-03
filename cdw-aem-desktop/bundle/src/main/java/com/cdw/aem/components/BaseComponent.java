package com.cdw.aem.components;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.cq.sightly.WCMUse;

// this class defined for future purpose whic can be defined all common functionality

public class BaseComponent extends WCMUse {
	protected Logger log = LoggerFactory.getLogger(this.getClass());
    
	private boolean hasContent; 
    public BaseComponent() {} // Default constructor
	@Override
    public void activate() throws Exception{
	
	}
	public boolean hasContent() {
		return hasContent;
	}
	public void setHasContent(boolean hasContent) {
		this.hasContent = hasContent;
	}
	
}
