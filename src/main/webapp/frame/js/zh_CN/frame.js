//打开窗口:需要指定DIV标签ID
Btframe.prototype.open = Btframe_open;
// 闭关窗口:需要指定DIV标签ID
Btframe.prototype.close = Btframe_close;
//打开窗口:
Btframe.prototype.openWindow = Btframe_openWindow;
// 闭关窗口
Btframe.prototype.closeWindow = Btframe_closeWindow;
// 提示窗口
Btframe.prototype.alert = Btframe_alert;
//post请求加载数据到表单
Btframe.prototype.loadFormByJson = Btframe_loadFormByJson;
//post请求加载数据到表单
Btframe.prototype.clearForm = Btframe_clearForm;

//post请求加载数据
Btframe.prototype.postJson4LoadData = Btframe_postJson4LoadData;
//json请求提交
Btframe.prototype.postJson = Btframe_postJson;
//json标准结果处理
Btframe.prototype.doJsonResult = Btframe_doJsonResult;
// 提示
Btframe.prototype.tip = Btframe_tip;
// 确认
Btframe.prototype.comform = Btframe_comform;
// 报表
Btframe.prototype.report = Btframe_report;
//报表重新加载
Btframe.prototype.reportReload = Btframe_reportReload;

//取报表选中的记录
Btframe.prototype.getSelectedRows = Btframe_getSelectedRows;
//取报表选中的记录
Btframe.prototype.selectedRow = Btframe_selectedRow;
//对话框
Btframe.prototype.quoteDialog = Btframe_quoteDialog;
//对话框
Btframe.prototype.closeQuoteDialog = Btframe_closeQuoteDialog;

// 调用父窗口的方法
Btframe.prototype.callParent = Btframe_callParent;
// 报表检索
Btframe.prototype.search = Btframe_search;
// URL参数转换为JSON
Btframe.prototype.paramStr2json = Btframe_paramStr2json;
// 表单验证
Btframe.prototype.validate = Btframe_validate;
// json字 串变为json对象
Btframe.prototype.jsonStr2json = Btframe_jsonStr2json;
// json对象变为json字 串
Btframe.prototype.json2jsonStr = Btframe_json2jsonStr;
//根据传进来的JSON参数，与指定的DIV ID 生成列表
Btframe.prototype.tableList = Btframe_tableList;
//根据传进来的JSON参数，与指定的DIV ID 生成树
Btframe.prototype.tree = Btframe_tree;
//根据传进来的JSON参数，与指定的DIV ID 生成目录导航
Btframe.prototype.navigation = Btframe_navigation;
//根据传进来的JSON参数，与指定的DIV ID 生成控制台列表
Btframe.prototype.topControl  = Btframe_topControl;
//根据传进来的JSON参数，与指定的DIV ID 生成左边菜单
Btframe.prototype.leftMenu  = Btframe_leftMenu;
//根据传进来的JSON参数，与指定的DIV ID 生成页签面板
Btframe.prototype.tabPanel  = Btframe_tabPanel;

