var oLayout = new sap.ui.commons.layout.MatrixLayout({
	id : "matrix1",
	layoutFixed : false
	});

	var oText1 = new sap.ui.commons.Label({
	text: "Customer Number"
	});

	var oInput1 = new sap.ui.commons.TextField("oInput1",{change:function(oEvent){
										var oValue = oEvent.getParameter("newValue");
										var oTable = sap.ui.getCore().byId("oTable");
										var filters=[];
										var oFilter1 = new sap.ui.model.Filter("Customer", sap.ui.model.FilterOperator.EQ, oValue);  
										filters = [oFilter1];  
										oTable.getBinding("rows").filter(filters, "Application");		
										}});

oLayout.createRow( oText1, oInput1);	

	var aData = [
	{Customer: "1", Country: "IN", Name: "Anand Krishna", Address: "22950"},
	{Customer: "2", Country: "IN", Name: "Sasthy", Address: "22953"},
	{Customer: "3", Country: "ES", Name: "Sasthy", Address: "22954"},
	{Customer: "4", Country: "FR", Name: "Rajesh Sawant", Address: "22958"},
	{Customer: "5", Country: "FR", Name: "Mayank", Address: "22959"}
];

//Create an instance of the table control
var oTable2 = new sap.ui.table.Table("oTable",{
	visibleRowCount: 5,
	selectionMode: sap.ui.table.SelectionMode.Single
});

//Define the columns and the control templates to be used
oTable2.addColumn(new sap.ui.table.Column({
	label: new sap.ui.commons.Label({text: "Customer"}),
	template: new sap.ui.commons.TextView().bindProperty("text", "Customer"),
	sortProperty: "Customer",
	filterProperty: "Customer",
	width: "200px"
}));

oTable2.addColumn(new sap.ui.table.Column({
	label: new sap.ui.commons.Label({text: "Country"}),
	template: new sap.ui.commons.TextView().bindProperty("text", "Country"),
	sortProperty: "Country",
	filterProperty: "Country",
	width: "200px"
}));
oTable2.addColumn(new sap.ui.table.Column({
	label: new sap.ui.commons.Label({text: "Name"}),
	template: new sap.ui.commons.TextView().bindProperty("text", "Name"),
	sortProperty: "Name",
	filterProperty: "Name",
	width: "200px",
	hAlign: "Center"
}));
oTable2.addColumn(new sap.ui.table.Column({
	label: new sap.ui.commons.Label({text: "Address"}),
	template: new sap.ui.commons.TextView().bindProperty("text", "Address"),
	sortProperty: "Address",
	filterProperty: "Address",
	width: "400px"
}));

//Create a model and bind the table rows to this model
var model = new sap.ui.model.json.JSONModel();
		model.setData({
			modelData: {
			employeesData : {}
			}
			});
	sap.ui.getCore().setModel(model);
sap.ui.getCore().getModel().setProperty("/modelData/employeesData", aData);
oTable2.bindRows("/modelData/employeesData");

var ovLayout = new sap.ui.layout.VerticalLayout("Layout1", {
	content: [oTable2,oLayout]
});

     ovLayout.placeAt("uiArea");