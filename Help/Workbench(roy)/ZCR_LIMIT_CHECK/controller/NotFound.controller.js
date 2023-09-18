sap.ui.define([
		"roitech/customer/controller/BaseController"
	], function (BaseController) {
		"use strict";

		return BaseController.extend("roitech.customer.controller.NotFound", {

			/**
			 * Navigates to the worklist when the link is pressed
			 * @public
			 */
			onLinkPressed : function () {
				this.getRouter().navTo("worklist");
			}

		});

	}
);