function Btframe() {

}
// 打开窗口
function Btframe_open(tagId, url, title, width, height) {
	if (tagId == null) {
		this.openWindow(url, title, width, height);
		return;
	}
	if(title==null){
		title="";
	}
	$('div[id=' + tagId + ']').html(
			"<iframe src='" + url
					+ "' style='width: 99%;height: 99%'></iframe>");
	
	$('div[id=' + tagId + ']').window({
		title : title,
		minimizable : false,
		 maximized:true,   
		 maximizable:false,
		modal:true,
		width : width,
		height : height

	});
	
	

}
// 闭关窗口
function Btframe_close(tagId) {
	if (tagId == null) {
		this.closeWindow();
		return;
	}
	$('div[id=' + tagId + ']').window('close');
}
//打开窗口
function Btframe_openWindow( url, title, width, height) {
	if (document.getElementById('openWindow') == null) {
		$("body").append("<div id='openWindow'></div>");
	}
	$('#openWindow').html(
			"<iframe src='" + url
					+ "' style='width: 99%;height: 99%'></iframe>");	
	
	$('#openWindow').window({
		title : title,
		minimizable : false,
		maximizable:false,
		modal:true,
		maximized:true,   
		width : width,
		height : height

	});
	//$('#openWindow').window('close');



}
//闭关窗口
function Btframe_closeWindow() {
	if (document.getElementById('openWindow') == null) {
		return;
	}
	$('#openWindow').window('close');
}
function Btframe_callParent(fun, ret) {
	if (window.parent != null) {
		for ( var p in window.parent) {
			alert(p);
			if (p == fun) {
				alert(window.parent[p]);
			}
		}
	} else {
		alert('当前菜单不存在父窗口');
	}

}
// 提示窗口
function Btframe_alert(tagId, msg,code,fun) {
	if (tagId == null) {
		if (document.getElementById('alertDialog') == null) {
			$("body").append("<div id='alertDialog'></div>");
			$('div[id=alertDialog]').html("<input id='_alertDialog' type='hidden' value=''/><div id='alertDialog_'></div>");
		}
		tagId="alertDialog";
	}
	$('input[id=_' + tagId + ']').val(code);
	$('div[id=' + tagId + '_]').html(msg);
	$('div[id=' + tagId + ']').dialog({
		title : '提示',
		width : 400,
		height : 200,
		modal : true,
		toolbar : [],
		buttons : [ { // 设置下方按钮数组
			text : '确定',
			id:"_"+tagId+"_",
			iconCls : 'icon-ok',
			handler : function() {
				$('div[id=' + tagId + ']').dialog('close');
				if(fun!=null){
					fun();
				}
			}
		} ]
	});
}
function Btframe_doJsonResult(tagId,result,sFun,fFun,title,width,height){
	if(result==null){
		alert('返回结果不能为空');
		return;
	}
	var code = result.code;
	if(code==null){
		alert('返回编码不能为空');
		return;
	}
	var msg=result.msg;
	if(msg==null){
		alert('返回信息不能为空');
		return;
	}
	
	if (tagId == null) {
		if (document.getElementById('alertDialog') == null) {
			$("body").append("<div id='alertDialog'></div>");
			$('div[id=alertDialog]').html("<input id='_alertDialog' type='hidden' value=''/><div id='alertDialog_'></div>");
		}
		tagId="alertDialog";
	}
	if(title==null){
		title='提示';
	}
	if(width==null){
		width=400;
	}
	if(height==null){
		height=200;
	}
	//if($('div[id=_' + tagId + ']').val()=='2222222222222222222222'){
		$('input[id=_' + tagId + ']').val(code);
	//}else{
	//	$('div[id=_' + tagId + ']').val('2222222222222222222222');
	//}
	//if($('div[id=' + tagId + '_]').html()=='bbbbbbb'){
		$('div[id=' + tagId + '_]').html(msg);
	//}else{
	//	$('div[id=' + tagId + '_]').html('bbbbbbb');
	//}
	
	$('div[id=' + tagId + ']').dialog({
		title : title,
		width : width,
		height : height,
		modal : true,
		toolbar : [],
		buttons : [ { // 设置下方按钮数组
			text : '确定',
			iconCls : 'icon-ok',
			id:"_"+tagId+"_",
			handler : function() {
				$('div[id=' + tagId + ']').dialog('close');
 
				if(code.indexOf('0')==0){ 
					//处理成功
					if(sFun!=null){
						sFun(result.body);
					}
					
				}else{
					//处理失败
					if(fFun!=null){
						fFun(result.body);
					}
				}
				
			}
		} ]
	});
	
	
	
}
function Btframe_postJson(url,json,tagId,sFun,fFun,title,width,height,async){
	if(url==null){
		alert('URL不能为空');
		return;
	}
	if(json==null){
		alert('请求JSON参数不能为空');
		return;
	}
	if(async==null){
		async=false;
	}
	$.ajax({
		  type: 'POST',
		  contentType: "application/json;charset=utf-8",
		  url:  url,
		  data: json,
		  async:async,
		  success : function(data) { 
			  Btframe_doJsonResult(tagId,data,sFun,fFun,title,width,height);
			},
		  error: function (XMLHttpRequest, textStatus, errorThrown) {
					alert(errorThrown);
					
	        },
			dataType : 'json'
		});
}

