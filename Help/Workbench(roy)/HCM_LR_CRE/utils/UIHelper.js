/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.require("sap.ca.ui.dialog.factory");jQuery.sap.declare("hcm.emp.myleaverequests.utils.UIHelper");hcm.emp.myleaverequests.utils.UIHelper=(function(){var _=null;var a=null;var b=false;var c=[];var d=false;var e=false;return{setControllerInstance:function(C){_=C},getControllerInstance:function(){return _},setRoutingProperty:function(o){if(!!o){for(var i=0;i<o.length;i++){var l=o[i].LeaveKey;var r=o[i].RequestID;if(r!==""){o[i]._navProperty=r}else{o[i]._navProperty=l}}}a=o},getRoutingProperty:function(){return a},setIsLeaveCollCached:function(i){b=i},getIsLeaveCollCached:function(){return b},setIsWithDrawn:function(i){c.push(i)},getIsWithDrawn:function(i){if(jQuery.inArray(i,c)>=0)return true;else return false},setIsChangeAction:function(s){d=s},getIsChangeAction:function(){return d},setIsWithDrawAction:function(s){e=s},getIsWithDrawAction:function(){return e},errorDialog:function(m){var f="";var g="";var h="";var s="";if(typeof m==="string"){s={message:m,type:sap.ca.ui.message.Type.ERROR}}else if(m instanceof Array){for(var i=0;i<m.length;i++){f="";if(typeof m[i]==="string"){f=m[i]}else if(typeof m[i]==="object"){f=m[i].value}if(i==0){g=f}else{h=h+f+"\n"}}if(h==""){s={message:g,type:sap.ca.ui.message.Type.ERROR}}else{s={message:g,details:h,type:sap.ca.ui.message.Type.ERROR}}}sap.ca.ui.message.showMessageBox(s)}}}());
