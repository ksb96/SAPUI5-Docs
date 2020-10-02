sap.ui.define([
  "sap/ui/model/SimpleType",
], Type => Type.extend('demo.model.type.NumericBoolean', {
  constructor: function() { Type.apply(this, arguments); },
  formatValue: iValue => !!+iValue,
  parseValue: bValue => (bValue ? 1 : 0),
  validateValue: vValue => { /*validate...*/ },
}));
