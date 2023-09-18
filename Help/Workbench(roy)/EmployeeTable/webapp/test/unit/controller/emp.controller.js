/*global QUnit*/

sap.ui.define([
	"employee/EmployeeTable/controller/emp.controller"
], function (Controller) {
	"use strict";

	QUnit.module("emp Controller");

	QUnit.test("I should test the emp controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});