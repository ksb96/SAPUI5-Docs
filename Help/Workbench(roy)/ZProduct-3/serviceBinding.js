function initModel() {
	var sUrl = "/northwind/V2/(S(pxuybden2lk5rcqasgnxqlic))/OData/OData.svc/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}