/**

* @class CQ.form.rte.plugins.LinkDialogOverride

* @extends CQ.form.rte.ui.BaseWindow

* @private

* The LinkDialogOverride is a dialog for creating a link.

* It overrides /libs/cq/ui/widgets/source/widgets/form/rte/plugins/LinkDialog.js

* to let us add a title attribute to a link within the RTE.

* The primary customizations are in: constructor, dlgFromModel, & dlgToModel.

* @constructor

* Creates a new LinkDialogOverride.

* @param {Object} config The config object

*/

 

CQ.form.rte.plugins.LinkDialogOverride = CQ.Ext.extend(CQ.form.rte.ui.BaseWindow, {

 

    constructor: function(config) {

        config = config || { };

        var defaults = {

            "title": CQ.I18n.getMessage("Hyperlink"),

            "modal": true,

            "width": 700,

            "height": 300,

            "dialogItems": [ {

                    "itemId": "href",

                    "name": "href",

                    "parBrowse": true,

                    "anchor": CQ.themes.Dialog.ANCHOR,

                    "fieldLabel": CQ.I18n.getMessage("Link to"),

                    "xtype": "pathfield",

                    "ddGroups": [

                        CQ.wcm.EditBase.DD_GROUP_PAGE,

                        CQ.wcm.EditBase.DD_GROUP_ASSET

                    ],

                    "fieldDescription": CQ.I18n.getMessage("Drop files or pages from the Content Finder"),

                    "listeners": {

                        "dialogselect": {

                            "fn": this.selectAnchor,

                            "scope": this

                        },

                        "render": this.initHrefDragAndDrop

                    },

                    "validator": this.validateLink.createDelegate(this),

                    "validationEvent": "keyup",

                    "escapeAmp": true

                },

                {

                    "itemId": "title",

                    "name": "title",

                    "xtype": "textfield",

                    "fieldLabel": "Title Attribute",

                    "fieldDescription": "Add text that describes this link",

                    "width": 450,

                    "regexText": "Please no quotes in this field",

                    "regex": /^[^'"]*$/

                },

                {

                    "itemId": "targetBlank",

                    "name": "targetBlank",

                    "xtype": "checkbox",

                    "boxLabel": CQ.I18n.getMessage("Open in new window"),

                    "value": "targetBlank"

                }

            ]

        };

        CQ.Util.applyDefaults(config, defaults);

        CQ.form.rte.plugins.LinkDialog.superclass.constructor.call(this, config);

    },

 

 

    /**

     * @private

     */

    selectAnchor: function(pathfield, path, anchor) {

        // custom path + anchor handling

        path = CQ.HTTP.encodePath(path);

        // encodePath will not encode '&', so we're doing it here, as other callees of

        // encodePath might rely on that documented behaviour - see bug #30206

        path = path.replace(/&/g, "%26");

        if (anchor && (anchor.length > 0)) {

            path += ".html#" + anchor;

        }

        pathfield.setValue(path);

    },

 

 

    /**

     * <p>Note that this method is executed in the scope of the pathfield.</p>

     * @private

     */

    initHrefDragAndDrop: function() {

        if (this.ddGroups) {

            if (typeof(this.ddGroups) == "string") {

                this.ddGroups = [ this.ddGroups ];

            }

            var field = this;

            var target = new CQ.wcm.EditBase.DropTarget(this.el, {

                "notifyDrop": function(dragObject, evt, data) {

                    if (dragObject && dragObject.clearAnimations) {

                        dragObject.clearAnimations(this);

                    }

                    if (dragObject.isDropAllowed(this)) {

                        if (data.records && data.single) {

                            var record = data.records[0];

                            var path = record.get("path");

                            path = CQ.HTTP.encodePath(path);

                            // again, '&' needs to be encoded explicitly - see bug #30206

                            path = path.replace(/&/g, "%26");

                            field.setValue(path);

                            evt.stopEvent();

                            return true;

                        }

                        return false;

                    }

                }

            });

 

 

            var dialog = this.findParentByType(CQ.form.rte.plugins.LinkDialog);

            dialog.on("activate", function(dialog) {

                if (dialog && dialog.el && this.highlight) {

                    var dialogZIndex = parseInt(dialog.el.getStyle("z-index"), 10);

                    if (!isNaN(dialogZIndex)) {

                        this.highlight.zIndex = dialogZIndex + 1;

                    }

                }

            }, target);

            dialog.on("deactivate", function(dialog) {

                if (dialog && dialog.el && this.highlight) {

                    var dialogZIndex = parseInt(dialog.el.getStyle("z-index"), 10);

                    if (!isNaN(dialogZIndex)) {

                        this.highlight.zIndex = dialogZIndex + 1;

                    }

                }

            }, target);

            var editorKernel = dialog.getParameter("editorKernel");

            dialog.on("show", function() {

                editorKernel.fireUIEvent("preventdrop");

                CQ.WCM.registerDropTargetComponent(field);

            }, target);

            dialog.on("hide", function() {

                CQ.WCM.unregisterDropTargetComponent(field);

                editorKernel.fireUIEvent("reactivatedrop");

            }, target);

 

 

            for (var i = 0; i < this.ddGroups.length; i++) {

                target.addToGroup(this.ddGroups[i]);

            }

            target.removeFromGroup(CQ.wcm.EditBase.DD_GROUP_DEFAULT);

            this.dropTargets = [ target ];

        }

    },

 

 

    /**

     * Gets a field with the provided key from this panel.

     *

     * @param key Field name

     */

    getField: function(key) {

        var items = this.find("name", "./" + key);

        if( (CQ.Ext.isArray(items)) && (items.length > 0) )

            return items[0];

    },

 

 

    preprocessModel: function() {

        var showAdvanced = false;

        if (this.objToEdit && this.objToEdit.dom) {

            this.objToEdit.href = CQ.form.rte.HtmlRules.Links.getLinkHref(

                    this.objToEdit.dom);

            var com = CQ.form.rte.Common;

            var attribNames = com.getAttributeNames(this.objToEdit.dom, false,

                function(dom, attribName, attribNameLC) {

                    // exclude href, rte_href & target from generic attribute handling, as

                    // they are handled explicitly and not genrically

                    return attribNameLC == com.HREF_ATTRIB || attribNameLC == "href"

                            || attribNameLC == "target";

                });

            for (var i = 0; i < attribNames.length; i++) {

                var attribName = attribNames[i];

                var value = com.getAttribute(this.objToEdit.dom, attribName);

                if (typeof value !== 'undefined') {

                    this.objToEdit.attributes[attribName] = value;

                }

            }

            if (this.objToEdit.attributes.onclick) {

                showAdvanced = true;

            }

        }

        /**
		*
        * Leaving in the OOTB SiteCatalyst integration in here for backwards compatibility, but commenting out to avoid interference...
        *
        **/

		/*

        var advancedField = this.getField("linkdialog/cq:adhocLinkTrackingTab");

        if (advancedField) {

            if (showAdvanced) {

                advancedField.expand(false);

            } else {

                advancedField.collapse(false);

            }

        }
        */

    },

 

 

    /* dlgFromModel fires when dialog opens. Sets the values in the dialog fields. */

    dlgFromModel: function() {

        /* HREF ATTRIBUTE */

        var hrefField = this.getFieldByName("href");

        if (hrefField) {

            var value = "";

            if (this.objToEdit) {

                var href = this.objToEdit.href;

                if (href) {

                    value = href;

                }

            }

            hrefField.setValue(value);

        }

        /* TARGET ATTRIBUTE */

        var targetBlankField = this.getFieldByName("targetBlank");

        if (targetBlankField) {

            var target = (this.objToEdit && this.objToEdit.target

                    ? this.objToEdit.target.toLowerCase() : null);

            targetBlankField.setValue(target == "_blank");

        }

        /* TITLE ATTRIBUTE */

        var titleField = this.getFieldByName("title");

        if (titleField) {

            var tval = "";

            if (this.objToEdit) {

                var title = this.objToEdit.attributes.title;

                if (title) {

                    tval = title;

                }

            }

            titleField.setValue(tval);

        }

        var ensightenEnableField = this.getField("linkdialog/ensightenLinkTrackingEnableTracking");
        var eventTypeField = this.getField("linkdialog/ensightenEventType");
        var elementTitleField = this.getField("linkdialog/ensightenElementTitle");
        var eventDataField = this.getField("linkdialog/ensightenEventData");

        if (this.objToEdit) {

			var eventType = "", elementTitle = "", eventData = "", enable = false;

            var value = this.objToEdit.attributes.adhocensighteneventtype;


            if (typeof value !== 'undefined') {
                
                eventType = value;
                
            }
            
            value = this.objToEdit.attributes.adhocensightenelementtitle;

            if (typeof value !== 'undefined') {
                
                elementTitle = value;
                
            }

            value = this.objToEdit.attributes.adhocensighteneventdata;

            if (typeof value !== 'undefined') {
                
                eventData = value;
                
            }
            
            value = this.objToEdit.attributes.adhocensightenenable;
            
            if (typeof value !== 'undefined') {
                
                enable = value == "true";
                
            }

			if (eventTypeField) eventTypeField.setValue(eventType);

            if (elementTitleField) elementTitleField.setValue(elementTitle);

            if (eventDataField) eventDataField.setValue(eventData);

            if (ensightenEnableField) ensightenEnableField.setValue(enable);

            this.enableEnsightenFields(enable);
        }

        /**
		*
        * Leaving in the OOTB SiteCatalyst integration in here for backwards compatibility, but commenting out to avoid interference...
        *
        **/
		/*
        if (typeof CQ_Analytics !== 'undefined' && typeof CQ_Analytics.adhocLinkTracking !== 'undefined' && CQ_Analytics.adhocLinkTracking == "true") {

            var enableField = this.getField("linkdialog/cq:adhocLinkTrackingEnableTracking");

            var eventsField = this.getField("linkdialog/cq:adhocLinkTrackingEvents");

            var evarsField = this.getField("linkdialog/cq:adhocLinkTrackingEvars");

            if (eventsField && evarsField) {

                var events = "", evars = "", enable = false;

                if (this.objToEdit) {

                    var value = this.objToEdit.attributes.adhocevents;

                    if (typeof value !== 'undefined') {

                        events = value;

                    }

                    value = this.objToEdit.attributes.adhocevars;

                    if (typeof value !== 'undefined') {

                        evars = value;

                    }

                    value = this.objToEdit.attributes.adhocenable;

                    if (typeof value !== 'undefined') {

                        enable = value == "true";

                    }

                }

                eventsField.setValue(events);

                evarsField.setValue(evars);

                enableField.setValue(enable);

                this.enableSCFields(enable);

            }

        }

        else {

            var trackBox = this.getField("linkdialog/cq:adhocLinkTrackingTab");

            if (trackBox) {

                trackBox.hide();

            }

        }
        */

    },

 

 

    /* dlgToModel fires when OK btn is clicked. Puts field values back into the RTE. */

    dlgToModel: function() {

        if (this.objToEdit) {

            /* HREF ATTRIBUTE */

            var hrefField = this.getFieldByName("href");

            if (hrefField) {

                var href = hrefField.getValue();

                if (href) {

                    this.objToEdit.href = href;

                }

            }

            /* TARGET ATTRIBUTE */

            var targetBlankField = this.getFieldByName("targetBlank");

            if (targetBlankField) {

                if (targetBlankField.getValue()) {

                    this.objToEdit.target = "_blank";

                } else {

                    this.objToEdit.target = null;

                }

            }

            /* TITLE ATTRIBUTE */

            var titleField = this.getFieldByName("title");

            if (titleField) {

                var title = titleField.getValue();

                if (title) {

                    this.objToEdit.attributes.title = title;

                }

            }

			/**
            *
            * Leaving in the OOTB SiteCatalyst integration in here for backwards compatibility, but commenting out to avoid interference...
            *
            **/
			/*
            var enableField = this.getField("linkdialog/cq:adhocLinkTrackingEnableTracking");

            var eventsField = this.getField("linkdialog/cq:adhocLinkTrackingEvents");

            var evarsField = this.getField("linkdialog/cq:adhocLinkTrackingEvars");

            if (enableField && eventsField && evarsField) {

                this.objToEdit.attributes.adhocenable = enableField.getValue() ? "true" : "false";

                this.objToEdit.attributes.adhocevents = eventsField.getValue() || "";

                this.objToEdit.attributes.adhocevars = evarsField.getValue() || "";

                if (enableField.getValue()) {

                    this.objToEdit.attributes.onclick = "CQ_Analytics.Sitecatalyst.customTrack(this)";

                } else {

                    delete this.objToEdit.attributes.onclick;

                    if (this.objToEdit.dom && this.objToEdit.dom.attributes) {

                        CQ.form.rte.Common.removeAttribute(this.objToEdit.dom, "onclick");

                    }

                }

            }
            */

            var ensightenEnableField = this.getField("linkdialog/ensightenLinkTrackingEnableTracking");
            var eventTypeField = this.getField("linkdialog/ensightenEventType");
            var elementTitleField = this.getField("linkdialog/ensightenElementTitle");
            var eventDataField = this.getField("linkdialog/ensightenEventData");

			if (ensightenEnableField && eventTypeField && elementTitleField && eventDataField) {

                this.objToEdit.attributes.adhocensightenenable = ensightenEnableField.getValue() ? "true" : "false";

                this.objToEdit.attributes.adhocensighteneventtype = eventTypeField.getValue() || "standardClick";

                this.objToEdit.attributes.adhocensightenelementtitle = elementTitleField.getValue() || "";

                this.objToEdit.attributes.adhocensighteneventdata = eventDataField.getValue() || "";

                if (ensightenEnableField.getValue()) {

					var eventData = "Rich Text|" + this.objToEdit.attributes.adhocensightenelementtitle + "|" + this.objToEdit.attributes.adhocensighteneventdata;
					var page_name = window.cdwTagManagementData.page_name;

                    var onClickMethod = "javascript:CdwTagMan.createElementPageTag(window.cdwTagManagementData.page_name, '" + eventData + "');";

                    if ("partnerClick" == this.objToEdit.attributes.adhocensighteneventtype) {
                        onClickMethod = "javascript:CdwTagMan.createPromotionTag('Site Promotion', '" + eventData + "');";
                    }

                    this.objToEdit.attributes.onclick = onClickMethod;

                } else {

                    delete this.objToEdit.attributes.onclick;

                    if (this.objToEdit.dom && this.objToEdit.dom.attributes) {

                        CQ.form.rte.Common.removeAttribute(this.objToEdit.dom, "onclick");

                    }

                }

            }

        }

    },

 

 

    enableSCFields: function(state) {

        var eventsField = this.getField("linkdialog/cq:adhocLinkTrackingEvents");

        var evarsField = this.getField("linkdialog/cq:adhocLinkTrackingEvars");

        if(state) {

            eventsField.enable();

            evarsField.enable();

        } else {

            eventsField.disable();

            evarsField.disable();

        }

    },




    enableEnsightenFields: function(state) {

        var ensightenFieldSet = this.getField("linkdialog/ensightenLinkTrackingTab");

        var eventTypeField = this.getField("linkdialog/ensightenEventType");
        var elementTitleField = this.getField("linkdialog/ensightenElementTitle");
        var eventDataField = this.getField("linkdialog/ensightenEventData");

        if(state) {

		    if (eventTypeField) eventTypeField.enable();

            if (elementTitleField) elementTitleField.enable();

            if (eventDataField) eventDataField.enable();

            if (ensightenFieldSet) ensightenFieldSet.expand();

        } else {

            if (eventTypeField) eventTypeField.disable();

            if (eventTypeField) elementTitleField.disable();

            if (eventTypeField) eventDataField.disable();

            if (eventTypeField) ensightenFieldSet.collapse();

        }

    },

 

 

    postprocessModel: function() {

        var linkRules = this.parameters.linkRules;

        if (linkRules) {

            linkRules.applyToObject(this.objToEdit);

        }

    },

 

 

    validateLink: function() {

        var href = this.getFieldByName("href");

        if (!href) {

            return false;

        }

        href = href.getValue();

        var linkRules = this.getParameter("linkRules");

        if (!linkRules) {

            return (href.length > 0);

        }

        return linkRules.validateHref(href);

    }

 

 

});

// register LinkDialogOverride component as xtype

CQ.Ext.reg("rtelinkdialog", CQ.form.rte.plugins.LinkDialogOverride);