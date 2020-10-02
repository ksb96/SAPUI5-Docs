sap.ui.controller("view1.initial", {
    onInit: function(oEvent) {
        
    },
    
    onPress: function(oEvent) {
    	if (!this._oDialogFrame) {
      	var sDialogId = this.getView().createId("dialog");
        this._oDialogFrame = new sap.m.Dialog(sDialogId, {
          draggable: true,
          resizable: true,
          showHeader: true,
          stretch: false,
          contentWidth: "300rem",
          type: sap.m.DialogType.Standard,
          buttons: [
            new sap.m.Button({
              text: "Close",
              press: function(oEvent) {
                this._oDialogFrame.close();
              }.bind(this)
            })
          ]
        });
				
        var sIframeId = this.getView().createId("iFrame");
						
        this._oIFrameObject = new sap.ui.core.HTML(sIframeId, {
          preferDOM: true,
          sanitizeContent: true,
          content: "<iframe width='100%' src='https://sapui5.hana.ondemand.com/explored.html#/sample/sap.ui.core.sample.Html/preview'></iframe>"
        });
        
        this._oDialogFrame.addContent(this._oIFrameObject);

        this.getView().addDependent(this._oDialogFrame);
    	}
      
      this._oDialogFrame.open();
    }
});

var app = new sap.m.App({});

var oView = sap.ui.xmlview({
    viewContent: jQuery("#view1").html()
});

app.addPage(oView);
app.placeAt("uiArea");