sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function(Controller) {
  "use strict";

  return Controller.extend("demo.controller.Table", {
    onAddPress: function() {
      var model = this.getOwnerComponent().getModel();
      var currentRows = model.getProperty("/");
      var newRows = currentRows.concat(this.createEntry());
      model.setProperty("/", newRows);
    },

    createEntry: function() {
      return {
        foo: {
          selectedKey: "",
          items: [{
            key: "1",
            text: "Item 1-1",
          }, {
            key: "2",
            text: "Item 1-2",
          }, {
            key: "3",
            text: "Item 1-3",
          }],
        },
        bar: {
          selectedKey: "",
          items: [{
            key: "1",
            text: "Item 2-1",
          }, {
            key: "2",
            text: "Item 2-2",
          }, {
            key: "3",
            text: "Item 2-3",
          }]
        }
      };
    },

    getDataFromSelectedRows: function(table, path) {
      return table.getSelectedIndices().map(function(index) {
        return table.getContextByIndex(index).getProperty(path);
      });
    },

  });
});