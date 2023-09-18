/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.require("hcm.emp.myleaverequests.utils.DataManager");jQuery.sap.declare("hcm.emp.myleaverequests.utils.CalendarTools");hcm.emp.myleaverequests.utils.CalendarTools=(function(){var _=null;return{oCache:{},init:function(o){_=o},clearCache:function(){hcm.emp.myleaverequests.utils.CalendarTools.oCache={}},getDayLabelsForMonth:function(d,s,e){var r=hcm.emp.myleaverequests.utils.CalendarTools.calcMonthStartDate(d);var n=hcm.emp.myleaverequests.utils.CalendarTools.calcNextMonthStartDate(r);var p=hcm.emp.myleaverequests.utils.CalendarTools.calcPreviousMonthStartDate(r);var c=hcm.emp.myleaverequests.utils.CalendarTools.oCache[r];var C=hcm.emp.myleaverequests.utils.CalendarTools.oCache[p];var o=hcm.emp.myleaverequests.utils.CalendarTools.oCache[n];var S=p;var E=n;if(!((c==undefined)||(C==undefined)||(o==undefined))){s(c);return}if(c==undefined){E=hcm.emp.myleaverequests.utils.CalendarTools.approximateMonthEndDate(n)}else if(C==undefined){E=hcm.emp.myleaverequests.utils.CalendarTools.approximateMonthEndDate(p);S=new Date(p.getFullYear(),p.getMonth()-2,1);n=p;p=S;r=new Date(S.getFullYear(),S.getMonth()+1,1)}else if(o==undefined){S=n;E=new Date(S.getFullYear(),S.getMonth()+2,1);p=S;n=E;E=hcm.emp.myleaverequests.utils.CalendarTools.approximateMonthEndDate(E);r=new Date(S.getFullYear(),S.getMonth()+1,1)}var a=null;var b=null;var f=false;var g=s;var h=e;hcm.emp.myleaverequests.utils.DataManager.getLeaveRequestsForTimePeriod(S,E,function(l){if(f){return}a=l;if(b!=null){hcm.emp.myleaverequests.utils.CalendarTools._finish(S,E,r,p,n,a,b,g,h)}},function(i){if(f){return}f=true;e(i)});hcm.emp.myleaverequests.utils.DataManager.getWorkSchedulesForTimePeriod(S,E,function(w){if(f){return}b=w;if(a!=null){hcm.emp.myleaverequests.utils.CalendarTools._finish(S,E,r,p,n,a,b,g,h)}},function(i){if(f){return}f=true;e(i)})},_calcDayLabelsForMonth:function(a,b,m,d){var r={};var M=hcm.emp.myleaverequests.utils.CalendarTools.calcMonthDayCount(m);for(var D=0;D<M;D++){var o=new Date(m.getFullYear(),m.getMonth(),D+1);var l=false;for(var L=0;L<a.length;L++){if(a[L].StatusCode&&(a[L].StatusCode=="SENT"||a[L].StatusCode=="POSTED"||a[L].StatusCode=="APPROVED"||a[L].StatusCode=="REJECTED")){var s=hcm.emp.myleaverequests.utils.Formatters.getDate(a[L].StartDate);var e=hcm.emp.myleaverequests.utils.Formatters.getDate(a[L].EndDate);s=new Date(s.getUTCFullYear(),s.getUTCMonth(),s.getUTCDate(),0,0,0);e=new Date(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate(),0,0,0);if(hcm.emp.myleaverequests.utils.CalendarTools.dayRangeMatch(o,s,e)){if(!r[a[L].StatusCode]){r[a[L].StatusCode]=[o]}else{r[a[L].StatusCode].push(o)}l=true}}}if(!l&&b.length>0&&b[0].StatusValues.length>d+D){if(b[0].StatusValues[d+D]=='2'){if(!r["WEEKEND"]){r["WEEKEND"]=[o]}else{r["WEEKEND"].push(o)}}else if(b[0].StatusValues[d+D]=='1'){if(!r["PHOLIDAY"]){r["PHOLIDAY"]=[o]}else{r["PHOLIDAY"].push(o)}}else if(b[0].StatusValues[d+D]=='0'){if(!r["WORKDAY"]){r["WORKDAY"]=[o]}else{r["WORKDAY"].push(o)}}}}return r},_finish:function(s,E,r,p,n,a,b,c,d){var D;try{var f=0;if(s<r){hcm.emp.myleaverequests.utils.CalendarTools.oCache[p]=this._calcDayLabelsForMonth(a,b,p,0);f+=hcm.emp.myleaverequests.utils.CalendarTools.calcMonthDayCount(p)}D=hcm.emp.myleaverequests.utils.CalendarTools.oCache[r]=this._calcDayLabelsForMonth(a,b,r,f);f+=hcm.emp.myleaverequests.utils.CalendarTools.calcMonthDayCount(r);var R=hcm.emp.myleaverequests.utils.CalendarTools.approximateMonthEndDate(r);if(E>R){hcm.emp.myleaverequests.utils.CalendarTools.oCache[n]=this._calcDayLabelsForMonth(a,b,n,f)}var o=hcm.emp.myleaverequests.utils.CalendarTools.oCache[p];var g=hcm.emp.myleaverequests.utils.CalendarTools.oCache[n];var h=["SENT","APPROVED","POSTED","REJECTED","WEEKEND","PHOLIDAY","WORKDAY"];for(var i=0;i<h.length;i++){if(!D[h[i]]){D[h[i]]=[]}if(o[h[i]]){for(var j=0;j<o[h[i]].length;j++){D[h[i]].push(o[h[i]][j])}};if(g[h[i]]){if(g[h[i]]){for(var k=0;k<g[h[i]].length;k++){D[h[i]].push(g[h[i]][k])}}}}}catch(e){d([_.getText("LR_CT_PARSE_ERR")+" (CalendarTools.getDayLabelsForMonth)"]);return}c(D)},calcMonthStartDate:function(d){var m=new Date(d.getFullYear(),d.getMonth(),1,0,0,0);m.setMilliseconds(0);return m},approximateMonthEndDate:function(d){var e=new Date(d.getFullYear(),d.getMonth(),1,0,0,0);e.setDate(e.getDate()+31);return e},calcNextMonthStartDate:function(d){return new Date(d.getFullYear(),d.getMonth()+1,1)},calcPreviousMonthStartDate:function(d){return new Date(d.getFullYear(),d.getMonth()-1,1)},calcMonthDayCount:function(d){var a=32-new Date(d.getFullYear(),d.getMonth(),32).getDate();if(a<32&&a>27)return a;else{jQuery.sap.log.warning("Failed to calculate number of days in utils.CalendarTools.calcMonthDayCount with input"+d.toString());throw"error in calculating number of days in a month.\nFunction:utils.CalendarTools.calcMonthDayCount\nInput: "+d.toString()+"\nOutput:"+a}},dayRangeMatch:function(d,s,e){var f=new Date(s.getFullYear(),s.getMonth(),s.getDate());var F=new Date(e.getFullYear(),e.getMonth(),e.getDate());if(f<=d&&F>=d)return true;return false}}}());