function Btframe_postJson4LoadData(url,json,sFun,async){
	if(url==null){
		alert('URL不能为空');
		return;
	}
	if(json==null){
		alert('请求JSON参数不能为空');
		return;
	}
	if(async==null){
		async=false;
	}
	$.ajax({
		  type: 'POST',
		  contentType: "application/json;charset=utf-8",
		  url:  url,
		  data: json,
		  async:async,
		  success : function(result) { 
			  if(result==null){
					alert('返回结果不能为空');
					return;
				}
				var code = result.code;
				if(code==null){
					alert('返回编码不能为空');
					return;
				}
				var msg=result.msg;
				if(msg==null){
					alert('返回信息不能为空');
					return;
				}
				if(code.indexOf('0')==0){ 
					//处理成功
					if(sFun!=null){
						sFun(result.body);
					}
					
				}else{
					//处理失败
					alert(msg);
				}
				
			},
			dataType : 'json'
		});
}
function Btframe_loadFormByJson(tagId,json){
	if(json != null){
		$('form[id=' + tagId + ']').form('load', json);	
	}
}
function Btframe_clearForm(tagId){
	if(tagId != null){
		$('form[id=' + tagId + ']').form('clear');
	}
}
// 提示
function Btframe_tip(title, msg) {
	$.messager.show({
		showType : "fade",
		msg : msg,
		title : title,
		timeout : 10000
	});
}
// 确认
function Btframe_comform(msg) {
	$("#dialog").dialog({
		title : "确认",
		width : 400,
		height : 200,
		modal : true,
		toolbar : [],
		buttons : [ { // 设置下方按钮数组
			text : '是',
			iconCls : 'icon-ok',
			handler : function() {
				$.messager.show({
					showType : "fade",
					msg : "提交数据",
					title : "提示",
					timeout : 1000
				});
			}
		}, {
			text : '否',
			iconCls : 'icon-cancel',
			handler : function() {
			}
		} ]
	});
}
// 报表
function Btframe_report(tagId) {
	$('#test').datagrid({
		title : 'My DataGrid',
		iconCls : 'icon-save',
		width : 700,
		height : 350,
		nowrap : false,
		striped : true,
		collapsible : true,
		url : 'test_datagrid',
		sortName : 'code',
		sortOrder : 'desc',
		remoteSort : false,
		idField : 'code',
		frozenColumns : [ [ {
			field : 'ck',
			checkbox : true
		}, {
			title : 'code',
			field : 'code',
			width : 80,
			sortable : true
		} ] ],
		columns : [ [ {
			title : 'Base Information',
			colspan : 3
		}, {
			field : 'opt',
			title : 'Operation',
			width : 100,
			align : 'center',
			rowspan : 2,
			formatter : function(value, rec) {
				return '<span style="color:red">Edit Delete</span>';
			}
		} ], [ {
			field : 'name',
			title : 'Name',
			width : 120
		}, {
			field : 'addr',
			title : 'Address',
			width : 220,
			rowspan : 2,
			sortable : true,
			sorter : function(a, b) {
				return (a > b ? 1 : -1);
			}
		}, {
			field : 'col4',
			title : 'Col41',
			width : 150,
			rowspan : 2
		} ] ],
		pagination : true,
		rownumbers : true,
		toolbar : [ {
			id : 'btnadd',
			text : 'Add',
			iconCls : 'icon-add',
			handler : function() {
				$('#btnsave').linkbutton('enable');
				alert('add');
			}
		}, {
			id : 'btncut',
			text : 'Cut',
			iconCls : 'icon-cut',
			handler : function() {
				$('#btnsave').linkbutton('enable');
				alert('cut');
			}
		}, '-', {
			id : 'btnsave',
			text : 'Save',
			disabled : true,
			iconCls : 'icon-save',
			handler : function() {
				$('#btnsave').linkbutton('disable');
				alert('save');
			}
		} ]
	});
	var p = $('#test').datagrid('getPager');
	$(p).pagination({
		onBeforeRefresh : function() {
			alert('before refresh');
		}
	});
}

