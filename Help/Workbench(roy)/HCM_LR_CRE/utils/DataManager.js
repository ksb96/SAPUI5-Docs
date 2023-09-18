/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.require("hcm.emp.myleaverequests.utils.Formatters");jQuery.sap.declare("hcm.emp.myleaverequests.utils.DataManager");hcm.emp.myleaverequests.utils.DataManager=(function(){var _=null;var d=null;var f={};f.exist=true;return{init:function(D,o){_=D;_.setCountSupported(false);d=o},getBaseODataModel:function(){return _},setCachedModelObjProp:function(p,a){f[p]=a},getCachedModelObjProp:function(p){return f[p]},getApprover:function(s,a){var p="ApproverCollection";var b=["$select=ApproverEmployeeName"];this._getOData(p,null,b,function(o){var A=undefined;try{var r=o.results;if(r instanceof Array){for(var i=0;i<r.length;i++){A=r[i].ApproverEmployeeName}}if(A==undefined){a([d.getText("LR_DD_NO_APPROVER")+" (DataManager.getApprover)"]);return}}catch(e){a([d.getText("LR_DD_PARSE_ERR")+" (DataManager.getApprover)"]);return}s(A)},function(o){a(hcm.emp.myleaverequests.utils.DataManager.parseErrorMessages(o))})},getConfiguration:function(){var a=$.Deferred();var p="ConfigurationCollection";var b=['$select=DefaultAbsenceTypeCode'];if(!f.DefaultAbsenceTypeCode){this._getOData(p,null,b,function(o){var c=undefined;try{var r=o.results;if(r instanceof Array){c=r[0]}if(c==undefined){a.reject(hcm.emp.myleaverequests.utils.DataManager.parseErrorMessages(o));return}}catch(e){a.reject(hcm.emp.myleaverequests.utils.DataManager.parseErrorMessages(e));return}f.DefaultAbsenceTypeCode=c;a.resolve(c)},function(o){a.reject(hcm.emp.myleaverequests.utils.DataManager.parseErrorMessages(o))})}else{a.resolve(f.DefaultAbsenceTypeCode)}return a.promise()},getAbsenceTypeCollection:function(){var a=$.Deferred();var p="AbsenceTypeCollection";var P=['$select=AbsenceTypeName,AbsenceTypeCode,AllowedDurationPartialDayInd,AllowedDurationMultipleDayInd'];if(!f.AbsenceTypeCollection){this._getOData(p,null,P,function(o){f.AbsenceTypeCollection=o.results;a.resolve(o.results)},function(o){a.reject(hcm.emp.myleaverequests.utils.DataManager.parseErrorMessages(o))})}else{a.resolve(f.AbsenceTypeCollection)}return a.promise()},getBalancesForAbsenceType:function(a,s,b){var D=hcm.emp.myleaverequests.utils.Formatters.DATE_YYYYMMdd(new Date())+'T00%3A00%3A00';var p="AbsenceTypeCollection(EmployeeID='',StartDate=datetime'"+D+"',AbsenceTypeCode='"+a+"')/absenceTypeTimeAccount";var c=["$select=BalancePlannedQuantity,BalanceAvailableQuantity,BalanceUsedQuantity,TimeUnitName,TimeAccountTypeName"];this._getOData(p,null,c,function(o){var B=null,g=null,h=null,j=null;var t=null,T=null,k=null;var l=null,m=null,n=null;var q=false;try{var r=o.results;if(r instanceof Array&&r.length>0){q=true;t=r[0].TimeUnitName;T=r[0].TimeUnitName;k=r[0].TimeAccountTypeName;for(var i=0;i<r.length;i++){l+=parseFloat(r[i].BalancePlannedQuantity);m+=parseFloat(r[i].BalanceAvailableQuantity);n+=parseFloat(r[i].BalanceUsedQuantity)}B=hcm.emp.myleaverequests.utils.Formatters.BALANCE(l.toString());g=hcm.emp.myleaverequests.utils.Formatters.BALANCE(m.toString());h=hcm.emp.myleaverequests.utils.Formatters.BALANCE(n.toString());j=hcm.emp.myleaverequests.utils.Formatters.BALANCE((n+l).toString())}}catch(e){b([d.getText("LR_DD_PARSE_ERR")+" (DataManager.getBalancesForAbsenceType)"]);return}s(B,t,g,T,k,h,j,q)},function(o){b(hcm.emp.myleaverequests.utils.DataManager.parseErrorMessages(o))})},getPendingLeaves:function(s,e){this.getConsolidatedLeaveRequests(function(p){var l=p.LeaveRequestCollection;var P=0;for(var i=0;i<l.length;i++){if(l[i].StatusCode=="SENT"){P++}else if(l[i].aRelatedRequests!=undefined&&l[i].aRelatedRequests.length>0){if(l[i].aRelatedRequests[0].StatusCode=="SENT"){P++}}}s(P+"")},e)},getConsolidatedLeaveRequests:function(s,a){var p="LeaveRequestCollection";var P=['$select=EmployeeID,RequestID,ChangeStateID,LeaveKey,ActionCode,StatusCode,StatusName,AbsenceTypeCode,AbsenceTypeName,StartDate,StartTime,EndDate,EndTime,WorkingHoursDuration,WorkingDaysDuration,Notes,ActionDeleteInd,ActionModifyInd,LeaveRequestType'];this._getOData(p,null,P,function(o){var l=[];try{var r=o.results;if(!r instanceof Array){a([d.getText("LR_DD_NO_CFG")+" (DataManager.getConsolidatedLeaveRequests)"]);return}var R={};for(var i=0;i<r.length;i++){if((r[i].LeaveRequestType=="2"||r[i].LeaveRequestType=="3")&&r[i].LeaveKey){if(!R[r[i].LeaveKey]){R[r[i].LeaveKey]=[]}R[r[i].LeaveKey].push(r[i])}}for(var i=0;i<r.length;i++){if(r[i].LeaveRequestType!="2"&&r[i].LeaveRequestType!="3"){if(r[i].LeaveKey&&R[r[i].LeaveKey]){r[i].aRelatedRequests=R[r[i].LeaveKey];for(var j=0;j<r[i].aRelatedRequests.length;j++){r[i].Notes=r[i].aRelatedRequests[j].Notes+r[i].Notes}}l.push(r[i])}}}catch(e){a([d.getText("LR_DD_PARSE_ERR")+" (DataManager.getConsolidatedLeaveRequests)"]);return}s({LeaveRequestCollection:l})},function(o){a(hcm.emp.myleaverequests.utils.DataManager.parseErrorMessages(o))})},getTimeAccountCollection:function(s,a){var p="TimeAccountCollection";this._getOData(p,null,null,function(o){var t=[];try{var r=o.results;if(!r instanceof Array){a([d.getText("LR_DD_NO_CFG")+" (DataManager.getTimeAccountCollection)"]);return}for(var i=0;i<r.length;i++){delete r[i]['__metadata'];t.push(r[i])}}catch(e){a([d.getText("LR_DD_PARSE_ERR")+" (DataManager.getTimeAccountCollection)"]);return}s({TimeAccountCollection:t})},function(o){a(hcm.emp.myleaverequests.utils.DataManager.parseErrorMessages(o))})},submitLeaveRequest:function(s,S,e,E,a,n,p,b,c){var B={};B.StartDate=s;B.StartTime=S;B.Notes=n;B.ProcessCheckOnlyInd=(p?true:false);B.AbsenceTypeCode=a;B.EndDate=e;B.EndTime=E;this._postOData("LeaveRequestCollection",B,function(o,g){var h="";if(g.headers["sap-message"]){h=JSON.parse(g.headers["sap-message"])}hcm.emp.myleaverequests.utils.UIHelper.setIsChangeAction(true);b(o,h)},function(o){c(hcm.emp.myleaverequests.utils.DataManager.parseErrorMessages(o))})},changeLeaveRequest:function(e,r,c,l,s,S,E,a,A,n,p,b,g){var B={};B.ActionCode=02;B.EmployeeID=e;B.RequestID=r;B.ChangeStateID=c;B.LeaveKey=l;B.StartDate=s;B.StartTime=S;B.Notes=n;B.ProcessCheckOnlyInd=(p?true:false);B.AbsenceTypeCode=A;B.EndDate=E;B.EndTime=a;this._postOData("LeaveRequestCollection",B,function(o,h){var i="";if(h.headers["sap-message"]){i=JSON.parse(h.headers["sap-message"])}hcm.emp.myleaverequests.utils.UIHelper.setIsChangeAction(true);b(o,i)},function(o){g(hcm.emp.myleaverequests.utils.DataManager.parseErrorMessages(o))})},withdrawLeaveRequest:function(s,e,r,c,l,a,b){if(this.isRecallableLeaveRequest(s,l)){this.recallLeaveRequest(e,r,c,l,a,b)}else{this.createDeleteLeaveRequest(e,r,c,l,a,b)}},getLeaveRequestsForTimePeriod:function(s,E,a,b){var S=hcm.emp.myleaverequests.utils.Formatters.DATE_YYYYMMdd(s)+'T00:00:00';var c=hcm.emp.myleaverequests.utils.Formatters.DATE_YYYYMMdd(E)+'T00:00:00';var p="LeaveRequestCollection";var g=["$filter=StartDate eq datetime'"+S+"' and EndDate eq datetime'"+c+"'","$select=StatusCode,StatusName,AbsenceTypeCode,AbsenceTypeName,StartDate,StartTime,EndDate,EndTime"];this._getOData(p,null,g,function(o){var l=[];try{var r=o.results;if(r instanceof Array){for(var i=0;i<r.length;i++){var R=new Object();R.StatusCode=r[i].StatusCode;R.StatusName=r[i].StatusName;R.AbsenceTypeCode=r[i].AbsenceTypeCode;R.AbsenceTypeName=r[i].AbsenceTypeName;R.StartDate=r[i].StartDate;R.StartTime=r[i].StartTime;R.EndDate=r[i].EndDate;R.EndTime=r[i].EndTime;l.push(R)}}}catch(e){b([d.getText("LR_DD_PARSE_ERR")+" (DataManager.getLeaveRequestsForTimePeriod)"]);return}a(l)},function(o){b(hcm.emp.myleaverequests.utils.DataManager.parseErrorMessages(o))})},getWorkSchedulesForTimePeriod:function(s,E,a,b){var S=hcm.emp.myleaverequests.utils.Formatters.DATE_YYYYMMdd(s)+'T00:00:00';var c=hcm.emp.myleaverequests.utils.Formatters.DATE_YYYYMMdd(E)+'T00:00:00';var p="WorkScheduleCollection";var g=["$filter=StartDate eq datetime'"+S+"' and EndDate eq datetime'"+c+"'","$select=StartDate,EndDate,StatusValues"];this._getOData(p,null,g,function(o){var w=[];try{var r=o.results;if(r instanceof Array){for(var i=0;i<r.length;i++){var h=new Object();h.StartDate=r[i].StartDate;h.EndDate=r[i].EndDate;h.StatusValues=r[i].StatusValues;w.push(h)}}}catch(e){b([d.getText("LR_DD_PARSE_ERR")+" (DataManager.getWorkSchedulesForTimePeriod)"]);return}a(w)},function(o){b(hcm.emp.myleaverequests.utils.DataManager.parseErrorMessages(o))})},isRecallableLeaveRequest:function(s,l){if(s=="CREATED")return true;if(!l)return true;for(var i=0;i<l.length;i++){var c=l.charAt(i);if(c!=" "&&c!="\t"&&c!="\v"&&c!="\r"&&c!="\n"&&c!="0")return false}return true},createDeleteLeaveRequest:function(e,r,c,l,s,a){var b={};b.ActionCode=03;b.EmployeeID=e;b.RequestID=r;b.ChangeStateID=c;b.LeaveKey=l;b.ProcessCheckOnlyInd=false;this._postOData("LeaveRequestCollection",b,function(o,g){var h="";if(g.headers["sap-message"]){h=JSON.parse(g.headers["sap-message"])}s(o,h)},function(o){a(hcm.emp.myleaverequests.utils.DataManager.parseErrorMessages(o))})},recallLeaveRequest:function(e,r,c,l,s,a){this._deleteOData("LeaveRequestCollection(EmployeeID='"+e+"',RequestID='"+r+"',ChangeStateID='"+c+"',LeaveKey='"+l+"')",function(o){s(o)},function(o){a(hcm.emp.myleaverequests.utils.DataManager.parseErrorMessages(o))})},parseErrorMessages:function(o){if(o.response.body&&o.response){var c=function(p){var s=1;if(p[0]==="-"){s=-1;p=p.substr(1)}return function(a,b){var g;if(a[p]<b[p]){g=-1}else if(a[p]>b[p]){g=1}else{g=0}return g*s}};try{var r=JSON.parse(o.response.body);if(r.error&&r.error.message&&r.error.message.value){var g=[];g.push(r.error.message.value);if(r.error.innererror&&r.error.innererror.errordetails&&r.error.innererror.errordetails instanceof Array){r.error.innererror.errordetails.sort(c("severity"));for(var i=0;i<r.error.innererror.errordetails.length;i++){if(r.error.innererror.errordetails[i].message){var m=r.error.innererror.errordetails[i].message;if(r.error.innererror.errordetails[i].severity){m+=" ("+r.error.innererror.errordetails[i].severity+")"}g.push(m)}}}return g}}catch(e){}}else{return[d.getText("LR_DD_COMM_ERR")+o.message]}},getXmlNodeValue:function(n){try{if(n.childNodes.length!=1)return null;switch(n.childNodes[0].nodeType){case 3:return n.childNodes[0].data}}catch(e){return null}},getDateFromString:function(v){if(v.length!=19)return null;if(v.charAt(4)!='-'||v.charAt(7)!='-'||v.charAt(10)!='T'||v.charAt(13)!=':'||v.charAt(16)!=':')return null;var y=v.substring(0,4)*1;var m=v.substring(5,7)*1;var a=v.substring(8,10)*1;var h=v.substring(11,13)*1;var b=v.substring(14,16)*1;var s=v.substring(17,19)*1;return new Date(y,m-1,a,h,b,s)},populateLeaveRequest:function(l){var L={};for(var a=0;a<l.length;a++){var v=hcm.emp.myleaverequests.utils.DataManager.getXmlNodeValue(l[a]);if(v){switch(l[a].localName){case"ActionCode":case"LeaveRequestType":case"SequenceID":L[l[a].localName]=v*1;break;case"ActionDeleteInd":case"ActionModifyInd":case"ProcessCheckOnlyInd":L[l[a].localName]=v=="true";break;case"EndDate":case"FirstSubmissionDate":case"LastChangeDate":case"StartDate":L[l[a].localName]=hcm.emp.myleaverequests.utils.DataManager.getDateFromString(v);break;default:L[l[a].localName]=v}}}return L},populateTimeAccount:function(t){var l={};for(var a=0;a<t.length;a++){var v=hcm.emp.myleaverequests.utils.DataManager.getXmlNodeValue(t[a]);if(v){switch(t[a].localName){case"DeductionStartDate":case"DeductionEndDate":l[t[a].localName]=hcm.emp.myleaverequests.utils.DataManager.getDateFromString(v);break;default:l[t[a].localName]=v}}}return l},_getOData:function(p,c,u,s,e){_.read(p,c,u,true,function(r){s(r)},function(r){e(r)})},_postOData:function(p,b,s,e){_.create(p,b,null,s,e)},_deleteOData:function(p,s,e){var P={};P.fnSuccess=s;P.fnError=e;_.remove(p,P)}}}());
