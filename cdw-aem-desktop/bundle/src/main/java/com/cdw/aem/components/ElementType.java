package com.cdw.aem.components;

/**
 * Created by goutved on 10/09/2015.
 */
public enum ElementType {
    IMGAGE("IMG"),
    CTA("CTA"),
    HEADLINE("HLINE"),
    HYPERLINK("ALINK"),
    EMPTY("");

    String name;

    ElementType(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public static ElementType find(String name){
        for(ElementType  elementType:values()){
            if(elementType.getName().equalsIgnoreCase(name)){
                return elementType;
            }

        }
        return EMPTY;
    }
}