function Btframe_reportReload(tagId) {
	$('table[id=' + tagId + ']').datagrid('reload');
}
function Btframe_getSelectedRows(tagId) {
	var rows = $('table[id=' + tagId + ']').datagrid('getSelections');  
	return rows;
}
function Btframe_selectedRow(tagId, id) {
	var rows = $('table[id=' + tagId + ']').datagrid('selectRow',id);  
	return rows;
}

// 报表检索
function Btframe_search(tagId, queryJson) {
	if (tagId == null) {
		tagId = "report";
	}
	//alert(queryJson);
	var report = $('table[id=' + tagId + ']');
	var params = report.datagrid('options').queryParams;
	// 更改queryParams对象中两属性。
	params.query = queryJson;
	params.method = 'post';
	report.datagrid('reload', params);

}
function Btframe_jsonStr2json(jsonStr) {
	var json = eval("(" + jsonStr + ")");
	return json;
}
function Btframe_json2jsonStr(json) {
	var jsonStr = json_stringify(json);
	return jsonStr;
}
function Btframe_paramStr2json(serializedParams) {
	var obj = {};
	var properties = serializedParams.split("&");
	
	for ( var i = 0; i < properties.length; i++) {
		Btframe_fixParam(obj,properties[i]);
	}
	return obj;
}
function Btframe_fixParam(obj,str) {
	//alert(str);
	var attributeName = str.split("=")[0];
	var attributeValue = str.split("=")[1];
	
	if (!attributeValue) {
		return;
	}
	//alert(attributeName);
	var array = attributeName.split(".");
	for ( var i = 1; i < array.length; i++) {
		var tmpArray = Array();
		tmpArray.push("obj");
		for ( var j = 0; j < i; j++) {
			tmpArray.push(array[j]);
		}
		
		var evalParam = tmpArray.join(".");
		if (!eval(evalParam)) {
			eval(evalParam + "={};");
		}
	}

	obj[attributeName] = attributeValue;
	
}
function Btframe_validate(tagId) {
	var flag = true;
	$('form[id=' + tagId + '] input').each(function() {
		
		if ($(this).attr('required') || $(this).attr('validType')) {
			//alert($(this).validatebox('isValid'));
			if (!$(this).validatebox('isValid')) {
				flag = false;
				return flag;
			}
		}
	});

	return flag;
}

function Btframe_quoteDialog(url, title,yes,no,width,height){
	if (document.getElementById('quoteDialog') != null) {
		$('#quoteDialog').remove();
	}
	$("body").append("<div id='quoteDialog' style='overflow:hidden;'></div>");	
	
	$('#quoteDialog').html(
			"<iframe src='" + url
					+ "' style='width: " + width + ";height:" +  height  +";' onload=''></iframe>");	
	//获取页面的文档高度   
	//var top=$(document.body).height();   
	//获取页面的文档宽度   
	//var left=$(document.body).width();
	//if(top>height){
		
	//}
	$('#quoteDialog').dialog({
		title : title,
		modal:true,
		//maximized:true,  
		//top:top,
		//left:left,
		//width : width,
		//height : height,
		buttons:[{   
			text:'确定',
			iconCls:'icon-ok',
			//tip:'aaaaa',
			handler:yes
		},{
			text:'清空',
			iconCls:'icon-remove',
			handler:no
		},{
			text:'关闭',
			iconCls:'icon-cancel',
			handler:function(){
				$("#quoteDialog").dialog('close');
			}
		}]
	}); 
	
}
function Btframe_closeQuoteDialog(){
	if (document.getElementById('quoteDialog') != null) {
		$("#quoteDialog").dialog('close');
	}
}
		
//////////////////////////////////
function Btframe_tableList(tagId, json){
}
function Btframe_tree(tagId, json){
}
function Btframe_navigation(tagId, json){
}
function Btframe_topControl(tagId, json){
}
function Btframe_leftMenu(tagId, json){
}
function Btframe_tabPanel(tagId, json){
}

