sap.ui.define([
	"jquery.sap.global",
	"com/product/ZProductList/controller/BaseController",
	"sap/m/MessageBox"
], function (jquery, BaseController, MessageBox) {
	"use strict";

	return BaseController.extend("com.product.ZProductList.controller.View1", {
		onInit: function () {
			this.oService = this.getOwnerComponent().getModel();
			// this.sServiceUrl = this.getOwnerComponent().getModel().sServiceUrl;
			// this.oDefaultModel = new sap.ui.model.odata.ODataModel(this.sServiceUrl);
			this.OnEmployeeListCall();
			this.oDialog = new sap.m.BusyDialog();
			this.oDialog.open();
		},
		//GET
		OnEmployeeListCall: function () {
			this.oService.read("/Products", {
				success: jQuery.proxy(this._fnSuccessGet, this),
				error: jQuery.proxy(this._fnErrorGet, this)
			});
		},
		//function for success call
		_fnSuccessGet: function (odata, response) {
			this.oDialog.close();
			var oModel = new sap.ui.model.json.JSONModel(odata);
			var oList = this.getView().byId("productList");
			oList.setModel(oModel);

		},
		//function for error call
		_fnErrorGet: function (err) {
			this.oDialog.close();
			jQuery.sap.require("sap.m.MessageBox");
			sap.m.MessageBox.show("Error : not successful", sap.m.MessageBox.Icon.ERROR);
		},

		onRowPress: function (Evt) {
			var oItem, oCtx;
			oItem = Evt.getSource();
			oCtx = oItem.getBindingContext();

			this.getRouter().navTo("RouteView2", {
				productId: oCtx.getProperty("ID")
			});
		},
				//POST
				onLinkPress: function () {
					var oView = this.getView();
					if (!this.F4NewRecord) {
						this.F4NewRecord = sap.ui.xmlfragment(oView.getId(), "com.product.ZProductList.view.Fragment.newRecord", this);
						this.getView().addDependent(this.F4NewRecord);
		
					}
					this.F4NewRecord.open();
				},
				onCloseF4NewRecord: function () {
		
					if (this.F4NewRecord) {
		
						this.F4NewRecord.close();
					}
				},
				onNewRecordSave: function () {
		
					var that = this;
		
					var oID = that.getView().byId("idinputid").getValue();
					var oName = that.getView().byId("idinputname").getValue();
					var oDesc = that.getView().byId("idinputdesc").getValue();
					var oRelDate = that.getView().byId("DTP3").getDateValue();
					var oRating = that.getView().byId("idinputrating").getValue();
					var oPrice = that.getView().byId("idinputprice").getValue();
		
					var sString = "/Products";
					var newItem = {};
					newItem.ID = oID;
					newItem.Name = oName;
					newItem.Description = oDesc;
					newItem.ReleaseDate = oRelDate;
					newItem.Rating = oRating;
					newItem.Price = oPrice;
					this.sServiceUrl = this.getOwnerComponent().getModel().sServiceUrl;
					this.oDefaultModel = new sap.ui.model.odata.ODataModel(this.sServiceUrl);
		
					this.oDefaultModel.create(sString, newItem, null,
						function (oData, oResponse) {
		
							jQuery.sap.require("sap.m.MessageBox");
							sap.m.MessageBox.show("Saving", sap.m.MessageBox.Icon.SUCCESS);
		
							that.OnEmployeeListCall();
							//	that.oService.setRefreshAfterChange(true);
		
						},
						function (dataError) {
							var errorMsg;
							errorMsg = JSON.parse(dataError.response.body);
							errorMsg = errorMsg.error.message.value;
		
							if (errorMsg.length > 0) {
								jQuery.sap.require("sap.m.MessageBox");
								sap.m.MessageBox.show(errorMsg, sap.m.MessageBox.Icon.ERROR);
							} else {
								jQuery.sap.require("sap.m.MessageBox");
								sap.m.MessageBox.show("Error : not successful", sap.m.MessageBox.Icon.ERROR);
							}
		
						}
		
					);
					this.F4NewRecord.close();
				}
			});
		});