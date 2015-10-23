package com.cdw.aem.util.components;

import com.adobe.cq.sightly.WCMUse;
import com.cdw.aem.util.ProductPicker;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.slf4j.LoggerFactory;

import java.util.List;

/**
 * Created by goutved on 7/29/2015.
 */
public class ProductPickerWCMUseHelper extends WCMUse {

    protected org.slf4j.Logger log = LoggerFactory.getLogger(this.getClass());
    private String[] productPickerJson;

    @Override
    public void activate() throws Exception {

        productPickerJson = get("json", String[].class);
        if (productPickerJson == null) {
            productPickerJson = new String[1];
            productPickerJson[0] = get("json", String.class);
        }
    }

    public String updateProductPickerJson() {
        List<ProductPicker> productPickers = new Gson().fromJson(concatJson(productPickerJson), new TypeToken<List<ProductPicker>>() {
        }.getType());
        if (productPickers != null && (productPickers.size() > 0)) {
            for (ProductPicker productPicker : productPickers) {
                productPicker.updateProductPicker(getCurrentPage());
            }
        } else {
            return null;
        }
        String currentPageTitle = getCurrentPage().getProperties().get("ensightenPageName", String.class);
        if (currentPageTitle == null) {
            currentPageTitle = "";
        }
        return (new Gson().toJson(productPickers)).replaceAll(ProductPicker.COMPONENTNAME, getComponent().getName())
                .replaceAll(ProductPicker.ENSIGHTENPAGENAME, currentPageTitle)
                .replaceAll("\"", "'");
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
}