var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
gap,
indent,
meta = {    // table of character substitutions
    '\b': '\\b',
    '\t': '\\t',
    '\n': '\\n',
    '\f': '\\f',
    '\r': '\\r',
    '"' : '\\"',
    '\\': '\\\\'
},
rep;


function json_quote(string) {

escapable.lastIndex = 0;
return escapable.test(string) ?
    '"' + string.replace(escapable, function (a) {
        var c = meta[a];
        return typeof c === 'string' ? c :
            '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
    }) + '"' :
    '"' + string + '"';
}

function json_str(key, holder) {
var i,          // The loop counter.
    k,          // The member key.
    v,          // The member value.
    length,
    mind = gap,
    partial,
    value = holder[key];
if (value && typeof value === 'object' &&
        typeof value.toJSON === 'function') {
    value = value.toJSON(key);
}
if (typeof rep === 'function') {
    value = rep.call(holder, key, value);
}
switch (typeof value) {
case 'string':
    return json_quote(value);
case 'number':
    return isFinite(value) ? String(value) : 'null';
case 'boolean':
case 'null':
    return String(value);
case 'object':
    if (!value) {
        return 'null';
    }
    gap += indent;
    partial = [];
    if (Object.prototype.toString.apply(value) === '[object Array]') {
        length = value.length;
        for (i = 0; i < length; i += 1) {
            partial[i] = json_str(i, value) || 'null';
        }
        v = partial.length === 0 ? '[]' :
            gap ? '[\n' + gap +
                    partial.join(',\n' + gap) + '\n' +
                        mind + ']' :
                  '[' + partial.join(',') + ']';
        gap = mind;
        return v;
    }
    if (rep && typeof rep === 'object') {
        length = rep.length;
        for (i = 0; i < length; i += 1) {
            k = rep[i];
            if (typeof k === 'string') {
                v = json_str(k, value);
                if (v) {
                    partial.push(json_quote(k) + (gap ? ': ' : ':') + v);
                }
            }
        }
    } else {
        for (k in value) {
            if (Object.hasOwnProperty.call(value, k)) {
                v = json_str(k, value);
                if (v) {
                    partial.push(json_quote(k) + (gap ? ': ' : ':') + v);
                }
            }
        }
    }
    v = partial.length === 0 ? '{}' :
        gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
                mind + '}' : '{' + partial.join(',') + '}';
    gap = mind;
    return v;
}
}

function json_stringify(value, replacer, space) {
    var i;
    gap = '';
    indent = '';
    if (typeof space === 'number') {
        for (i = 0; i < space; i += 1) {
            indent += ' ';
        }
    } else if (typeof space === 'string') {
        indent = space;
    }
    rep = replacer;
    if (replacer && typeof replacer !== 'function' &&
            (typeof replacer !== 'object' ||
             typeof replacer.length !== 'number')) {
        throw new Error('JSON2.stringify');
    }
    return json_str('', {'': value});
}

$.fn.form2jsonStr = function() {
	var serializedParams = this.serialize();
	//alert(serializedParams);
	var obj = btframe.paramStr2json(serializedParams);
	var str=json_stringify(obj);
	return str;
};

$.fn.form2jsonStr4NoEncode = function() {
	var serializedParams = this.serialize();
	//alert(serializedParams);
	var obj = btframe.paramStr2json(serializedParams);
	var str=json_stringify(obj);
	str = decodeURIComponent(str);	
	return str;
};
function disableRightClick(e) {
	
	if (!document.rightClickDisabled) {
		if (document.layers) {
			document.captureEvents(Event.MOUSEDOWN);
			document.onmousedown = disableRightClick;
		} else
			document.oncontextmenu = disableRightClick;
		return document.rightClickDisabled = true;
	}
	if (document.layers || (document.getElementById && !document.all)) {
		if (e.which == 2 || e.which == 3) {
			return false;
		}
	} else {
		return false;
	}
}
var btframe=new Btframe();
var btFrame=new Btframe();
//设置表单的值
function setFormItemValue(formcode,curcode,id){
	$("#"+curcode).val(id);
}

