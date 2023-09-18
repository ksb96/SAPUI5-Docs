/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.require("sap.ca.scfld.md.controller.BaseDetailController");jQuery.sap.require("hcm.emp.myleaverequests.utils.Formatters");jQuery.sap.require("hcm.emp.myleaverequests.utils.UIHelper");jQuery.sap.require("hcm.emp.myleaverequests.utils.DataManager");jQuery.sap.require("sap.m.MessageBox");jQuery.sap.require("sap.ca.ui.dialog.factory");sap.ca.scfld.md.controller.BaseDetailController.extend("hcm.emp.myleaverequests.view.S6B",{extHookChangeFooterButtons:null,extHookWithdrawDialogContent:null,extHookDetailView:null,onInit:function(){sap.ca.scfld.md.controller.BaseDetailController.prototype.onInit.call(this);this.resourceBundle=this.oApplicationFacade.getResourceBundle();this.oDataModel=this.oApplicationFacade.getODataModel();hcm.emp.myleaverequests.utils.DataManager.init(this.oDataModel,this.resourceBundle);hcm.emp.myleaverequests.utils.Formatters.init(this.resourceBundle);this._buildHeaderFooter();this.oRouter.attachRouteMatched(this._handleRouteMatched,this)},_handleRouteMatched:function(e){if(e.getParameter("name")==="detail"){hcm.emp.myleaverequests.utils.DataManager.init(this.oDataModel,this.resourceBundle);e.getParameter("arguments").contextPath=decodeURIComponent(e.getParameter("arguments").contextPath);var _=this;var c=decodeURIComponent(e.getParameter("arguments").contextPath);var a=null;var b=null;var s=function(){hcm.emp.myleaverequests.utils.UIHelper.setRoutingProperty(b);b=hcm.emp.myleaverequests.utils.UIHelper.getRoutingProperty();if(b!==null){for(var i=0;i<b.length;i++){if(b[i]._navProperty===c){a=i;break}}}var d=b[a];if(d){_.currntObj=d;var f=_.byId("LRS6B_HEADER");var g=_.byId("LRS6B_ICNTABBAR");var l=_.byId("LRS6B_LBL_ORIGINAL_DATE");var h=_.byId("LRS6B_HEADER_START_DATE");var j=_.byId("LRS6B_HEADER_END_DATE");var k=_.byId("LRS6B_LBL_CHANGED_DATE");var m=_.byId("LRS6B_NEW_HEADER_START_DATE");var n=_.byId("LRS6B_NEW_HEADER_END_DATE");var o=_.byId("LRS6B_HEADER_STATUS");var p=_.byId("LRS6B_HEADER_STATUS2");var q=_.byId("LRS6B_NOTESTEXT");if(_.currntObj.Notes===""){g.setVisible(false)}else{g.setVisible(true)}f.setTitle(d.AbsenceTypeName);f.setNumber(hcm.emp.myleaverequests.utils.Formatters.DURATION(d.WorkingDaysDuration,d.WorkingHoursDuration));f.setNumberUnit(hcm.emp.myleaverequests.utils.Formatters.DURATION_UNIT(d.WorkingDaysDuration,d.WorkingHoursDuration));l.setVisible(hcm.emp.myleaverequests.utils.Formatters.SET_RELATED_VISIBILITY(d.aRelatedRequests));h.setText(hcm.emp.myleaverequests.utils.Formatters.DATE_ODATA_EEEdMMMyyyyLong(d.StartDate));j.setText(hcm.emp.myleaverequests.utils.Formatters.FORMAT_ENDDATE_LONG(_.resourceBundle.getText("LR_HYPHEN"),d.WorkingDaysDuration,d.StartTime,d.EndDate,d.EndTime));k.setVisible(hcm.emp.myleaverequests.utils.Formatters.SET_RELATED_VISIBILITY(d.aRelatedRequests));m.setVisible(hcm.emp.myleaverequests.utils.Formatters.SET_RELATED_START_DATE_VISIBILITY(d.aRelatedRequests));m.setText(hcm.emp.myleaverequests.utils.Formatters.FORMAT_RELATED_START_DATE_LONG(d.aRelatedRequests));n.setVisible(hcm.emp.myleaverequests.utils.Formatters.SET_RELATED_END_DATE_VISIBILITY(d.aRelatedRequests));n.setText(hcm.emp.myleaverequests.utils.Formatters.FORMAT_RELATED_END_DATE_LONG(_.resourceBundle.getText("LR_HYPHEN"),d.aRelatedRequests));o.setText(d.StatusName);o.setState(hcm.emp.myleaverequests.utils.Formatters.State(d.StatusCode));p.setText(hcm.emp.myleaverequests.utils.Formatters.FORMATTER_INTRO(d.aRelatedRequests));p.setState("Error");q.setText(d.Notes);_._initState()}};b=hcm.emp.myleaverequests.utils.DataManager.getCachedModelObjProp("ConsolidatedLeaveRequests");if(b===undefined){hcm.emp.myleaverequests.utils.DataManager.getConsolidatedLeaveRequests(function(o){b=o.LeaveRequestCollection;hcm.emp.myleaverequests.utils.DataManager.setCachedModelObjProp("ConsolidatedLeaveRequests",b);s();hcm.emp.myleaverequests.utils.UIHelper.setIsLeaveCollCached(true)},function(o){hcm.emp.myleaverequests.utils.DataManager.parseErrorMessages(o)})}else{s()}if(this.extHookDetailView){this.extHookDetailView()}}},_buildHeaderFooter:function(){var _=this;var o={sI18NDetailTitle:"LR_TITLE_LEAVE_REQUEST",buttonList:[{sId:"LRS6B_BTN_CHANGE",sI18nBtnTxt:"LR_CHANGE",onBtnPressed:function(e){_.onChange(e)}},{sId:"LRS6B_BTN_WITDHDRAW",sI18nBtnTxt:"LR_WITHDRAW",onBtnPressed:function(e){_.onWithdraw(e)}}],oAddBookmarkSettings:{title:_.resourceBundle.getText("LR_TITLE_DETAILS_VIEW"),icon:"sap-icon://Fiori2/F0394"}};var m=new sap.ui.core.routing.HashChanger();var u=m.getHash();if(u.indexOf("Shell-runStandaloneApp")>=0){o.bSuppressBookmarkButton=true}if(this.extHookChangeFooterButtons){o=this.extHookChangeFooterButtons(o)}this.setHeaderFooterOptions(o)},_isChangeRequest:function(r){return r!=undefined&&r.length>0&&r[0].LeaveRequestType=="2"},_hasNewEndDate:function(r){return this._isChangeRequest(r)&&this._hasEndDate(r[0].WorkingDaysDuration)},_hasEndDate:function(w){return w!=undefined&&(hcm.emp.myleaverequests.utils.Formatters.isHalfDayLeave(w)||w*1!=1)},_initState:function(){var b=false;if(!this.currntObj.RelatedRequests||this.currntObj.RelatedRequests.length<1){b=this.currntObj.ActionModifyInd}else if(this.currntObj.RelatedRequests){if(this.currntObj.RelatedRequests[0].LeaveRequestType=="2"){b=this.currntObj.RelatedRequests[0].ActionModifyInd}}this.setBtnEnabled("LRS6B_BTN_CHANGE",b);var a=false;if(!this.currntObj.RelatedRequests||this.currntObj.RelatedRequests.length<1){a=this.currntObj.ActionDeleteInd||this.currntObj.StatusCode=="CREATED"}this.setBtnEnabled("LRS6B_BTN_WITDHDRAW",a)},onChange:function(){var r=this.currntObj.RequestID;hcm.emp.myleaverequests.utils.UIHelper.setIsChangeAction(true);if(r===""){r=this.currntObj.LeaveKey}if(r!==""){this.oRouter.navTo("change",{requestID:r})}else{jQuery.sap.log.warning("curntLeaveRequest is null","_handleRouteMatched","hcm.emp.myleaverequests.view.S6B")}},onWithdraw:function(){var _=this;this.oHeader=this.byId("LRS6B_HEADER");var a;var b;var c=this.currntObj.StartTime;var d=this.currntObj.EndTime;var e=this.currntObj.StartDate;var f=this.currntObj.EndDate;var g=this.currntObj.AbsenceTypeName;if(c==="PT00H00M00S"&&d==="PT00H00M00S"){a=hcm.emp.myleaverequests.utils.Formatters.DATE_ODATA_EEEdMMMyyyy(e);b=hcm.emp.myleaverequests.utils.Formatters.DATE_ODATA_EEEdMMMyyyy(f)}else{a=hcm.emp.myleaverequests.utils.Formatters.DATE_ODATA_EEEdMMMyyyy(e,"medium");b=hcm.emp.myleaverequests.utils.Formatters.DATE_ODATA_EEEdMMMyyyy(f,"medium");a+=" "+hcm.emp.myleaverequests.utils.Formatters.TIME_hhmm(c);b+=" "+hcm.emp.myleaverequests.utils.Formatters.TIME_hhmm(d)}var n=null;if(this.oHeader){n=this.oHeader.getNumber()+"  "+this.oHeader.getNumberUnit()}else{n="-"}var s={question:this.resourceBundle.getText("LR_WITHDRAWNMSG"),additionalInformation:[{label:this.resourceBundle.getText("LR_BALANCE_DEDUCTIBLE"),text:g},{label:this.resourceBundle.getText("LR_FROM"),text:a},{label:this.resourceBundle.getText("LR_TO"),text:b},{label:this.resourceBundle.getText("LR_REQUEST"),text:n}],showNote:false,title:this.resourceBundle.getText("LR_TITLE_WITHDRAW"),confirmButtonLabel:this.resourceBundle.getText("LR_OK")};if(this.extHookWithdrawDialogContent){s=this.extHookWithdrawDialogContent(s)}sap.ca.ui.dialog.factory.confirm(s,function(r){if(r.isConfirmed==true){_.withdraw()}})},withdraw:function(){var _=this;var s=this.currntObj.StatusCode;var e=this.currntObj.EmployeeID;var r=this.currntObj.RequestID;var c=this.currntObj.ChangeStateID;var l=this.currntObj.LeaveKey;hcm.emp.myleaverequests.utils.DataManager.withdrawLeaveRequest(s,e,r,c,l,function(a){sap.ui.getCore().getEventBus().publish("hcm.emp.myleaverequests.LeaveCollection","refresh");hcm.emp.myleaverequests.utils.UIHelper.setIsWithDrawn(_.currntObj._navProperty);hcm.emp.myleaverequests.utils.UIHelper.setIsWithDrawAction(true);sap.m.MessageToast.show(_.resourceBundle.getText("LR_WITHDRAWDONE"))},function(a){hcm.emp.myleaverequests.utils.UIHelper.errorDialog(a)},this)}});
