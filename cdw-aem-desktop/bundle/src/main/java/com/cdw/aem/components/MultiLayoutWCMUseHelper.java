package com.cdw.aem.components;

import com.adobe.cq.sightly.WCMUse;
import com.cdw.aem.components.MultiLayoutItem;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;

import java.util.List;

public class MultiLayoutWCMUseHelper extends WCMUse {

    protected Logger log = LoggerFactory.getLogger(this.getClass());

	private List<MultiLayoutItem> sections;
	private String[] sectionsJson;
	
	@Override
    public void activate() throws Exception {
		sectionsJson = get("json", String[].class);
        if (sectionsJson == null) {
			sectionsJson = new String[1];
            sectionsJson[0] = get("json", String.class);
        }
		initSections();
	}
	
	private void initSections() {
		sections = new Gson().fromJson(concatJson(sectionsJson), new TypeToken<List<MultiLayoutItem>>() {
        }.getType());
		for (MultiLayoutItem section : sections) {
			try{
				section.initSubSections(log);
			} catch (Exception e) {
				log.error("Caught Exception Initializing SubSections", e);
			}
			
		}
	}
	
	private String concatJson(String[] jsonArray) {

        String json = "";
        if (jsonArray == null || jsonArray.length < 1) {
            return json;
        } else if (jsonArray.length == 1) {
            return "["+jsonArray[0]+"]";
        }
        for (String i : jsonArray) {
            json += i + ",";
        }
        json = json.substring(0, json.lastIndexOf(','));

    	return"["+json+"]";

    }

	public List<MultiLayoutItem> getSections(){
		return sections;
	}
}