function openAnnexDialog(formcode,curcode){
	var id=$("#"+curcode).val();
	var url="forwardAnnex_uploadAnnex?formcode="+formcode+"&curcode="+curcode;
	url+="&busiId="+id;
	btFrame.open(null,url,'请选择文件',null,null);
}

function downloadAnnex(formcode,curcode){
	var id=$("#"+curcode).val();
	var url="forwardAnnex_download?annexId="+id;
	location.href=url;
}
//关闭表单附件窗口
function closeFormItemAnnexFrame(formcode,curcode,id,fileName){
	btFrame.close(null);
	if(curcode!=null&&curcode!=''){
  		setFormItemAnnexValue(formcode,curcode,id,fileName);
  	}
}
//设置表单附件的值
function setFormItemAnnexValue(formcode,curcode,id,fileName){
	$("#"+curcode).val(id);
	$("#__"+curcode).html(fileName);
}


//扩展报表验证类型
$.extend($.fn.validatebox.defaults.rules, {
   isNum: {
       validator: function(value, param){
    	   return !isNaN(value);
       },
       message: '请输入一个数字'
   },
   
   isInteger:{
       validator: function(value, param){
    	   if(isNaN(value)){
    		   return false;
    	   }
    	   if(value.indexOf(".")!=-1){
    		   return false;
    	   }
    	   return true;
       },
       message: '请输入一个整数'
   },
   
   max: {
       validator: function(value, param){
    	 var v = parseInt(value);
    	 var p = parseInt(param[0]);
    	 if(v > p){
    		 return false;
    	 }
    	 return true;
       },
       message: '请输入小于{0}的数字'
   },
   
   min: {
       validator: function(value, param){
    	 var v = parseInt(value);
      	 var p = parseInt(param[0]);
      	 if(v < p){
      		 return false;
      	 }
      	 return true;
       },
       message: '请输入大于{0}的数字'
   },
   
   multipleValid : {
		validator : function (value, param) {
			var rules = $.fn.validatebox.defaults.rules;
			rules.multipleValid.message = 'Please enter at least {0} characters.';
			
			for(var i=0; i < param.length; i++){
				var par = param[i];
				
				for(var j in rules){
					if(par.indexOf("[")==-1){
						if(j==par){
							//无参数验证
							if(!rules[j].validator(value)){
								rules.multipleValid.message = rules[j].message;
								return false;
							}
							
						}
					}else{
						//有参数的验证
						var funcTemp = par.substring(0,par.indexOf("["));//length[2,5] ->  length
						var parmTemp = par.substring(par.indexOf("[")+1,par.lastIndexOf("]"));//length[2,5] ->  2,5
						
						
						if(j==funcTemp){
							var paramArray = parmTemp.split(",");
							if(!rules[j].validator(value,paramArray)){
								
								//提示信息中有替代符号 ：   请输入小于{0}的数字 大于{1}的数字
								var  mesTemp = rules[j].message;
								
								while(mesTemp.indexOf("{")!=-1){
									var startIndex = mesTemp.indexOf("{");
									var endIndex =  mesTemp.indexOf("}");
									var index = mesTemp.substring(startIndex+1,endIndex);
									var indexInt = parseInt(index);
									mesTemp = mesTemp.replace("{"+index+"}",paramArray[indexInt]);
								}
								
								rules.multipleValid.message = mesTemp;
								return false;
							}
						}
					}
					
				}
			}
			return true;
		},
		message : ''
	},
    /*必须和某个字段相等*/
        equalTo: { validator: function (value, param) {var oldValue=$(param[0]).val(); if(oldValue==value){return true;}else{return false;}  }, message: '字段不匹配' }
       
});
function getParam(){
    var url = window.document.location.href.toString();
    var u = url.split("?");
    if(typeof(u[1]) == "string"){
        u = u[1].split("&");
        var get = {};
        for(var i in u){
            var j = u[i].split("=");
            get[j[0]] = j[1];
        }
        return get;
    } else {
        return {};
    }
}  
