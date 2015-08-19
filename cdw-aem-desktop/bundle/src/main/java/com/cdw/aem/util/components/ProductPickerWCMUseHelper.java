package com.cdw.aem.util.components;

import com.adobe.cq.sightly.WCMUse;
import com.cdw.aem.util.LinkUtil;
import com.cdw.aem.util.ProductPicker;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.slf4j.LoggerFactory;

import java.lang.reflect.Type;
import java.util.List;
import java.util.logging.Logger;

/**
 * Created by goutved on 7/29/2015.
 */
public class ProductPickerWCMUseHelper extends WCMUse {

    protected org.slf4j.Logger log = LoggerFactory.getLogger(this.getClass());
    private String[] productPickerJson;

    @Override
    public void activate() throws Exception {

        productPickerJson=get("json",String[].class);
      /*  log.debug("productPicker Json string array"+get("json",String[].class));
        log.debug("productPicker Json string "+get("json",String.class));*/
    }

    public String updateProductPickerJson() {
        List<ProductPicker> productPickers = new Gson().fromJson(toJson(productPickerJson), new TypeToken<List<ProductPicker>>() {
        }.getType());
       /* log.debug("productPicker Json string"+productPickerJson);
        log.debug("productPicker Json json object "+productPickers);
        log.debug("productPicker Json converted "+ new Gson().toJson(productPickers));*/
        if(productPickers!=null&& (productPickers.size()>0)){
            for(ProductPicker  productPicker: productPickers){
                productPicker.updatePctaklink();
            }
        }

        return new Gson().toJson(productPickers);
    }
    private String toJson(String[] jsons){
       // log.debug("productPickerinside tojson" +jsons);
        String json="";
        if(jsons==null){
            return json;
        }
        for(String i:jsons){
         //   log.debug("productPicker Json string jsons" +i);
            json+=i+",";

        }
        if(json.length()>2){
          //  log.debug("productPicker exit tojson" +json);
            String output= "["+json.substring(0,json.lastIndexOf(',')) +"]";
           // log.debug("productPicker exit tojson output" +output);
            return output;
        }
        //log.debug("productPicker exit tojson" +json);
        return json;
    }
}
