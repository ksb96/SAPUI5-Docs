sap.ui.define([

	"com/product/ZProductList/controller/BaseController"

], function (BaseController) {
	"use strict";

	return BaseController.extend("com.product.ZProductList.controller.View1", {
		onInit: function () {

		},
		onPress: function () {
			this.getRouter().navTo("RouteView2");
		}

	});
});