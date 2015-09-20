package com.cdw.aem.components;

import com.adobe.cq.sightly.WCMUse;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;


public class CssClassHelper extends WCMUse {

    protected Logger log = LoggerFactory.getLogger(this.getClass());
  
			private String img1;
		    private String img2;
		    private String img3;
		    private String cssClass;
		    @Override
		    public void activate() throws Exception {
		        img1 = getProperties().get("scene7filename1", "");
		        img2 = getProperties().get("scene7filename2", "");
		        img3 = getProperties().get("scene7filename3", "");
		     }
		    public String getImg1() {
		        return img1;
		    }		  
		    public String getImg2() {
		        return img2;
		    }
		    public String getImg3() {
		        return img3;
		    }		  
		    public String getCssClass() {
		        if(img1!="" && img2!="" && img3!="")
		                 cssClass = "-three";		        
		        else if((img1!="" && img2=="" && img3!="") || (img1=="" && img2!="" && img3!="") || (img1!="" && img2!="" && img3==""))
	                 cssClass = "-two";
		        else
		        	cssClass = "-one";
		        
		        return cssClass;
		    }
		}