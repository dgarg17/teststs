package com.cdw.aem.components;

import com.adobe.cq.sightly.WCMUse;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;


public class FeaturedContentWCMUseHelper  extends WCMUse { 

    protected Logger log = LoggerFactory.getLogger(this.getClass());
  
            private String img1;
            private String img2;
            private String img3;
            private String txtcssClass;
            private String imgcssClass;
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

             public String getTxtcssClass() {
                if(img1!="" && img2!="" && img3!="")
                         txtcssClass = "layout-6 ";                
                else if((img1!="" && img2=="" && img3!="") || (img1=="" && img2!="" && img3!="") || (img1!="" && img2!="" && img3==""))
                     txtcssClass = "layout-6 ";
                else
                    txtcssClass = "layout-8 ";
                
                return txtcssClass;
            }
         public String getImgcssClass() {
                if(img1!="" && img2!="" && img3!="")
                         imgcssClass = "layout-6 -three";                
                else if((img1!="" && img2=="" && img3!="") || (img1=="" && img2!="" && img3!="") || (img1!="" && img2!="" && img3==""))
                     imgcssClass = "layout-6 -two";
                else
                    imgcssClass = "layout-4 -one";
                
                return imgcssClass;
            }

        }