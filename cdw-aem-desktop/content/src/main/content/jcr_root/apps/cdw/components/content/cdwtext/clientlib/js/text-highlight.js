CQ.Ext.ns("ExperienceAEM");

ExperienceAEM.TextHighlight = {
    ADD_HIGHLIGHT_CMD : "addhighlight"
};

ExperienceAEM.TextHighlight.Plugin = new Class({
    toString: "TextHighlightPlugin",
    extend: CUI.rte.plugins.Plugin,
    P: ExperienceAEM.TextHighlight,

    addPickerUI: null,

    getFeatures: function() {
        return [ this.P.ADD_HIGHLIGHT_CMD ];
    },

    initializeUI: function(tbGenerator) {
        var plg = CUI.rte.plugins;

        if (this.isFeatureEnabled(this.P.ADD_HIGHLIGHT_CMD)) {
            this.addPickerUI = tbGenerator.createElement(this.P.ADD_HIGHLIGHT_CMD, this, true, "Add Highlight");
            tbGenerator.addElement("format", plg.Plugin.SORT_FORMAT,this.addPickerUI,1000);
        }
    },

    execute: function(cmd, value, env) {
        if (cmd == this.P.ADD_HIGHLIGHT_CMD) {
            this.showDialog(env.editContext);
        }
    },

	showDialog: function(context) {
	    var editorKernel = this.editorKernel, dm = editorKernel.getDialogManager();
        var config = this.config;

        var colorField = new CQ.form.ColorField({
            fieldLabel: "Highlight Color",
            showHexValue: true
        });

        if(config){
            if(config.defaultColor){
				colorField.defaultColor = config.defaultColor;
				colorField.value = config.defaultColor;
            }

            if(config.colors && config.colors.length > 0){
                colorField.colors = config.colors;
            }
        }

        var dialogConfig = {
            "jcr:primaryType": "cq:Dialog",
            title: "Text Highlight",
            modal: true,
            width: 400,
            height: 250,
            items: [ {
                    xtype: "panel",
                    layout: "form",
                    padding: "20px 0 0 10px",
                    items: [ colorField ]
            }],
            ok: function() {
                this.close();

                var sColor = colorField.getValue();

                if(sColor){
                    editorKernel.relayCmd(ExperienceAEM.TextHighlight.ADD_HIGHLIGHT_CMD, sColor );
                }
            }
        };
		
        var removeBtn = new CQ.Ext.Button( {
            text: "Remove Highlight Color",
            width: 150,
            tooltip: 'Remove applied color and close dialog',
            handler: function(){
                this.close();
                editorKernel.relayCmd(ExperienceAEM.TextHighlight.ADD_HIGHLIGHT_CMD);
            }
        });

        dialogConfig.buttons = [
            removeBtn,
            CQ.Dialog.OK,
            CQ.Dialog.CANCEL
        ];

        dm.show(CQ.WCM.getDialog(dialogConfig));
    },

    notifyPluginConfig: function(pluginConfig) {
        pluginConfig = pluginConfig || { };

        CUI.rte.Utils.applyDefaults(pluginConfig, {
            "tooltips": {
                "addhighlight": {
                    "title": "Add Text Highlight",
                    "text": "Add Text Highlight"
                }
            }
        });

        this.config = pluginConfig;
    },

    updateState: function(selDef) {
        if(this.addPickerUI){
            this.addPickerUI.setSelected(false);
        }
    }
});

CUI.rte.plugins.PluginRegistry.register("texthighlight", ExperienceAEM.TextHighlight.Plugin);

ExperienceAEM.TextHighlight.Cmd = new Class({
    toString: "TextHighlight",
    extend: CUI.rte.commands.Command,

    P: ExperienceAEM.TextHighlight,

    isCommand: function(cmdStr) {
        return (cmdStr == this.P.ADD_HIGHLIGHT_CMD);
    },

    getProcessingOptions: function() {
        var cmd = CUI.rte.commands.Command;
        return cmd.PO_SELECTION | cmd.PO_NODELIST;
    },

    addHighlight: function(execDef){
        var nodeList = execDef.nodeList,
            selection = execDef.selection;

        if(!nodeList || !selection){
            return;
        }

        try{
            nodeList.removeNodesByTag(execDef.editContext, "span", undefined, true);

            if(!execDef.value){
                return;
            }

            nodeList.surround(execDef.editContext, "span", { style: "background-color:#" + execDef.value } );
        }catch(err){
            console.log("Error applying or removing highlight - " + err);
        }
    },

    execute: function(execDef) {
        if(execDef.command == this.P.ADD_HIGHLIGHT_CMD){
            this.addHighlight(execDef);
        }
    }
});

CUI.rte.commands.CommandRegistry.register("texthighlight", ExperienceAEM.TextHighlight.Cmd);