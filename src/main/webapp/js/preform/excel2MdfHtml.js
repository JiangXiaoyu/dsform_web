	//公共函数模块
	//#######################################
	//配置属性对象
	var preformConfig = {};
	//样式属性
	preformConfig.styAttr = {
		'font-weight' : 1,
		'font-style' : 1,
		'text-decoration' : 1,
		'font-family' : 1,
		'color' : 1,
		'background-image' : 1,
		'background-repeat' : 1,
		'background-position' : 1
	};
	
	//样式属性
	function initStyAttr(){
		return preformConfig.styAttr;
	}
	function checkDate(obj,fmt){
		var contenteditable = $("#"+obj.id).attr('contenteditable');
		if(contenteditable == 'false'){
			return false;
		}
		WdatePicker({dateFmt:fmt});
	}
	
	/**
     * 添加或删除css属性。
     * @param tagId {String}  指定控件的id。
     * @param fontAttr {String}  css属性。
     * @param value {String}  css属性值。
     */
	function addOrRemoveCss(tagId,fontAttr,value){
		var fontCss = $('#'+tagId).css(fontAttr);	
    	if(intSty[tagId] === void 0){ 
    		intSty[tagId]={}; 
    	}
    	if(value === void 0){
    		$('#'+tagId).css(fontAttr,'');
    		delete intSty[tagId][fontAttr];
    	}else{	
    		$('#'+tagId).css(fontAttr,value);	
    		intSty[tagId][fontAttr]= value; 
    	}	
	}
	
	/**
     * 获得div的值(div在fixfox下自带br,去掉font-family样式)。
     * @param jObj {jQuery对象}  指定div的jquery对象。
     * @return {String} 返回div的值。
     */
	function getDivValue(jObj){
		if(jObj === null || jObj.length === 0 ){
			return "";
		}
		var value = jObj.html().replace(/<BR>/ig,'');//i不区分大小写 g全局
		if(value === ''){
			return value;
		}
		value = value.replace(/<span style="font-family:ds; \d+(\.\d+)?px;">/ig,'');
		value = value.replace(/<span style='font-family:ds; \d+(\.\d+)?px;'>/ig,'');
		value = value.replace(/<\/span>/ig,'');
		return value;
	}
	
	 /**
     * 获得事件源(IE CHROME FIXFOX兼容)。
     * @param 
     * @return 
     */
	function getEventTarget(event){
		if(event === null){
			return null;
		}
		return event.srcElement ? event.srcElement : event.target;
	}
	
	 /**
     * 获得事件源的id(IE CHROME FIXFOX兼容)。
     * @param 
     * @return 
     */
	function getEventTargetId(event){
		var target = getEventTarget(event);
		if(target){
			return $(target).attr('id');
		}
		return '';
	}
	
	 /**
     * 触发输入框内容改变事件(IE CHROME FIXFOX兼容)。
     * @param 
     * @return 
     */
	function triggerChange(jobj){
		if(window.attachEvent){
			jobj.trigger('propertychange');
		}else{
			jobj.trigger('input');
		}
	} 
	
	 /**
     * 触发下拉框改变事件(IE CHROME FIXFOX兼容)。
     * @param 
     * @return 
     */
	function triggerSelectChange(jobj){
		if(window.attachEvent){
			jobj.trigger('change');
		}else{
			jobj.trigger('change');
		}
	} 
	
	 /**
     * 代码触发事件(IE CHROME FIXFOX兼容)。
     * @param 
     * @return 
     */
	function triggerEvent(jobj,event1,event2){ 	
		if(window.attachEvent){
			//ie事件
			jobj.trigger(event1);
		}else{
			//chrome fixfox事件
			jobj.trigger(event2);
		}
	} 		
	
	/**
     * 检查浏览器和浏览器版本
     * @return {String} 返回浏览器类型和版本。
     */
	function checkBrowser(){
	 	var browserName=navigator.userAgent.toLowerCase();
		var Sys = {};
		var rtn = false;
	 
	    if(/msie/i.test(browserName) && !/opera/.test(browserName)){
	        strBrowser = "IE: "+browserName.match(/msie ([\d.]+)/)[1];
	  		rtn = true;
	    }else if(/firefox/i.test(browserName)){
	        strBrowser = "Firefox: " + browserName.match(/firefox\/([\d.]+)/)[1];; 
	    }else if(/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName)){
	        strBrowser = "Chrome: " + browserName.match(/chrome\/([\d.]+)/)[1];
	    }else if(/opera/i.test(browserName)){
	        strBrowser = "Opera: " + browserName.match(/opera.([\d.]+)/)[1];
	    }else if(/webkit/i.test(browserName) &&!(/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName))){
	        strBrowser = "Safari: ";
	    }else{
	        strBrowser = "unKnow,未知浏览器 ";
	    }
	 	return strBrowser;
	}
	
	 /**
     * 判断是否是空对象。
     * @param obj {Object} 需要处理的js对象。
     * @return {Boolean} true表示是空对象,false表示不是空对象。
     */
	function isNullObject(obj){
		if(!obj){
			return true;
		}
		for(var name in obj){
			if(obj.hasOwnProperty(name)){//判断是否当前对象的属性
				return false;
			}
		}
		return true;
	}
	
	 /**
     * 转换数字
     * @param pobjVal {Object} 需要处理对象。
     * @return {Number} 返回数字。
     */
	function toNumber(pobjVal){
		var dblRet = Number.NaN;	
		if (typeof(pobjVal) == 'number'){	
			return pobjVal;	
 		}else{	
 			dblRet = new Number(pobjVal);
 		}	
 		return dblRet.valueOf();	
 	}	
	
	 /**
     * 清除字符串两端的回车和制表键。
     * @param str {String} 需要处理的字符串。
     * @return {String} 处理过的字符串。
     */
	function trim(str){
        if(!str || "" == str){
            return "";
        }
        for(; str[length] > 0 && " \n\r\t".indexOf(str.charAt(0)) > -1;){
            str = str.substring(1);
        }
        for(; str.charAt(str.length - 1).length > 0 && " \n\r\t".indexOf(str.charAt(str.length - 1)) > -1;){
            str = str.substring(0, str.length - 1);
        }
        return str;
    }
	
	/**
     * 判断是否是ie浏览器。
     * @return {Boolen} true表示ie浏览器.false表示非ie浏览器。
     */
	function isIE() {
      if (!!window.ActiveXObject || "ActiveXObject" in window)
        return true;
      else
        return false;
    }
    
    /**
     * 计算表达式的值
     * param strExp {String} 表达式
     * param varArray {Array} 变量数组,全为''时,不计算
     * param valueArray {Array} 变量值数组,部分为'',当做0计算
     * param isRigor {Boolean} 是否严格. isRigor为false时,变量值为空当做0来计.isRigor为true时,变量值为空返回Null
     * return {String} 表达式的值
     */
    function calcExp(strExp,varArray,valueArray,isRigor){
    	if(varArray === null || valueArray === null){
    		return null;;
    	}
    	if(varArray.length != valueArray.length){
    		return null;
    	}
    	var isEmptyArray = true;
    	for(var i = 0; i < valueArray.length; i++ ){
    		if(isRigor && valueArray[i] === ''){
    			return null;//isRigor为true时,变量值为空返回Null
    		}
    		if(valueArray[i] != ''){
    			isEmptyArray = false;
    		}else{
    			valueArray[i] = 0;
    		}
    	}
    	if(isEmptyArray){
    		return null;
    	}
    	var exp = new Expression('');	
	 	exp.Expression(strExp);		
		exp.Parse();	
		for(var i = 0; i < varArray.length; i++ ){
			exp.AddVariable(varArray[i], valueArray[i]);
		}
    	return exp.Evaluate();
    }
    
     /**
     * 保存时删除某些空属性和无用属性
     * @param obj 数据对象
     * @return void 0
     */
    function removeNullAttr(obj){
    	if(obj['paramValue']){
    		delete obj['paramValue'];
    	}
    	if(obj['keyValue']){
    		delete obj['keyValue'];
    	}
    	if(isNullObject(obj['intSty'])){//样式
    		delete obj['intSty'];
    	}	
    	if(isNullObject(obj['dsplData'])){//沉降数据
    		delete obj['dsplData'];
    	}	
    	if(isNullObject(obj['dspl110Data'])){//沉降预警数据
    		delete obj['dspl110Data'];
    	}
    }
    
    /**
     * 初始化允许的属性(增加属性,只需在这里扩展即可)
     * @param
     * @return void0
     */
    function initAllowAttr(){
    	var map = {};
    	//动火申请
    	map.checkpart = 1;//动火部位
    	
    	map.firestart = 1;//动火作业开始日期
    	map.firestarttime = 1;//开始时
    	map.firestartminute = 1;//开始分
    	
    	map.fireend = 1;//动火作业结束日期
    	map.firesendtime = 1;//结束时
    	map.firesendminute = 1;//结束分
    	
    	map.firepart = 1;//动火部位
    	map.firestartdate = 1;//动火开始时间
    	map.fireenddate = 1;//动火结束时间
    	
    	//
    	map.approachdate = 1;//机械进场日期
    	map.exitdate = 1;//机械退场日期
    	map.safetyaccep = 1;//验收日期
    	map.part = 1;//施工部位
    	
    	//工程测量
    	map.unit = 1;//单位工程名称
    	map.use = 1;//子分部名称
    	map.potion = 1;//部位
    	
    	//下拉框传值 取值
    	map.comsel = 1;//文本值
    	map.comselval = 1;//value值
    	map.comsel = 1;//文本值
    	map.comsel1val = 1;//value值
    	map.rt = 1;//checkBox
    	map.rdate1 = 1;
    	map.rdate2 = 1;
    	map.rdate3 = 1;
    	map.select = 1;
    	map.select1 = 1;
    	map.select2 = 1;
    	map.select3 = 1;
    	map.testCap = 1;//检验批容量
    	map.testCap = 1;//检验批容量
    	preformConfig.allowAttr = map;
    }
    
    
    /**
     * 生成指定最小值和最大值之间的随机数
     * @param min {Number} 最小值
     *        max {Number}  最大值
	 * @return {Number} 随机数
     */
    function random(min,max){
    	if (max == null) {
     		 max = min;
     		 min = 0;
    	}
   		return min + Math.floor(Math.random() * (max - min + 1));
    }
    
	/**
	 * 获得指定数字的小数位
	 * @param num{Number}
	 * @return
	 */
	function getNumPcs(num){
		var str = num.toString();
		var index = str.indexOf('.');
		if(index!=-1){
			return str.substr(index+1).length;
		}else{
			return 0;
		}
	}
  	
  	/**
  	* 判断指定对象是否是Object
  	* @param obj {Object} 指定对象
  	* @return {Boolean}
  	*/
  	function isObject(obj){
  		var type = typeof obj;
   		return type === 'function' || type === 'object' && !!obj;
  	}
  	
  	/**
  	* 判断对象是否为null或者undefined
  	* @param obj {Object}指定对象
  	* @return {Boolean}true或false
  	*/
  	function isNullOrUndefined(obj){
  		return obj === null || obj === void 0;
  	}
  	
  	/**
  	* 将字符串中的{0}{1}{2}...替换为参数列表中的元素
  	* @param str {String}指定字符串
  	* @param argsArray {Array}参数列表
  	* @return str {String} 返回最终的字符串
  	*/
  	function _strFormat(str,argsArray){
  		return str.replace(/\{(\d+)\}/g, //替换{0}{1}
				function(s,i){
					return argsArray[i];
	      		}
      	);	
  	}
  	
  	/**
  	 * 将指定数字四舍五入保留len位,去掉末尾的0
  	 * @param num {Number} 指定数字
  	 * @param len {Number} 指定保留位数
  	 * @return
  	 */
  	function _numToFixed(num,len){
  		num = num.toFixed(len);//精确为2
  		num =  parseFloat(num);//去掉末尾的0
  		return num;
  	}
  	
  	/**
  	 * 打乱指定数组的顺序
  	 * @param array {Array}指定数字数组
  	 * @return
  	 */
	function disorder(array){
		var length = array.length;
		for (var i = 0; i < length; i++) {
			var rand = parseInt(length * Math.random());	//从数组中选出一个随机位置
			var temp = array[i];
			array[i] = array[rand];
			array[rand] = temp;								// 交换随机位置上与当前位置的值，完成乱序
		}
		return array;
	} 
  	
	/**
	 * 规约函数
	 * @param array {Array} 数组
	 * @param iteratee {Function} 被迭代者
	 * @returns {Number} 返回reduce结果
	 */
	function reduce(array,iteratee){
		var accum = 0;//累加器
		for(var i = 0; i < array.length; i++){
			var current = array[i];
			accum = iteratee(accum,current);
		}
		return accum;
	}
  	
  	/**
  	* 获得当前时间,格式为"yyyy年MM月dd日"
  	* @param 
  	* @return 返回当前年月日
  	*/
	function getCurDate(){	
		var day = new Date(); 	
		var year = day.getFullYear(); 	
		var month = day.getMonth()+1;	
		month = month > 9 ? day.getMonth()+1 : '0' + (day.getMonth()+1); 	
		var day = day.getDate();	
		day = day > 9 ? day : '0' + day; 	
		return year + '年' + month + '月' + day + '日'; 
	}
	
	/**
  	* 将http请求中的参数解析为js对象(用于数据的自动填充)
  	* @param 
  	* @return 返回参数的js对象
  	*/
	function parseRequestParam(){ 
		var paramValue = $('#paramValue').val(); 
		paramValue = decodeURIComponent(decodeURIComponent(paramValue)); 
		if(paramValue){
			paramValue = JSON.parse(paramValue); 
			param = paramValue ? paramValue : {}; 
			alert(2);
			alert(param.companyId);
		}
	}  
	
	/**
  	* 解析tag id与Excel行列为js对象(用于公式计算)
  	* @param 
  	* @return 返回tag id与Excel行列的js对象
  	*/
	function parseTagId(){ 
		var keyVal = $('#keyValue').val(); 
		map = JSON.parse(keyVal); 
	} 
	
	/**
  	* 重新设置父类ifrmae的大小	(初始化完成后会调用此方法)
  	* @param 
  	* @return 
  	*/
	function resizeParantFrame(){
	   	var height = calcPageHeight(); 
     	if(parent.document != null && parent.document.getElementById(iframeId)!=null){ 
    		var formContent = parent.document.getElementById(iframeId); 
    		formContent.style.height = height + 'px' ;  
    		formContent.style.width = '1198px' ; 
		}
	} 
	
	/**
  	* 计算当前页面的高度
  	* @param 
  	* @return 
  	*/
	function calcPageHeight() {	
		var doc = document;
		var cHeight = Math.max(doc.body.clientHeight, doc.documentElement.clientHeight);	
		var sHeight = Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight);	
		var oHeight = Math.max(doc.body.offsetHeight, doc.documentElement.offsetHeight);	
		var height  = Math.max(cHeight,sHeight,oHeight);	
		return height;	
	}	
	
  	/**
  	* 获得外部父类iframe的id
  	* @param 
  	* @return str {String} 返回外部iframe的id
  	*/
  	function getFormContentId(){
  		var iframeId = param.iframeId ? param.iframeId : 'formContent';
  		return iframeId;
  	}
	//#######################################
	
	//数据验证模块
	//#######################################
	//验证规则
    preformConfig.validateRule = {
    	isNum :{
	      	validator: function(value, param){
	    	   return !isNaN(value);
	      	},
       		message: '请输入一个数字!'
   		},
   		isInt :{
      		validator: function(value, param){
      			if(value === ''){
      				return true;
      			}
      			return /^-?[1-9]\d*$/.test(value);
       		},
      		message: '请输入一个整数!'
  		 },
  		 isPosiInt :{
      		validator: function(value, param){
      			if(value === ''){
      				return true;
      			}
 				return /^[1-9]\d*$/.test(value);
       		},
      		message: '请输入一个正整数!'
  		 },
  		 isNotNull : {
      		validator: function(value, param){
				if(!value || value==''){
					return false;
				}
				return true;
       		},
      		message: '不能为空!'
  		 },
  		 isPosiNum : {
      		validator: function(value, param){
 				return /^\d+(\.{0,1}\d+){0,1}$/.test(value);
       		},
      		message: '请输入一个正数!'
  		 },
  		 maxLength : {
      		validator: function(value, param){
				if(value && value.length > param){
					return false;
				}
				return true;
       		},
      		message: '请最多输入{0}位!'
  		 },
  		 minLength : {
      		validator: function(value, param){
				if(value && value.length < param){
					return false;
				}
				return true;
       		},
      		message: '请至少输入{0}位!'
  		 },
  		 min : {
      		validator: function(value, param){
      			if(value === ''){
      				return true;
      			}
				value = + value;
				param = + param;
				return value > param ? true : false;
       		},
      		message: '请输入大于{0}的数字!'
  		 },
  		 max : {
      		validator: function(value, param){
      			if(value === ''){
      				return true;
      			}
				value = +value;
				param = +param;
				return value < param ? true : false;
       		},
      		message: '请输入小于{0}的数字!'
  		 },
  		 isLength : {
      		validator: function(value, param){
				if(value && value.length != param){
					return false;
				}
				return true;
       		},
      		message: '请输入{0}位!'
  		 },
  		 isDataNo : {
      		validator: function(value, param){
 				return /^[A-Za-z]\d{1,2}$/.test(value);
       		},
      		message: '请输入1个字母+1个数字或1个字母+2个数字!'
  		 }
    };
    
    
	/**
  	* 指定jQuery对象和子孙对象的数据验证
  	* @param jObj {jQuery对象} 指定jQuery对象
  	* @return flag {Boolean} 验证是否合法
  	*/
    function validateForm(jObj){
    	var flag = validate(jObj);
    	jObj.find("[validate]").each(function(){
    		flag = flag && validate($(this));
    	});
    	return flag;
    }
    
    /**
     * 指定jQuery对象的数据验证(不验证子孙对象)
     * @param Obj {jQuery对象} 指定jQuery对象
     * @return flag {Boolean} 验证是否合法
     */
    function validate(jObj){
    	if(jObj.length == 0){
    		return;
    	}
    	var rule = jObj.attr('validate');
    	if(!rule){
    		return true;
    	}
    	rule = rule.split(',');
    	var flag = false;
    	for(var i = 0; i < rule.length; i++){
    		var ruleVal = rule[i];
    		var param = null;
    		if(ruleVal.indexOf("(") != -1){
    			param = ruleVal.substring(ruleVal.indexOf("(")+1, ruleVal.indexOf(")",ruleVal.indexOf("(")));
    			ruleVal = ruleVal.substring(0, ruleVal.indexOf("("));
    		}
	    	if(preformConfig.validateRule[ruleVal]){
	    		var value = '';
	    		if(jObj.is('input') || jObj.is('select') ){
	    			var dis = jObj.attr('disabled');
	    			if(dis == 'false' || dis == 'disabled' ){
	    				return true;
	    			}
	    			value = jObj.val();
	    		}else if(jObj.is('div')){
	    			var contenteditable = jObj.attr('contenteditable');
	    			if(contenteditable == 'false'){
	    				return true;
	    			}
	    			value = getDivValue(jObj);
	    		}
	    		flag =  preformConfig.validateRule[ruleVal]['validator'].call(null,value,param);
 			    if(!flag){
 			    	var args = [param];
 			    	var message = preformConfig.validateRule[ruleVal]['message'];
 			    	if(message.indexOf("{") != -1){
      					message = _strFormat(message,args); 
 			    	}
    				layer.tips(message, jObj[0], {time : 2000});
    				break;
    			}
	    	}
    	}
    	return flag;
    }
	//#######################################
	
	//生成特殊数据(编辑器 文本域 计算控件值 编号 沉降位移 编号 标题 )
	//#######################################
	function geneSpecData(obj){
		handleEditorData(obj);		//处理编辑器
   		handleTextareaData(obj);	//处理文本域
      	handleSpanData(obj);		//处理span数据(自动计算控件)
		handleDsplData(obj);		//处理沉降位移数据
      	handleSnData(obj);			//处理编号数据
      	handleSectionData(obj);		//处理单位工程分部子分部分项部位数据
		handleTitleData(obj);		//处理标题数据
		handleAuthData(obj);		//处理auth date
		handleTestData(obj);		//处理检验批 date
		handleItemNo(obj);			//处理itemNo
		handleNoticeId(obj);		//处理通知单
		handleAttrData(obj);		//处理att数据
		//handleBatchData(obj);		//处理批量传值数据（子分部工程名称/分项工程名称/检验批数量）
	}
	function handleBatchData(){
		var capacitys = param.capacitys;
		var i =0;
		if(capacitys!=null && capacitys.length > 0){
			$('div[widgetype^="capacity"]').each(function(){
			  var checkcapacity = /^capacity\d+/;
			  if(checkcapacity.test($(this).attr("widgetype")) && capacitys[i]){
				  $(this).text(capacitys[i]);
				  i++;
			  }
		
			})
		}
		var subsecns = param.subsecns;
		var j =0;
		if(subsecns!=null && subsecns.length > 0){
			$('div[widgetype^="subsecn"]').each(function(){
				var checkcapacity = /^subsecn\d+/;
				if(checkcapacity.test($(this).attr("widgetype")) && subsecns[j]){
					$(this).text(subsecns[j]);
					j++;
				}
			
			})
		}
		var itemns = param.itemns;
		var k = 0;
		if(itemns!=null && itemns.length > 0){
			$('div[widgetype^="itemn"]').each(function(){
				var checkcapacity = /^itemn\d+/;
				if(checkcapacity.test($(this).attr("widgetype")) && itemns[k]){
					$(this).text(itemns[k]);
					k++;
				}
			
			})
		}
		var itemnums = param.itemnums;
		var o = 0;
		if(itemnums!=null && itemnums.length > 0){
			$('div[widgetype^="itemnum"]').each(function(){
				var checkcapacity = /^itemnum\d+/;
				if(checkcapacity.test($(this).attr("widgetype")) && itemnums[o]){
					$(this).text(itemnums[o]);
					o++;
				}
			})
		}
		var partns = param.partns;
		var l = 0;
		if(partns!=null && partns.length > 0){
			$('div[widgetype^="partn"]').each(function(){
				var checkcapacity = /^partn\d+/;
				if(checkcapacity.test($(this).attr("widgetype")) && partns[l]){
					$(this).text(partns[l]);
					l++;
				}
				
			})
		}
		var inspnums = param.inspnums;
		var m = 0;
		if(inspnums!=null && inspnums.length > 0){
			$('div[widgetype^="inspnum"]').each(function(){
				var checkcapacity = /^inspnum\d+/;
				if(checkcapacity.test($(this).attr("widgetype")) && inspnums[m]){
					$(this).text(inspnums[m]);
					m++;
				}
				
			})
		}
	}
	
	/**
	 * 处理编辑器数据
	 * @param obj {js对象}
	 * @return	
	 */
	function handleEditorData(obj){
		for(var o in editorList){ 
     		var data = editorList[o].getData(); 
			//data = data.replace(/(^\\s*)|(\\s*$)/g,'');	  //去掉头尾空白
   			if(data != null && data != ''){ 
     			obj[o] = data; //将+ 替换为%2B,两次encode %252B
   			} 
   		} 
	}
	
	/**
	 * 处理文本域数据
	 * @param obj {js对象}
	 * @return	
	 */
	function handleTextareaData(obj){
		$.each($('div [isTextarea]'),function(){ 
     		var value = $(this).html(); 
      		if(value == '') return true;	 
      		obj[$(this).attr('name')] = value;
      	});
	}
	
	/**
	 * 处理span数据
	 * @param obj {js对象}
	 * @return	
	 */
	function handleSpanData(obj){
		$.each($('span[widgeType][id]'),function(){ 
     		var value = $(this).html(); 
      		if(value == '') return true;	 
      		obj[$(this).attr('name')] = value;
      	});
	}
	
	/**
	 * 处理沉降位移数据
	 * @param obj {js对象}
	 * @return	
	 */
	function handleDsplData(obj){
		var dsplRlt = generateDsplDetail();	
   		if(dsplRlt == 0){ 
   			obj.dsplData = dsplData;
      		obj.dspl110Data = dspl110Data;
      	}else if(dsplRlt == 1){	
      		obj.dsplData = dsplData;
      	}	
	}
			
	/**
	 * 处理编号数据
	 * @param obj {js对象}
	 * @return	
	 */
	function handleSnData(obj){
		var snType = preformConfig.snType;
		var prefVal = '';
		//带前缀的文件编号
		if(snType == 'prefsn'){
			prefVal = $('input[widgetype=snInput]').attr('prefVal');	
		}else if('brsn' == snType){
			prefVal = $('input[widgetype=snInput]').attr('prefVal');
			obj.prefVal = prefVal;
		}else if('brdatasn' == snType){
			prefVal = $('input[widgetype=snInput]').attr('prefVal');
		}else if('brprojsn' == snType){
			prefVal = $('input[widgetype=snInput]').attr('prefVal');
		}else if('mulsn' == snType || "secsn" == snType ){//resetSnInput4Mongodb时需要用到
			var saveSn = '';
			$('[widgetype=snInput]').each(function(){
				if($(this).is('input')){
					saveSn += $(this).val();
				}else if($(this).is('span')){
					saveSn += $(this).html();
				}
			});	
			if(saveSn != ''){
				obj.saveSn = saveSn;
			}
		}
		if(prefVal && prefVal != ''){
			obj.prefVal = prefVal;//编号前缀值
		}
		if(preformConfig.snType){
			obj.snType = preformConfig.snType;//编号类型
		}
		if(preformConfig.gbVer){
			obj.gbVer = preformConfig.gbVer;//国标版本
		}
	}	
	
	/**
	 * 处理标题数据
	 * @param obj {js对象}
	 * @return	
	 */
	function handleTitleData(obj){
		var title = "";
		var attrStr = '|text3|unit|sec|subsec|item|part|unitn|secn|itemn|partn|';
		$("div[widgeType='title']").each(function(){	
			var t = $(this).attr('type');
			var attr = $(this).attr('attr');
			var value = getDivValue($(this));
			if(attrStr.indexOf('|' + attr + '|') != -1){
				if(attr === 'text3'){
					obj['unit'] = value;//处理标题中的单位工程分部子分部分项部位数据
				}else{
					obj[attr] = value;//处理标题中的单位工程分部子分部分项部位数据
				}
			}
			title += value;
		});
		obj.title = title;
	}
	
	/**
	 * 处理单位工程(text3|unit)分部(sec)子分部(subsec)分项(item)部位(part)数据     ---text3是为了兼容单位工程旧数据
	 * @param obj {js对象}
	 * @return	
	 */
	function handleSectionData(obj){
		$("div[widgeType='text3'],div[widgeType='unit'],div[widgeType='sec'],div[widgeType='subsec'],div[widgeType='item'],div[widgeType='part']").each(function(){
			var type = $(this).attr('widgeType');
			var value = getDivValue($(this));
			if(type === 'text3'){//兼容旧数据
				obj['unit'] = value;
			}else{
				obj[type] = value;
			}	
		});
	}
	

	/**
	 * 处理"什么人什么时间填写的表单"
	 * @param obj {js对象}
	 * @return	
	 */
	function handleAuthData(obj){
		var authTime = {};
		$("div[widgeType='date'][auth]").each(function(){
			var tempObj = {};
			var tagId = $(this).attr('id');//时间id
			var authTagId = $(this).attr('auth');
			var timeValue = getDivValue($(this));
			if(!authTagId){
				return true;
			}
			var authArr = new Array();
			var tagArr = authTagId.split(',');
			for(var i = 0; i < tagArr.length; i++){
				authTagId = map[tagArr[i]];
				var authValue = "";
				if($('#'+authTagId).is('input')){
					authValue = $('#'+authTagId).val();
				}else if($('#'+authTagId).is('div')){
					authValue = getDivValue($('#'+authTagId));
				}
				if(authValue){
					authArr.push(authValue);
				}
			}
			if(timeValue){
				tempObj['time'] = timeValue;
				tempObj['auth'] = authArr;
				authTime[tagId] =  tempObj;
			}
		});
		if(!isNullObject(authTime)){
			obj.authTime = authTime;
		}
	} 
	
	/**
	 * 处理检验批数据
	 * @param obj {js对象}
	 * @return	
	 */
	function handleTestData(obj){
		var jTestcap = $("div[widgeType=testcap]");
		if(jTestcap.length == 1){
			obj.testcap = $("div[widgeType=testcap]").html();//检验批容量(带单位)
			obj.unitNum = jTestcap.attr('unitNum');//检验批数量(不带单位)
		}
	}
		
	/**
	 * 处理检验批数据
	 * @param obj {js对象}
     * @return
	 */
	function handleItemNo(obj){
		var itemno = $("div[widgeType=itemno]");
		if(itemno.attr('val')){
			obj.itemNo = itemno.attr('val');
		}
	}
	
	/**
	 * 处理通知单数据
	 * @param obj {js对象}
     * @return
	 */
	function handleNoticeId(obj){
		var noticeSele = $("select[widgeType=notice]");
		var noticeInput = $("input[widgeType=notice]");
		
		var noticeNo = noticeInput.val();
		if(noticeNo){
			var opts = noticeSele.find('option');	
			opts.each(function(){
				if(noticeNo == $(this).val()){
					obj.noticeId = $(this).attr('id');
				}
			});
		}
	}
	
	/**
	 * 处理属性数据
	 * @param obj {js对象}
     * @return
	 */
	function handleAttrData(obj){
		if(!preformConfig.allowAttr){
			initAllowAttr();
		}
		var allowAttr = preformConfig.allowAttr;
		var jqObj = $("div[attr]");
		jqObj.each(function(){
			var attrs = $(this).attr('attr');
			if(attrs){
				var array = JSON.parse(attrs);
				var val = $(this).html();
				for(var i = 0; i < array.length; i++){
					var attr = array[i];
					if(allowAttr[attr]){
						obj[attr] = val;
					}
				}
			}
		});
		var jqObjs = $("input[attr]");
		jqObjs.each(function(){
			var attrs = $(this).attr('attr');
			if(attrs){
				var array = JSON.parse(attrs);
				var val = $(this).val();
				for(var i = 0; i < array.length; i++){
					var attr = array[i];
					if(allowAttr[attr]){
						obj[attr] = val;
					}
				}
			}
		});
	}
	//#######################################
	
	
	//对话框模块
	//#######################################
	/**
	 * 对话框内容工厂
	 * @param type {类型}
	 * @return dialog的内容
	 */
	function getDlgContent(type,param){
		if(!preformConfig['dlgStr']){
			preformConfig.dlgStr = {};
		}
		if(preformConfig['dlgStr'][type]){
			return preformConfig['dlgStr'][type];
		}
		var tempArr = new Array();	
		if("random" === type){
			tempArr.push("<li><label>合格率:</label><input id='qr' type='text' value='100'>%</li>");	
			tempArr.push("<li><label>小数位数:</label><input id='dd' type='text' value='0'></li>");	
			tempArr.push("<div align='center'>");
			tempArr.push("<input type='radio' name='rdRng' value='0' checked='checked'/>整个表单");	
			tempArr.push("<input type='radio' name='rdRng' value='1'/>整行");
			tempArr.push("<input type='radio' name='rdRng' value='2'/>整列");
			tempArr.push("</div>");
			tempArr.push("<BR>");
			tempArr.push("<li style='text-align:center;'><input type='button' id='creRndBtn' class='new-btn-yellow' value='生成' onclick='setRandom();'>");
			tempArr.push("&nbsp;&nbsp;<input type='button' id='cleanRndBtn' class='new-btn-gray' value='清除' onclick='cleanRandom();'></li>");
		}else if("initNo" === type){
			tempArr.push("<br><li><label style='width:180px;'>请输入文件的初始编号:</label><input type='text' id='firstNo' value='01' validate='isPosiInt,max(999),min(0)'></li>");	
			tempArr.push("<br><li style='text-align:center;'><input type='button' class='new-btn-yellow' value='确定' onclick='saveSnCurValue();'>");
			tempArr.push("&nbsp;&nbsp;<input type='button' class='new-btn-gray' value='取消' onclick='closeDlg();'></li>");
		}else if("road" === type){
			tempArr.push("<br><li><label style='width:180px;'>请道路类型:</label><select id='roadType' name='roadType' style='height:23px;width:145px;'><option value='0'>快速路</option><option value='1'>主干路</option><option value='2'>其他道路</option>></select></li>");	
			tempArr.push("<br><li style='text-align:center;'><input type='button' class='new-btn-yellow' value='确定' onclick='saveRoadType();'>");
			tempArr.push("&nbsp;&nbsp;<input type='button' class='new-btn-gray' value='取消' onclick='closeDlg();'></li>");
		}else if("dspl" === type){
			tempArr.push("<ul style='padding:10px;'>");
			tempArr.push("<table id='dsplConfigTable' style='width:100%;border-collapse: collapse;border-spacing: 0;'>");
			tempArr.push("	<tr height='30px'>");
			tempArr.push("		<td colspan='2' style='font-weight:bold;'>观测点编号</td>");
			tempArr.push("	</tr>");
			tempArr.push("	<tr>");
			tempArr.push("		<td>观测点总数：<input type='text' id='dsplTotal' name='dsplTotal' validate='isPosiInt,isNotNull' style='width:140px;'></td>");
			tempArr.push("		<td>编号规则：<select id='dsplNoRule' name='dsplNoRule' onchange='dsplNoRuleChange(this);' style='height:23px;width:145px;'><option value='0'>阿拉伯数字</option><option value='1'>小写字母</option><option value='2'>大写字母</option><option value='3'>罗马数字</option><option value='4'>前缀+序号</option><option value='5'>序号+后缀</option></select></td>");
			tempArr.push("	</tr>");
			tempArr.push("	<tr>");
			tempArr.push("		<td>前缀或后缀：<input type='text' id='prefixSuffix' name='prefixSuffix' disabled='disabled' validate='isNotNull' style='width:140px;'></td>");  
			tempArr.push("		<td>起始序号：<input type='text' id='startNo' name='startNo' validate='isPosiInt,isNotNull' value='1' style='width:140px;'></td>");
			tempArr.push("	</tr>");
			tempArr.push("	<tr height='30px'>");
			tempArr.push("		<td colspan='2' style='font-weight:bold;'>预警值设置</td>");
			tempArr.push("	</tr>");
			tempArr.push("	<tr>");
			tempArr.push("		<td colspan='2'>每次检测允许变化量(mm)：<input type='text' id='thisOfs' name='thisOfs' validate='isPosiNum,isNotNull'></td>");
			tempArr.push("	</tr>");
			tempArr.push("	<tr>");
			tempArr.push("		<td colspan='2'>检测累计允许变化量(mm)：<input type='text' id='accumOfs' name='accumOfs' validate='isPosiNum,isNotNull'></td>");
			tempArr.push("	</tr>");
			tempArr.push("	<tr height='50px'>");
			tempArr.push("		<td colspan='2' align='center'><input class='new-btn-gray' type='button' value='生成观测记录' onclick='dsplConfOk();'></td>");
			tempArr.push("	</tr>");
			tempArr.push("</table>");	
			tempArr.push("</ul>");
		}else if(type === 'brsn'){//分部编号(分部2-子分部2-顺序号3)
    		tempArr.push("<ul style='padding:10px;'>");
			tempArr.push("<table id='brNoCfgDlg' style='width:100%;border-collapse: collapse;border-spacing: 0;'>");
			tempArr.push("	<tr height='30px'>");
			tempArr.push("		<td colspan='3'>验收标准:<select id='gbSlt' name='gbSlt' onchange='gbSltChange(this);' style='padding:2px;'><select></td>");
			tempArr.push("	</tr>");
			tempArr.push("	<tr height='30px'>");
			tempArr.push("		<td>分部(2位):</td>");
			tempArr.push("		<td>子分部(2位):</td>");
			tempArr.push("		<td>顺序号(3位):</td>");
			tempArr.push("	</tr>");
			tempArr.push("	<tr height='30px'>");
			tempArr.push("		<td><select id='brSlt' name='brSlt' onchange='brSltChange(this);' validate='isNotNull' style='padding:2px;width:150px;'><select></td>");
			tempArr.push("		<td><select id='brItemSlt' name='brItemSlt' validate='isNotNull' style='padding:2px;width:150px;'><select></td>");
			tempArr.push("		<td><input style='width:120px;background-color:#dddddd;' value='" + param.snVal + "' readOnly='readOnly'></td>");
			tempArr.push("	</tr>");
			tempArr.push("	<tr height='70px'>");
			tempArr.push("		<td colspan='3' align='center'><input type='button' class='new-btn-yellow' value='确定' onclick='brNoOk();'>&nbsp;&nbsp;<input type='button' class='new-btn-gray' value='重置' onclick='resetBrNo();'></td>");
			tempArr.push("	</tr>");
			tempArr.push("</table>");	
			tempArr.push("</ul>");
    	}else if(type === 'brdatasn'){//分部资料类型编号(分部2-子分部2-资料类别2（自定义）-顺序号)
    		tempArr.push("<ul style='padding:10px;'>");
			tempArr.push("<table id='brNoCfgDlg' style='width:100%;border-collapse: collapse;border-spacing: 0;'>");
			tempArr.push("	<tr height='30px'>");
			tempArr.push("		<td colspan='3'>验收标准:<select id='gbSlt' name='gbSlt' onchange='gbSltChange(this);' style='padding:2px;'><select></td>");
			tempArr.push("	</tr>");
			tempArr.push("	<tr height='30px'>");
			tempArr.push("		<td>分部(2位):</td>");
			tempArr.push("		<td>子分部(2位):</td>");
			tempArr.push("		<td>资料类别(2-3位):</td>");
			tempArr.push("		<td>顺序号(3位):</td>");
			tempArr.push("	</tr>");
			tempArr.push("	<tr height='30px'>");
			tempArr.push("		<td><select id='brSlt' name='brSlt' onchange='brSltChange(this);' validate='isNotNull' style='padding:2px;width:150px;'><select></td>");
			tempArr.push("		<td><select id='brItemSlt' name='brItemSlt' validate='isNotNull' style='padding:2px;width:150px;'><select></td>");
			tempArr.push("		<td><input id='dataNo' name='dataNo' validate='isNotNull,isDataNo()' style='width:120px;' ></td>");
			tempArr.push("		<td><input style='width:120px;background-color:#dddddd;' value='" + param.snVal + "' readOnly='readOnly'></td>");
			tempArr.push("	</tr>");
			tempArr.push("	<tr height='70px'>");
			tempArr.push("		<td colspan='4' align='center'><input type='button' class='new-btn-yellow' value='确定' onclick='brNoOk();'>&nbsp;&nbsp;<input type='button' class='new-btn-gray' value='重置' onclick='resetBrNo();'></td>");
			tempArr.push("	</tr>");
			tempArr.push("</table>");	
			tempArr.push("</ul>");
    	}else if(type === 'brprojsn'){//分部项目编号(工程项目代码（自定义）-类别代码2（自定义）-分部代码2-顺序号3)
    		tempArr.push("<ul style='padding:10px;'>");
			tempArr.push("<table id='brNoCfgDlg' style='width:100%;border-collapse: collapse;border-spacing: 0;'>");
			tempArr.push("	<tr height='30px'>");
			tempArr.push("		<td colspan='3'>验收标准:<select id='gbSlt' name='gbSlt' onchange='gbSltChange(this);' style='padding:2px;'><select></td>");
			tempArr.push("	</tr>");
			tempArr.push("	<tr height='30px'>");
			tempArr.push("		<td>工程项目代码:</td>");
			tempArr.push("		<td>类别代码(2-3位):</td>");
			tempArr.push("		<td>分部(2位):</td>");
			tempArr.push("		<td>顺序号(3位):</td>");
			tempArr.push("	</tr>");
			tempArr.push("	<tr height='30px'>");
			tempArr.push("		<td><input id='brProjNo' name='brProjNo' validate='isNotNull' style='width:150px;'></td>");
			tempArr.push("		<td><input id='dataNo' name='dataNo' validate='isNotNull,isDataNo()' style='width:150px;'></td>");
			tempArr.push("		<td><select id='brSlt' name='brSlt' onchange='brSltChange(this);' validate='isNotNull' style='padding:2px;width:120px;'><select></td>");
			tempArr.push("		<td><input style='width:120px;background-color:#dddddd;' value='" + param.snVal + "' readOnly='readOnly'></td>");
			tempArr.push("	</tr>");
			tempArr.push("	<tr height='70px'>");
			tempArr.push("		<td colspan='4' align='center'><input type='button' class='new-btn-yellow' value='确定' onclick='brNoOk();'>&nbsp;&nbsp;<input type='button' class='new-btn-gray' value='重置' onclick='resetBrNo();'></td>");
			tempArr.push("	</tr>");
			tempArr.push("</table>");	
			tempArr.push("</ul>");
    	}
		var content = tempArr.join('');
		preformConfig['dlgStr'][type] = content;
		return content;
	}
	
	
	/**
	 * 计算对话框的位置
	 * @param
	 * @return
	 */
	function getLayerOffset(){
		var offset =$(top.window).height()/2 + $(window.top.document).scrollTop() - 226;
		var iframeId = getFormContentId();
		var formContent = parent.document.getElementById(iframeId);
		if(parent.document != null && formContent!=null){
			var iframeBottomOffset = formContent.style.height;
			if(iframeBottomOffset.indexOf("px")!=-1){
				iframeBottomOffset = +(iframeBottomOffset.substring(0,iframeBottomOffset.indexOf("px")));//去掉px
				if(iframeBottomOffset <= offset + 250){
					offset = iframeBottomOffset - 250;
				}
			}
		}
		return offset;
	}
	
	/**
	 * 打开随机数对话框
	 * @param
	 * @return
	 */
	var divId = {};	
	function openRndDiv(){	
		var text = getDlgContent("random");
		var iframeId = getFormContentId();
		if(parent.document != null && parent.document.getElementById(iframeId)!=null){
			var obj = {};
			obj.type = 1;
			obj.title = '参考数据';
			obj.skin = 'layui-layer-rim';
			obj.area = ['420px', '240px'];
			obj.content = text;
			obj.offset=getLayerOffset();
			divId = layer.open(obj);
		}else{
			divId = layer.open({	
				type: 1,	
				title: '参考数据',	
				skin: 'layui-layer-rim', 	//加上边框
				area: ['420px', '240px'], 	//宽高
				content: text
			});
		}
	}
	
	/**
	 * 对话框关闭事件
	 * @param 
	 * @return
	 */
    function closeDlg(){
    	layer.close(divId);
    }
    
    /**
     * 对话框打开事件 
	 * @param text {对话框内容}
	 * @param title {标题}
	 * @param width {宽度}
	 * @param height {高度}
	 * @return
     */
    function openDlg(text, title, width, height){
    	var iframeId = getFormContentId();
		if(parent.document != null && parent.document.getElementById(iframeId)!=null){
			var obj = {};
			obj.type = 1;
			obj.title = title;
			obj.skin = 'layui-layer-rim';
			obj.area = [width, height];
			obj.content = text;
			obj.offset = getLayerOffset();
			divId = layer.open(obj);
		}else{
			divId = layer.open({	
				type: 1,	
				title: title,	
				skin: 'layui-layer-rim', 	//加上边框
				area: [width, height], 	//宽高
				content: text
			});
		}
    }
	//#######################################
	
	
	//模板编号模块
	//#######################################
    /**
     * 初始文件编号dialog
	 * @param
	 * @return
     */
	function openInitNoDiv(){
		var content = getDlgContent("initNo");
		openDlg(content,'初始编号','500px','160px');
		preformConfig.firstNo && $('#firstNo').val(preformConfig.firstNo);
	}
	
	/**
	 * 保存当前的文件编号
	 * @param
	 * @return
	 */
	function saveSnCurValue(){
		if(!validate($('#firstNo'))){
 			return;
 		}
		var json = {};
		json.companyId = param.companyId;
		json.projectId = param.projectId;
		json.orgItemId = param.orgItemId;
		json.preformId = param.id;
		json.curValue = (+$('#firstNo').val())-1;
		json = JSON.stringify(json);
		var url = "/preform_saveSnCurValue";
		preformConfig.firstNo = $('#firstNo').val();
		$.ajax({ 
	 		type: 'POST', 
	 		contentType: 'application/json;charset=utf-8', 
	 		url:  url, 
	 		data: json, 
	 		async: false, 
	 		dataType : 'json', 
	 		success : function(data) { 
	         	 setShowSn(data.body);  
	         	 closeDlg();
	 		}, 
	 		error : function(){  
	 		  layer.alert('保存失败!'); 
	 		}	 
	 	}); 
	}
	
	//是否第一次使用文件模板
	function isFirstUse(){
	    var result = false;
		var json = {};
		json.companyId = param.companyId;
		json.projectId = param.projectId;
		json.orgItemId = param.orgItemId;
		json.preformId = param.id;
		json = JSON.stringify(json);
		var url = "/formInstance/isFirstUse";
		$.ajax({ 
	 		type: 'POST', 
	 		contentType: 'application/json;charset=utf-8', 
	 		url:  url, 
	 		data: json, 
	 		async: false, 
	 		dataType : 'json', 
	 		success : function(data) { 
	         	if(data.body){
	         		result = data.body.result;
	         	} 
	 		}, 
	 		error : function(){  
	 		  layer.alert('保存失败!'); 
	 		}	 
	 	}); 
		return result;  	
	}
	
	/**
	 * 设置显示的文件编号
	 * @param body {js对象}
	 * @return
	 */
	function setShowSn(body){	
		 var snType = body.snType; 
		 var sn = body.sn; 
		 $('#snType').val(snType); 
		 preformConfig.snType = snType;//配置中保存编号的类型
		 if('sn' == snType){//单行编号	
		 	$("span[widgeType='snInput']").html(sn);
		 }else if('yearsn' == snType){	
		 	$("span[widgeType='snInput']").each(function(index,element){	
		 		if(index === 0){	
		 			$(this).html(sn.substring(0,sn.indexOf('-')));	
		 		}else if(index === 1){	
		 			$(this).html(sn.substring(sn.indexOf('-')+1));	
		 		}	
		 	});	
		 }else if('cmsn' == snType){//组合编号
		 	var snSize = $("span[widgeType='snInput']").size();	
		 	var snArray = sn.split('-');	
		 	$("span[widgeType='snInput']").each(function(index,element){	
				if(snSize==1){			 	
		 			$(this).html(snArray[0] + snArray[1] + snArray[2]);
		 		}else if(snSize==2){	
	 				if(index === 0){	
	 					$(this).html(snArray[0] + snArray[1]);	
	 				}else if(index === 1){	
	 					$(this).html(snArray[2]);		
	 				}	
		 		}else if(snSize==3){	
		 			$(this).html(snArray[index]);
		 		}
		 	});	
     	 }else if('mulsn' == snType){//多行
     	 	
     	 }else if('prefsn' == snType){//自定义前缀
     	 	$('input[widgetype=snInput]').val(sn);//设置默认值
     	 	$('input[widgetype=snInput]').attr('serNo',sn);////顺序号
     	 	$('input[widgetype=snInput]').on('click',function(){
     	 		openPrefixDlg();
     	 	});
     	 }else if('brsn' == snType){//分部编号(分部2-子分部2-顺序号3
     	 	$('input[widgetype=snInput]').val(sn);//设置默认值
     	 	$('input[widgetype=snInput]').attr('serNo',sn);////顺序号
     	 	$('input[widgetype=snInput]').off('click');//这个不能少,因为初始编号会绑定两遍
			$('input[widgetype=snInput]').on('click',function(){
     	 		openBrDlg('brsn',sn);  
     	 	});  	 
     	 }else if('brdatasn' == snType){//分部资料类型编号(分部2-子分部2-资料类别2（自定义）-顺序号)
     	 	$('input[widgetype=snInput]').val(sn);
     	 	$('input[widgetype=snInput]').attr('serNo',sn);//顺序号
     	 	$('input[widgetype=snInput]').off('click');//这个不能少,因为初始编号会绑定两遍
     	 	$('input[widgetype=snInput]').on('click',function(){
     	 		openBrDlg('brdatasn',sn);  
     	 	});  
     	 }else if('brprojsn' == snType){//分部项目编号(工程项目代码（自定义）-类别代码2（自定义）-分部代码2-顺序号3)
     	 	$('input[widgetype=snInput]').val(sn);
     	 	$('input[widgetype=snInput]').attr('serNo',sn);//顺序号
     	 	$('input[widgetype=snInput]').off('click');//这个不能少,因为初始编号会绑定两遍
     	 	$('input[widgetype=snInput]').on('click',function(){
     	 		openBrDlg('brprojsn',sn);  
     	 	});  	
     	 }
	}

	/**
	 * 自动序号
	 * @param 
	 * @return
	 */
    function autoSn(obj){
    	curInput = obj;	//设置当前控件
    	var auto = 1;
    	var temp = {};
 		$('div[widgetype=autosnsrc]').each(function(){
 			var src = $(this).attr('src');
 			var autoSnTagId = map[src];
 			var value = getDivValue($(this));
 			if(temp[autoSnTagId] == 1){
 				return true;
 			}
 			if(value===''){
 				$('#'+autoSnTagId).html('');
 			}else{ 
 				$('#'+autoSnTagId).html(auto);
 				auto++;
 				temp[autoSnTagId] = 1;
 			}
 		});
    }
    //#######################################

	
	//大小写模块
 	//#######################################
    /**
     * 小写转大写时改变事件
     * @param obj {js对象} 指定js对象
     * @return
     */
	function toUpper(obj){ 
		 curInput = obj;	//设置当前控件
		 var to = $(obj).attr('to');	
		 var value = $(obj).html();	
		 var upperTagId = map[to];
		if(value==='' || !upperTagId){
			$('#'+upperTagId).html(''); 	
		  	return;
		 }	
		 //fixfox下删除为空后会有br标签
		 value = value.replace('<br>','');
		 if(isNaN(value)){	  
		 	$('#'+upperTagId).html(value); 
		 }else{	
		 	$('#'+upperTagId).html(uppercase(value)); 
		 }	
	}

	/**
	 * 指定数字转大写汉字
	 * @param value {Number} 指定Number
     * @return
	 */
	function uppercase(value){
		var money1 = new Number(value);
		if(money1> 1000000000000000000) {
			alert("您输入的数字太大，重新输入!");
			return;
		}
		var monee = Math.round(money1*100).toString(10);
		var i,j=0;
		var leng = monee.length;
		var monval="";
		for( i=0;i<leng;i++){
			monval= monval+to_upper(monee.charAt(i))+to_mon(leng-i-1);
		}
		return repace_acc(monval);
	}

	/**
	 * 单个小写数字与大写汉字对应关系
	 * @param text {String} 小写数字
	 * @returns {String} 大写汉字
	 */
	function to_upper(text){
		switch(text){
			case '0' : return '零'; 
			case '1' : return '壹'; 
			case '2' : return '贰'; 
			case '3' : return '叁'; 
			case '4' : return '肆'; 
			case '5' : return '伍'; 
			case '6' : return '陆'; 
			case '7' : return '柒';
			case '8' : return '捌';
			case '9' : return '玖'; 
			default: return '' ;
		}
	}

	/**
	 * 数字位数与数字单位关系
	 * @param a {Number} 数字位数
	 * @returns {String} 数字单位
	 */
	function to_mon(a){
		if(a>10){
			a=a - 8;
			return(to_mon(a));
		}
		switch(a){
			case 0 : return '分';
			case 1 : return '角'; 
			case 2 : return '元'; 
			case 3 : return '拾'; 
			case 4 : return '佰';
			case 5 : return '仟';
			case 6 : return '万'; 
			case 7 : return '拾'; 
			case 8 : return '佰'; 
			case 9 : return '仟'; 
			case 10 : return '亿';
		}
	}

	function repace_acc(Money){
		Money=Money.replace("零分","");
		Money=Money.replace("零角","零");
		var yy;
		var outmoney;
		outmoney=Money;
		yy=0;
		while(true){
			var lett= outmoney.length;
			outmoney= outmoney.replace("零元","元");
			outmoney= outmoney.replace("零万","万");
			outmoney= outmoney.replace("零亿","亿");
			outmoney= outmoney.replace("零仟","零");
			outmoney= outmoney.replace("零佰","零");
			outmoney= outmoney.replace("零零","零");
			outmoney= outmoney.replace("零拾","零");
			outmoney= outmoney.replace("亿万","亿零");
			outmoney= outmoney.replace("万仟","万零");
			outmoney= outmoney.replace("仟佰","仟零");
			yy= outmoney.length;
			if(yy==lett){break;}
		}
		yy = outmoney.length;
		if (outmoney.charAt(yy-1)=='零'){ 
			outmoney=outmoney.substring(0,yy-1);
		}
		yy = outmoney.length;
		if ( outmoney.charAt(yy-1)=='元'){
			outmoney=outmoney +'整';
		}
		return outmoney;
	}
	//#######################################
	
	
	//强度模块
	//#######################################
	var cMap = new Array();
	/**
	 * 初始化强度下拉框
	 * @param
     * @return
	 */	
	function initStrGrd(val){
		if(val==='c'){//钢筋混凝土强度
			cMap.push('C');
			for(var i = 10; i <81; i+=5){
				cMap.push(i);
			}
		}else if(val==='m'){//砂浆强度
			cMap.push('M');
			cMap.push('2.5');
			cMap.push('5');
			cMap.push('7.5');
			cMap.push('10');
			cMap.push('15');
			cMap.push('20');
		}else if(val==='b'){//混凝土抗折(公路)
			cMap.push('');
			cMap.push('4');
			cMap.push('4.5');
			cMap.push('5.0');
			cMap.push('6.0');
		}
	}
	
	/**
	 * 加载自定义标题
	 * @param 
	 * @return
	 */
	function loadTitleData(){
		$('div[widgetype=title]').each(function(){
			var custom = $(this).attr("custom");
			if(custom){
				var value = param[custom];
				$(this).text(value);	
			}
		});
	}
	/**
	 * 加载强度等级
	 * @param 
	 * @return
	 */
	function loadStrGrd(){
		$('select[widgeType=strgrd]').each(function(){
			var val = $(this).attr('val');
			initStrGrd(val);
			var prefix = cMap.length?cMap[0]:'';
			for(var i=1,length=cMap.length; i<length; i++){
				var value = cMap[i]; 
				var key = prefix + value;
				$(this).append('<option value="' + key + '" text="'+ value +'">' + key + '</option>');
			}	
		});
		$("div[widgeType=stdmpa]").html($('select[widgeType=strgrd]').find('option:selected').attr('text'));
	}
	
	/**
	 * 强度等级改变事件
	 * @desc c钢筋强度 m砂浆强度 b水泥混凝土抗折
	 * @param
	 * @return
	 */
	function CChangeEvent(){
		if($('select[widgeType=strgrd]').length !=1){
			return;
		}
		var rltArr = getMpaValArray();
		$("div[widgeType=stdmpa]").html($('select[widgeType=strgrd]').find('option:selected').attr('text'));
		var strType = $('select[widgeType=strgrd]').attr('val');
		if(rltArr.length != 0){
			if(strType=='c'){
				calcStats(rltArr,strType);		//计算统计信息
				calcCoef(rltArr,strType);		//计算系数
				calc();							//表达式计算	
				bool(rltArr,strType);			//布尔计算
			}else if(strType=='m'){
				calcStats(rltArr,strType);		//计算统计信息
				calc();							//表达式计算	
				bool(rltArr,strType);			//布尔计算
			}else if(strType=='b'){
				calcStats(rltArr,strType);		//计算统计信息
				calcCoef(rltArr,strType);		//计算系数
				calc();							//表达式计算	
				toggleRoadDlg(rltArr,strType);	//显示或隐藏道路对话框
				calcRlt(rltArr);				//计算结论
			}
		}
	}
	
	/**
	 * 强度值改变事件
	 * @param obj{jQuery对象}
	 * @return 
	 */
	function mpaChangeEvent(obj){
		if($('select[widgeType=strgrd]').length !=1){
			return;
		}
		var value =getDivValue($(obj));
		if(isNaN(value)){
			layer.alert('必须是数字!');	
			return;
		}
		var rltArr = getMpaValArray();
		var strType = $('select[widgeType=strgrd]').attr('val');
		if(rltArr.length==0){
			cleanAllMap();
			return;
		}
		if(strType=='c'){
			calcStats(rltArr,strType);//计算统计信息
			calcCoef(rltArr,strType);//计算系数
			calc();
			bool(rltArr,strType);//布尔计算
		}else if(strType=='m'){
			calcStats(rltArr,strType);//计算统计信息
			calc();
			bool(rltArr,strType);//布尔计算
		}else if(strType=='b'){
			calcStats(rltArr,strType);//计算统计信息
			calcCoef(rltArr,strType);//计算系数
			calc();
			toggleRoadDlg(rltArr,strType);//显示或隐藏道路对话框
			calcRlt(rltArr);//计算结论
		}
	}
	
	/**
	 * 统计样本数量 
	 * @param array {Array} 强度数组
	 * @return
	 */
	function countSample(array){
		return array.length;
	}
	
	/**
	 * 强度最低值
	 * @param array {Array} 强度数组
	 * @return 
	 */
	function evalMin(array){
		return Math.min.apply(null,array);
	}
	
	/**
	 * 强度最高值
	 * @param array {Array} 强度数组
	 * @return
	 */
	function evalMax(array){
		return Math.max.apply(null,array);
	}
	
	/**
	 * 强度平均值
	 * @param array {Array} 强度数组
	 * @return
	 */
	function evalAvg(array){
		var sum = reduce(array,function(accum,current){
					return accum + current;
				});
		var temp = sum/array.length;
		return temp;
	}
	
	/**
	 * 计算平均差
	 * 当strType为'm'或'c'时
	 * 1.数组小于10,则不显示平均差.
	 * 2.标准差小于2.5，则显示2.5，否则显示计算结果实际值
	 * @param avg {Number} 平均值,array {Array} 强度值数组, strType {String} 强度类别
     * @return float 返回平均差
	 */
	function evalStDev(avg,array,strType){
		if(array.length <= 1){
			return "";
		}
		if((strType === 'm' || strType === 'c') && array.length<10){
			return "";
		}
	    var length = array.length;
		var temp = 0;
		for(var i=0; i<array.length; i++){
			temp+=Math.pow(array[i],2);
		}
		temp-=length*Math.pow(avg,2);
		temp/=length-1;
		temp=Math.sqrt(temp);
		temp = toNumber(temp);
		
		if((strType === 'm' || strType === 'c') && temp < 2.5){
			return 2.5;
		}
		temp = _numToFixed(temp,2);
		return temp;
	}
	
	/**
	 * 计算强度系数
	 * @param array {Array}强度值数组,strType {String}强度类型
	 * @return 
	 */
	function calcCoef(array,strType){
		var length = array.length;
		if(length ==0){
			return;
		}
		cleanCoefAndResult();
		
		if(strType == 'c'){
			//样本少于10组为非统计方法,样本大于等于10组为统计方法.
			if(length < 10){
				//标准强度小于60,则λ3为1.15,否则1.10,λ4为0.95
				var stdMpa = toNumber($('select[widgeType=strgrd]').find('option:selected').attr('text'));
				var coef3 = "";
				if(stdMpa < 60){
					coef3 = 1.15;
				}else{
					coef3 = 1.10;
				}
				$("div[widgeType=coef3]").html(coef3);
				$("div[widgeType=coef4]").html(0.95);
			}else{
				//如样本数量属于区间[10≤Ｔp3≤14]，λ1则显示1.15
				//如样本数量属于区间[15≤Ｔp3≤19]，λ1则显示1.05
				//如样本数量属于区间[Ｔp3≥20]，λ1则显示0.95
				var coef1 = 0;
				var coef2 = 0;
				if(length<=14){
					coef1=1.15;
				}else if(length<=19){
					coef1=1.05;
				}else if(length>=20){
					coef1=0.95;
				}
				//判断λ1的值，如λ1＝1.15，则λ2显示为0.90，否则λ2显示0.85
				if(coef1==1.15){
					coef2 = 0.90;
				}else{
					coef2 = 0.85;
				}
				$("div[widgeType=coef1]").html(coef1);
				$("div[widgeType=coef2]").html(coef2);
			}
		}else if(strType == 'b'){
			var coef1 = getCoef4b(length);
			if(coef1){
				$("div[widgeType=coef1]").html(coef1);
			}
		}
	}
	
	/**
	 * 计算水泥混凝土抗折的合格系数
	 * 合格判定系数  数量0-10 为空,11-14为0.75,15-19为0.7 ,20及以上 为0.65
	 * @param length{Number} 数量
	 * @returns {Number or String} 返回合格系数
	 */
	function getCoef4b(length){
		var coef1 = ''; //默认为空
		if(length >= 11 && length <= 14){
			coef1 = 0.75;
		}else if(length >= 15 && length <= 19){
			coef1 = 0.7;
		}else if(length >= 20){
			coef1 = 0.65;
		}
		return coef1;
	}
	
	/**
	 * 计算各项统计值
	 * @param array {Array}强度值数组,strType {String}强度类型
	 * @return 
	 */
	function calcStats(array,strType){
		var length = array.length;
		if(length ==0){
			return;
		}
		$("div[widgeType=countmpa]").html(countSample(array));
		$("div[widgeType=minmpa]").html(evalMin(array));
		$("div[widgeType=maxmpa]").html(evalMax(array));
		var avg = evalAvg(array);
		//计算平均差
		$("div[widgeType=stdevmpa]").html(evalStDev(avg,array,strType));
		avg = _numToFixed(avg,2);
		$("div[widgeType=avgmpa]").html(avg);
	}
	
	/**
	 * 清空强度系数 统计方法
	 * @param 
	 * @return 
	 */
	function cleanCoefAndResult(){
		$("div[widgeType=coef1]").html("");
		$("div[widgeType=coef2]").html("");
		$("div[widgeType=coef3]").html("");
		$("div[widgeType=coef4]").html("");
		$("span[widgeType=bool]").html("");
	}
	
	/**
	 * 清空所有的强度关联值
	 * @param 
	 * @return 
	 */
	function cleanAllMap(){
		$("div[widgeType=coef1]").html("");
		$("div[widgeType=coef2]").html("");
		$("div[widgeType=coef3]").html("");
		$("div[widgeType=coef4]").html("");
		$("div[widgeType=countmpa]").html("");
		$("div[widgeType=minmpa]").html("");
		$("div[widgeType=maxmpa]").html("");
		$("div[widgeType=stdevmpa]").html("");
		$("div[widgeType=avgmpa]").html("");
		$("div[widgeType=rltmpa]").html("");
		$("span[widgeType=calc]").html("");
		$("span[widgeType=bool]").html("");
	}
	
	/**
	 * 获得强度值数组
	 * @param 
	 * @return 
	 */
	function getMpaValArray(){
		var array = new Array();
		$('div[widgeType=mpa]').each(function(){
			var value = getDivValue($(this));
			if(value!='' && !isNaN(value)){
				array.push(toNumber(value));
			}
		});
		return array;
	}
	
	/**
	 * bool计算
	 * @param rltArr {Array}强度值数组,strType {String}强度类型 
	 * @return 
	 */
	function bool(rltArr,strType){
		var flag = true;
		$('table tr td span[widgeType=bool]').each(function(){
	 		var strExp = $(this).attr('exps');	//公式
	 		var result = evalExpVal(strExp);//最终结果
	 		if(result === false){//强制类型判断
	 			flag = false;
	 		}
	 		var expArray = parseBoolExp(strExp);
	 		if(expArray != null && expArray.length == 2){
	 			var exp1 = expArray[0];
	 			var exp2 = expArray[1];
	 			var value1  = evalExpVal(exp1);
	 			var value2  = evalExpVal(exp2);
	 			
	 			if(value1!='' && value2!=''){
		 			var oper = "";
		 			if(value1>value2){
						oper = '>';	 			
		 			}else if(value1<value2){
		 				oper = '<';	 	
		 			}else{
		 				oper = '=';	 	
		 			}
		 			$(this).html(value1 + oper + value2);
	 			}
	 		}
		});
		var result = '';
		if(rltArr.length == 0){
			return;
		}
		if(flag){
			if(strType == 'c'){
				if(rltArr.length>=10){
					result = '采用统计方法进行混凝土强度评定合格 。<br> 验收依据：《混凝土强度检验评定标准》（GB/T50107-2010)';
				}else{
					result = '采用非统计方法进行混凝土强度评定合格 。<br> 验收依据：《混凝土强度检验评定标准》（GB/T50107-2010)';
				}
			}else if(strType == 'm'){
				result = '砂浆强度评定:合格 。<br> 验收依据：《砌体工程施工质量验收规范》（GB50203-2011)';
			}
		}else{
			if(strType == 'c'){
				if(rltArr.length>=10){
					result = '采用统计方法进行混凝土强度评定不合格 。 <br>验收依据：《混凝土强度检验评定标准》（GB/T50107-2010)';  
				}else{
					result = '采用非统计方法进行混凝土强度评定不合格 。<br> 验收依据：《混凝土强度检验评定标准》（GB/T50107-2010)';   
				}
			}else if(strType == 'm'){
				result = '砂浆强度评定:不合格 。<br> 验收依据：《砌体工程施工质量验收规范》（GB50203-2011)';
			}
		}
		$('div[widgeType=rltmpa]').html(result);
	}
	
	/**
     * 指定jquery对象验证是否合法,然后所有自动计算。
     * @param curObj 
     * @return 
     */
	function calc(curObj){	
		//用void 0代替undefined 是好习惯
		if(curObj !== void 0 && isNaN($(curObj).val())){	//检测输入是否合法
	 		if($(curObj).val()!='-'){	
	 			layer.alert('必须输入数字!');	
	 		}	
	 	}	
	 	$('table tr td div[widgeType=calc]').each(function(){	
	 		var exp = new Expression('');	
	 		var strExp = $(this).attr('exps');	//公式
	 		var pcs = $(this).attr('prec');	//精度
	 		exp.Expression(strExp);		//设置表达式
	 		exp.Parse();	//得到结果
	 		var arrTokens = exp.getArrTokens();	//变量与运算符的数组
	 		var decLen = 0;//小数位长度
	 		var rigor = $(this).attr('rigor') ? true : false;	//是否严格计算
	 		
	 		var varArray = new Array();
	 		var valueArray = new Array();
	 		for(var i =0; i < arrTokens.length; i++){
	 			if(map[arrTokens[i]]){	
	 				var tagId = map[arrTokens[i]]; 	
	 				var val = null;	
	 				var tagObj = $('#'+ tagId);	
	 				if(tagObj.is('input') || tagObj.is('select')){	
	 					val = tagObj.val();	
	 				}else if(tagObj.is('span') && tagObj.attr('widgetype') == 'calc'){	//累加计算,计算结果作为另外一项的输入源
	 					val =  tagObj.html(); 
	 				}else if(tagObj.is('span') && tagObj.attr('widgetype') == 'numtext'){	
	 					val =  tagObj.attr('val'); 
	 				}else if(tagObj.is('div') ){	
	 					val =  tagObj.html(); 
	 				}
	 				if(val === ''){
	 					varArray.push(arrTokens[i]);
	 					valueArray.push('');
	 				}else if(val != null){	
	 					val = toNumber(val); 	
	 					if (isNaN(val)){ 	
	 						continue;	
	 					}	
	 					varArray.push(arrTokens[i]);//设置变量
	 					valueArray.push(val);//设置变量值
	 				}	
	 				if(pcs){	
	 					decLen = +pcs;	
	 				}	
 				}	
 			}
 			var result = null;	//得到结果
	 		try{
	 			result = calcExp(strExp,varArray,valueArray,rigor);	
	 		}catch(e){
	 		}	
	 		if(!pcs){
	 			decLen = 2;	
	 		}
	 		if(result == null){
	 			$(this).html('');
	 			return;	//没有结果时return
	 		}
	 		result = result.toFixed(decLen);	//js的精度计算不准确
	 		result = parseFloat(result);	//去掉末尾的0
	 		var format = $(this).attr('format');	//格式化
	 		if(format){
	 			result= format.replace('%s',result);	
	 		}
	 		$(this).html(result);	
	 	});	
	}	
	
	/**
	 * 解析bool公式
	 * @param exp {String} 待解析的公式
	 * @return 
	 */
	function parseBoolExp(exp){
		var operArray = new Array('>=','<=','!=','=','>','<');
		var index = -1;
		var operIndex = -1;
		for(var i =0; i < operArray.length; i++){
			var oper = operArray[i];
			var tempIndex = exp.indexOf(oper);
			if(tempIndex != -1 ){
				if(index == -1 || index > tempIndex){
					index = tempIndex;
					operIndex = i;
				}
			}
		}
		if(index != 0){
			return exp.split(operArray[operIndex]);
		}else{
			return null;
		}
	}
	
	/**
	 * 计算公式的值
	 * @param strExp {String} 待计算的公式
	 * @return
	 */
	function evalExpVal(strExp){
		var exp = new Expression('');
		exp.Expression(strExp);				//设置表达式
	 	exp.Parse();						//解析表达式
		var arrTokens = exp.getArrTokens();	//变量与运算符的数组
		var result = null;					
		if(arrTokens.length ==1){
 			if(map[arrTokens[0]]){	
 				var tagId = map[arrTokens[0]]; 	
 				var tagObj = $('#'+ tagId);	
 				if(tagObj.is('input')){	
 					result = tagObj.val();	
 				}else{
 					result =  tagObj.html(); 
 				}
 				if(result != null && result != ''){	
 					result = toNumber(result); 	
 					if (isNaN(result)){ 	
 						result='';	
 					}	
 				}
			}
		}else{
			for(var i =0; i < arrTokens.length; i++){	
	 			if(map[arrTokens[i]]){	
	 				var tagId = map[arrTokens[i]]; 	
	 				var val = null;	
	 				var tagObj = $('#'+ tagId);	
	 				if(tagObj.is('input')){	
	 					val = tagObj.val();	
	 				}else{
	 					val =  tagObj.html(); 
	 				}
	 				if(val != null && val != ''){	
	 					val = toNumber(val); 	
	 					if (isNaN(val)){ 	
	 						continue;	
	 					}	
	 					exp.AddVariable(arrTokens[i], val);	//设置变量
	 				}
				}	
			}
			try{ 
				result = exp.Evaluate();	
			}catch(e){	
			}
		}
		if(result == null){
			return "";
		}
		if(typeof(result) == 'number'){
			result = _numToFixed(result,2);//保留两位小数,去掉末尾的0
	 	}
		return result;
	}
	
	/**
	 * 显示隐藏道路对话框
	 */
	function toggleRoadDlg(rltArr, strType){
		if(strType === 'b'){//水泥混凝土抗折
			if(rltArr.length > 20){
				$('#toolbar6').show();
				if(!preformConfig.firstShowRoadDlg){
					preformConfig.firstShowRoadDlg = true;
					showRoadDlg();
				}
			}else{
				$('#toolbar6').removeClass('on');
			}
		}
	}
	
	/**
	 * 打开道路类型对话框
	 */
	function showRoadDlg(){
		var content = getDlgContent("road");
		openDlg(content,'道路类型','500px','160px');
		preformConfig.roadType && $('#roadType').val(preformConfig.roadType);
	}
	
	/**
	 * 保存道路类型
	 * @return
	 */
	function saveRoadType(){
		var roadType = $('#roadType').val();
		preformConfig.roadType = roadType;
		CChangeEvent();//道路类型选择触发重新计算
		closeDlg();
	}
	
	/**
	 * 计算结论
	 * 1、n≤10组时：R≥1.05Rsz，Rmin≥0.85Rsz。
	 * 2、10<n≤20组时：R≥Rsz+K·σ，Rmin≥0.85Rsz。
	 * 3、n>20组时；R≥Rsz+K·σ，快速路、主干道：Rmin≥0.85Rsz 其它道路：0.75Rsz≤Rmin<0.85Rsz。
	 * @param array {Array}强度值数组
	 * @return
	 */
	function calcRlt(array){
		var rlt = '不合格';
		var rsz = +$('select[widgeType=strgrd]').val();//Rsz(设计强度)
		var avg = evalAvg(array);
		var r = _numToFixed(avg,2);//R(平均值)
		var rmin = evalMin(array);//Rmin(最小值)
		var k = getCoef4b(array.length);//K(合格系数)
		var σ = evalStDev(avg,array,'b');//σ(均方差)
		//alert('rsz=' + rsz +',r=' + r + ',rmin=' + rmin + ',k=' + k + ',σ=' + σ);
		var len= array.length;
		if(len <= 10){
			if(r >= 1.05*rsz && rmin >= 0.85*rsz){//R≥1.05Rsz，Rmin≥0.85Rsz
				rlt = '合格';
			}
		}else if(len > 10 && len <= 20){
			if(r >= (rsz+k*σ) && rmin >= 0.85*rsz){//R≥Rsz+K·σ，Rmin≥0.85Rsz
				rlt = '合格';
			}
		}else {
			if(r >= (rsz+k*σ)){
				var roadType = preformConfig.roadType;//道路类型
				if(!roadType || roadType=='0' || roadType == '1'){//快速路、主干道：Rmin≥0.85Rsz
					if(rmin >= 0.85*rsz){
						rlt = '合格';
					}
				}else if(roadType == '2'){
					if(rmin >= 0.75*rsz && rmin < 0.85*rsz){//其它道路：0.75Rsz≤Rmin<0.85Rsz
						rlt = '合格';
					}
				}
			}
		}
		$('div[widgeType=rltmpa]').html(rlt);
	}
	//#######################################
	
	/**
	 * 加载控件中的valye属性
	 */
	function showResultValue(){
		$("div[widgetype='result']").each(function(){
			$(this).text($(this).val());
		})
	}
	/**
	 *弹出选择 单选（select控件）
	 */
	function showAutoSelect(curObj,sltFunc){
		var widgetype = $(curObj).attr("widgetype");
 		var data =param[widgetype];
		var value = $(curObj).attr('value');
		if(!data && value == ''){
			return;
		}
		
		if($(curObj).attr('contenteditable')=='false'){
			return;
		}
		
		var array = data;
		if(!data){
			return;
		}
		
		var tagId = $(curObj).attr("id");
		
		var tempArr = new Array();	
		tempArr.push("<ul style='padding:10px;'>");
		tempArr.push("<table style='width:100%;border-collapse: collapse;border-spacing: 0;table-layout: fixed;font-size:13px;'>");
		if (array.length == 1) {
			
		}else{
			for(var i =0; i < array.length; i++){
				if(array[i]==''){
					continue;
				}
				tempArr.push("<tr>");
				tempArr.push("<td style='border:1px solid #333; padding:6px;' tagId='" + tagId + "' onmousemove='sltDlgMouseMove(this);' onmouseout='sltDlgMouseOut(this);' onclick=selectClick(this,'"+array[i].id+"','"+widgetype+"');>");
				tempArr.push(array[i].name);
				tempArr.push("</td>");	
				tempArr.push("</tr>");	
			}
		}

//		if(value && value != ''){
//			array = value.split('#_#');
//			for(var i =0; i < array.length; i++){
//				if(array[i]==''){
//					continue;
//				}
//				tempArr.push("<tr>");
//				tempArr.push("<td style='border:1px solid #333; padding:6px;' tagId='" + tagId + "' onmousemove='sltDlgMouseMove(this);' onmouseout='sltDlgMouseOut(this);' onclick='sltDlgClick(this);'>");
//				tempArr.push(array[i]);
//				tempArr.push("</td>");	
//				tempArr.push("</tr>");	
//			}
//		}

		tempArr.push("</table>");	
		tempArr.push("</ul>");
		//如果数据为空,不显示
		if(tempArr.length == 4){
			return;
		}
		var text = tempArr.join('');
		var iframeId = getFormContentId();
		debugger;
		if(parent.document != null && parent.document.getElementById(iframeId)!=null){
			var obj = {};
			obj.type = 1;
			obj.title = '选择';
			obj.skin = 'layui-layer-rim';
			obj.area = ['420px'];
			obj.content = text;
			obj.offset=getLayerOffset();
			divId = layer.open(obj);
		}else{
			divId = layer.open({	
				type: 1,	
				title: '选择',	
				skin: 'layui-layer-rim', 	//加上边框
				area: ['420px'], 	//宽高
				content: text
			});
		}
	}
	//自动下拉的弹出框
	function selectClick(curObj,val,widgeType){
		var tagId = $(curObj).attr("tagId");
		var value = $(curObj).html();
		if(value != ''){
			layer.close(divId);
			$('#'+tagId).html(value);
			//$('#attr'+widgeType).attr("attr",val);
			$('#attr_'+widgeType).val(val);
		}
	}
	
	
	
	//评语库以及自动带出模块
	//#######################################
	//自动下拉信息
	function showAutoSlt(curObj,sltFunc){
		var data = $(curObj).data('data');
		var value = $(curObj).attr('value');
		if(!data && value == ''){
			return;
		}
		
		if($(curObj).attr('contenteditable')=='false'){
			return;
		}
		
		var array = new Array();
		if(data){
			array = data.split('#_#');
		}
		
		var tagId = $(curObj).attr("id");
		
		var tempArr = new Array();	
		tempArr.push("<ul style='padding:10px;'>");
		tempArr.push("<table style='width:100%;border-collapse: collapse;border-spacing: 0;table-layout: fixed;font-size:13px;'>");
		for(var i =0; i < array.length; i++){
			if(array[i]==''){
				continue;
			}
			tempArr.push("<tr>");
			if(sltFunc != void 0){
				tempArr.push("<td style='border:1px solid #333; padding:6px;' tagId='" + tagId + "' onmousemove='sltDlgMouseMove(this);' onmouseout='sltDlgMouseOut(this);' onclick='" + sltFunc + "(this);'>");
			}else{
				tempArr.push("<td style='border:1px solid #333; padding:6px;' tagId='" + tagId + "' onmousemove='sltDlgMouseMove(this);' onmouseout='sltDlgMouseOut(this);' onclick='sltDlgClick(this);'>");
			}
			tempArr.push(array[i]);
			tempArr.push("</td>");	
			tempArr.push("</tr>");	
		}
		if(value && value != ''){
			array = value.split('#_#');
			for(var i =0; i < array.length; i++){
				if(array[i]==''){
					continue;
				}
				tempArr.push("<tr>");
				tempArr.push("<td style='border:1px solid #333; padding:6px;' tagId='" + tagId + "' onmousemove='sltDlgMouseMove(this);' onmouseout='sltDlgMouseOut(this);' onclick='sltDlgClick(this);'>");
				tempArr.push(array[i]);
				tempArr.push("</td>");	
				tempArr.push("</tr>");	
			}
		}

		tempArr.push("</table>");	
		tempArr.push("</ul>");
		//如果数据为空,不显示
		if(tempArr.length == 4){
			return;
		}
		var text = tempArr.join('');
		var iframeId = getFormContentId();
		if(parent.document != null && parent.document.getElementById(iframeId)!=null){
			var obj = {};
			obj.type = 1;
			obj.title = '选择';
			obj.skin = 'layui-layer-rim';
			obj.area = ['420px', '240px'];
			obj.content = text;
			obj.offset=getLayerOffset();
			divId = layer.open(obj);
		}else{
			divId = layer.open({	
				type: 1,	
				title: '选择',	
				skin: 'layui-layer-rim', 	//加上边框
				area: ['420px', '240px'], 	//宽高
				content: text
			});
		}
	}
	
	function sltDlgMouseMove(curObj){
		$(curObj).css('background','#eaf2ff');
		$(curObj).css('color','#000000');
		$(curObj).css('cursor','default');
	}
	
	function sltDlgMouseOut(curObj){
		$(curObj).css('background','');
	}
	
	//自动下拉的弹出框
	function sltDlgClick(curObj){
		var tagId = $(curObj).attr("tagId");
		var value = $(curObj).html();
		if(value != ''){
			layer.close(divId);
			$('#'+tagId).html(value);
		}
	}
	
	/**
	 * 评语库设置数据
	 * @param widgeType {String}控件的类型, data {String} 下拉框展示的数据, view{String} 为1表示显示索引为0的值
	 * @return 
	 */
	function setSelData(widgeType,data,view){
 		data = decodeURIComponent(decodeURIComponent(data));	
 		var array = data.split('#_#');	 
 		var sels = $('div[widgeType='+ widgeType  +']');	 
 		sels.data('data',data);	 

		sels.each(function(){
			var index = $(this).attr('index');	 
			if(index!=''){	
				var value = $(this).attr('value');
				var tempArray = new Array();
				if(value != ''){			
					tempArray = value.split('#_#');
				}
				index = +index;	
				if(tempArray.length > 0 && tempArray.length >= index ){//index为用户设置的索引值
					$(this).html(tempArray[index-1]);
				}else if(array.length >= index ){//index为系统的索引值
					$(this).html(array[index-1]); 
				}else{	
					$(this).html(array[0]); 
				}	
			}else if(view==1 && array.length > 0 && $(this).html()==''){
				$(this).html(array[0]); 
			} 
		});
 	}	
	//#######################################
	
	//表单工具栏按钮模块
	//#######################################
	/**
	 * 初始化按钮状态
	 * @param 
	 * @return
	 */
	function initToolbarStat(){
		$('#toolbar1').removeClass('on');
		if($('div[widgetype=rnd][contenteditable=true]').size() >0){
			$('#toolbar2').removeClass('on');
		}else{
			$('#toolbar2').hide();
		}
		if($('div[widgetype=dsplvalue][contenteditable=true]').size() >0){
			$('#toolbar3').removeClass('on');
			$('#toolbar4').removeClass('on');
		}else{
			$('#toolbar3').hide();
			$('#toolbar4').hide();
		}
		//第一次发送文件,可以初始文件编号
		if($('[widgetype=snInput]').length == 0 || !isFirstUse()){
			$('#toolbar5').hide();
		}
		$('#toolbar6').hide();
	}
	
	/**
	 * 打开特殊符号弹出框
	 * @param
	 * @return
	 */
	function showSpeCharDlg(){
		if(curInput==null){
			layer.alert('请选择需要设置的输入框!');	
			return;
		}
		if($(curInput).attr('contenteditable')=='false'){
			return;
		}
		
		if(speArray.length == 0){
			layer.alert('加载特殊字符失败!');	
			return;
		}
		var tempArr = new Array();	
		tempArr.push("<ul style='padding:10px;'>");
		tempArr.push("<table style='width:100%;border-collapse: collapse;border-spacing: 0;table-layout: fixed;font-size:13px;font-family:ds;'>");
		for(var i =0; i < speArray.length; i++){
			if(speArray[i]==''){
				continue;
			}
			if(i%10 == 0){
				tempArr.push("<tr>");
			}
			tempArr.push("<td style='border:1px solid #333;font-size: 15px; text-align:center; padding:6px 0;' onmousemove='sltDlgMouseMove(this);' onmouseout='sltDlgMouseOut(this);' onclick='speCharClick(this);'>");
			tempArr.push(speArray[i]);
			tempArr.push("</td>");
			if(i%10 == 9){
				tempArr.push("</tr>");
			}	
		}
		if(speArray.length%10 != 9){
			tempArr.push("</tr>");
		}
		tempArr.push("</table>");	
		tempArr.push("</ul>");
		var text = tempArr.join('');
		var iframeId = getFormContentId();
		if(parent.document != null && parent.document.getElementById(iframeId)!=null){
			var obj = {};
			obj.type = 1;
			obj.title = '特殊符号';
			obj.skin = 'layui-layer-rim';
			obj.area = ['620px', '300px'];
			obj.content = text;
			obj.offset=getLayerOffset();
			divId = layer.open(obj);
		}else{
			divId = layer.open({	
				type: 1,	
				title: '特殊符号',	
				skin: 'layui-layer-rim', 	//加上边框
				area: ['620px', '300px'], 	//宽高
				content: text
			});
		}
	}
	
	/**
	 * 特殊符号点击事件
	 * @param obj {DOM对象} 指定符号对象
	 * @return
	 */
	function speCharClick(obj){
	    try{
			var symbolValue = "";
			var textValue = $(curInput).is('input')? $(curInput).val():getDivValue($(curInput)); // 输入框的内容
			var value = $(obj).html(); // 获取特殊字符
			
			if($(curInput).is('input')){
				$(curInput).val(textValue+value);
				$(curInput).css('font-family','ds');
				$(curInput).css('font-size','15px');
				
				var tagId = $(curInput).attr('id');
				if(intSty[tagId] == void 0){ 
					intSty[tagId] = {}; 
				} 
				var attr = 'font-family'; 
    			intSty[tagId][attr] = 'ds'; 
			}else{
				$(curInput).html(textValue+ "<span style='font-family:ds;font-size:15px;'>" + value + "</span>");
				$(curInput).css('font-family','ds');
				//insertSpeChars(curInput,value);
			}
		}finally{
			layer.close(divId);
		}
		triggerEvent($(curInput),'blur','blur');
	}
	
	var speArray = new Array();	
	/**
	 * 初始化特殊字符
	 * @param
	 * @return
	 */
	function loadSpeChars(){
		//***注意temp中的空白不要动
		var temp = "①②③④⑤⑥⑦⑧⑨⑩　Ⅲ";		
		for(var i = 0; i < temp.length; i++){
			speArray.push(temp.charAt(i));
		}
	}

	/**
	 * 插入特殊字符
	 * @param 
	 * @return
	 */
    function insertSpeChars(control,spechar){
    	if(!control){
    		return;
		}
    	control.focus();
    	var selection=window.getSelection?window.getSelection():document.selection,
        range=selection.createRange?selection.createRange():selection.getRangeAt(0);
    
   		//判断浏览器是ie，但不是ie9以上
    	var browser = checkBrowser().split(":");
    	var IEbrowser = checkBrowser().split(":")[0];
    	var IEverson =  Number(checkBrowser().split(":")[1]);
    
    	if(IEbrowser=="IE"&&IEverson<9){
        	range.pasteHTML(spechar);    
    	}else{
        	var node=document.createElement('span');
       		node.innerHTML=spechar;
        	range.insertNode(node);
        	selection.addRange(range);
   		}    
	}
	//#######################################


	//随机数模块
	//#######################################
	//随机数
	function getRandomNum(mmAry){
		var arr = new Array();				//存放随机数的集合
		var qr = (+$('#qr').val())/100;		//合格率
		var count = mmAry.length;			//随机数个数	
		var dd = +$('#dd').val();			//小数位数
		var qrCount = Math.round(count*qr);	//合格的个数
		var nqrCount = count - qrCount;		//不合格的个数
		// max-期望的最大值,min-期望的最小值
		// max-期望的最大值,min-期望的最小值
		//parseInt(Math.random()*(max-min+1)+min,10);
		//Math.floor(Math.random()*(max-min+1)+ min);
		
		var orderArray = new Array();
		for(var i=0; i < qrCount;i++){
			orderArray.push("1");//1代表合格
		}
		for(var i=0; i < nqrCount;i++){
			orderArray.push("0");//0代表不合格
		}
		orderArray = disorder(orderArray);
		
		for(var i=0; i < mmAry.length; i++){
			var min = parseFloat(mmAry[i].min);						//合格最小值
			var max = parseFloat(mmAry[i].max);						//合格最大值
			var prec = parseFloat(mmAry[i].prec?mmAry[i].prec:-1);	//精度
			var main = mmAry[i].main?mmAry[i].main:'';				//主控
			var uqrange = mmAry[i].uqrange?mmAry[i].uqrange:'';		//不合格数的范围
			var tempPrec = 0;
			if(prec != -1){
				tempPrec = prec; 
			}else{	
				tempPrec = dd;
			}
			var value = 0;
			if(orderArray[i]=='1' || main!= ''){//main为主控项目
				var rd = Math.random(); 	
				value = rd*(max-min)+ min + '';
				if(tempPrec > 0 && value.indexOf('.') != -1){	
					value = value.substring(0,value.indexOf('.') + tempPrec + 1);
				}else if(tempPrec <= 0){
					value = Math.floor(value);
				}
			}else{
				var nqrMin = 0; //不合格最小值
				var nqrMax = 0; //不合格最大值
				var tempPrec = 0;
				if(uqrange != ''){//指定不合格范围
					var tempArray = uqrange.split(',');
					nqrMin = parseFloat(tempArray[0]);
					nqrMax = parseFloat(tempArray[1]);
				}else{
					if(max > 0){
						nqrMax = Math.floor(max*1.5);
						nqrMin = max;
					}else{
						nqrMax = min;
						nqrMin = Math.floor(min*1.5);
					}
				}	
			    value = Math.random()*(nqrMax-nqrMin) + nqrMin + 1 + '';	
				if(tempPrec > 0 && value.indexOf('.') != -1 ){
					value = value.substring(0,value.indexOf('.') + tempPrec + 1);	
				}else if(tempPrec <= 0){
					value = Math.floor(value);
				}
			}
			arr.push(value);
		}
		return arr;		
	}
	
	/**
	 * 取消勾选清空数据
	 * @param obj {DOM对象} 指定dom对象
	 * @return 
	 */
	function cancelRndChkEvent(obj){
		var dInx = $(obj).parent().parent().index()+1; 
		var tagId = $(obj).attr('id'); 
		$('table tr:nth-child('+ dInx +') div[widgeType=rnd][contenteditable=true]').each(function(index){	
			var srcArray = $(this).attr('src').split(',');	
			for(var i = 0; i < srcArray.length; i++ ){	
				if(map[srcArray[i]] == tagId ){
							$(this).html('');		
				 			resetFailFlag(this); 
				}	
			}
		});
	}
 	//#######################################
 	
 	
 	//检验批模块
 	//#######################################
 	//检验批容量脱离焦点事件
 	function testFocusEvent(divObj){
		var value = getDivValue($(divObj));
		var isUnit = isCountUnit(divObj);
		var num =  $(divObj).attr('unitNum');	
		if(isUnit == null){
			layer.tips('输入不合法!', divObj,{time : 1000});
			return;
		}
 		$(divObj).data('capNum',num);
 		setTestData(divObj);
 	}
 	
 	//解析检验批数字
 	function parseTestNum(str){
 	    if(str == ''){
 	    	return 0;
 	    }
 		if(isNaN(str)){
 			return -1;
 		}
 		
 		var fNum = parseFloat(str);
 		fNum = Math.ceil(fNum);
 		
 		if(fNum < 1){
 			return -1;
 		}
 		return fNum;
 	}
 	
 	//设置检验批数据
 	function setTestData(divObj){
		setMinStamp(divObj);	
 		setActStamp(divObj);
 		setTestRec();
 		setTestRlt();
 	}

	var testData = {}; 	
 	//最小抽样数样数
 	function setMinStamp(divObj,index){
 		var capNum = $(divObj).data('capNum');
 		$("div[widgeType=testminsamp][contenteditable=true]").each(function(){
 		    //根据私有规则计算最小抽样数
 			var v = calcMinStamp4Private(this,capNum);
 			//如果是计数单位,那么还要公共规则计算.
 			var tvar = $(this).attr('type');
 			if(isCountUnit(divObj) && tvar!='full' && tvar!='null' ){
 				var v1 = calcMinStamp4Public(capNum) ;
 				v = v > v1 ? v : v1;
 			}
 			$(this).html(v);
 			//设置每行的最小抽样数类型
 			setTestData4Row(this,v,capNum);
 		});
 	}
 	
 	//设置实际抽样数
 	function setActStamp(curObj){
 		var unitType = $(curObj).attr('unitType');
 		$("div[widgeType=testactsamp][contenteditable=true]").each(function(){
 		    //根据最小抽样数的类型设置实际抽样数
			var index = $(this).parent().parent().parent().index() + 1;
			var actStampType = $(this).attr('type');
			if(testData[index]){
				var rowData = testData[index];
				if(rowData.type == 'null'){
					$(this).html('');
					testData[index].actStamp = 0;//设置每行的实际抽样数
				}else if(rowData.type == 'full'){
					var capNum = rowData.capNum;
					$(this).html('');
					testData[index].actStamp = capNum;//设置每行的实际抽样数
				}else if(rowData.type == 'num'){
					var minStamp = rowData.minStamp;
					var capNum = rowData.capNum;
					var result = null;
					if(actStampType == 'min' && minStamp){
						if(unitType == 'count'){
//							//单位为计数时,实际抽样数不能大于检验批容量
//							if(minStamp > capNum ){
//								result = capNum;
//							}else{
//								result = minStamp;
//							}
							//去掉此规则:单位为计数时,实际抽样数不能大于检验批容量 2016-11-07zhengshaofeng
							result = minStamp;
						}else if(unitType == 'measure'){
							//单位为计量时,实际抽样数不能小于最小抽样数
							result = minStamp;
						}
					}else if(actStampType == 'cap' && capNum){
						result = capNum;
					}
					$(this).html(result);
					testData[index].actStamp = result;//设置每行的实际抽样数
				}
			}
 		});
 	}
 	
 	//设置检查记录
 	function setTestRec(index){
 		if(isNullObject(testRectMap)){
 			initTestRec();
 		}
 		var jquerySel = "div[widgeType=testrec][contenteditable=true]";
 		if(index != void 0){
 			jquerySel =  'table tr:nth-child('+ index +') div[widgeType=testrec][contenteditable=true]';
 		}
 		var passRate = $('div[widgeType=testcap]').attr('passrate');//合格率
 		passRate = passRate ? + passRate : 80;
 		$(jquerySel).each(function(){
	 		var index = $(this).parent().parent().parent().index() + 1;
	 		if(testData[index]){
				var rowData = testData[index];
				var actStamp = testData[index]['actStamp'];
				var capNum = testData[index]['capNum'];

				var main = rowData.main;
				//合格数
				var fineNum = 0;
				if(rowData.type == 'null'){
					$(this).data('data',testRectMap['nullData']);//设置双击弹出数据
					$(this).html(testRectMap['null'][0]);	
				}else if(rowData.type == 'num'){
					//如果actStamp为空,那么检查记录也为空
					if(actStamp === 0 || actStamp === ''){
						$(this).html('');
						return true;
					}
					$(this).data('data',testRectMap['numData']);//设置双击弹出数据
					if(main){
						fineNum = actStamp;
					}else{
						fineNum = Math.ceil(((100 - passRate)*Math.random() + passRate)/100*actStamp);
					}
					var args = [actStamp,fineNum];	
					$(this).html(_strFormat(testRectMap['num'][0],args));	
      				testData[index]['fineNum'] = fineNum;//设置每行的合格数
      				testData[index]['badNum'] = actStamp-fineNum;//设置每行的不合格数
      				testData[index]['preOfPass'] = fineNum/actStamp*100;//设置每行的合格率
				}else if(rowData.type == 'full' ){
					//如果actStamp为空,那么检查记录也为空
					if(actStamp === 0 || actStamp === ''){
						$(this).html('');
						return true;
					}
					
					$(this).data('data',testRectMap['numData']);//设置双击弹出数据
					if(main){
						fineNum = actStamp;
					}else{
						fineNum = Math.ceil(((100 - passRate)*Math.random() + passRate)/100*actStamp);
					}
					var args = [actStamp,fineNum];	
      				$(this).html(_strFormat(testRectMap['num'][0],args));	
      				testData[index]['fineNum'] = fineNum;//设置每行的合格数
      				testData[index]['badNum'] = actStamp-fineNum;//设置每行的不合格数
      				testData[index]['preOfPass'] = fineNum/actStamp*100;//设置每行的合格率
				}
			}
			
			//设置默认的检查记录
			if($(this).attr('value')){
				$(this).html($(this).attr('value'));				 				
 			}
 		});
 	}
 	
 	//设置结论
 	function setTestRlt(index){
 		var jquerySel = "div[widgeType=testrlt][contenteditable=true]";
 		if(index != void 0){
 			jquerySel =  'table tr:nth-child('+ index +') div[widgeType=testrlt][contenteditable=true]';
 		}
 		var passRate = $('div[widgeType=testcap]').attr('passrate');//合格率
 		passRate = passRate ? + passRate : 80;
 		$(jquerySel).each(function(){
 			var index = $(this).parent().parent().parent().index() + 1;
 			if(testData[index]){
				var rowData = testData[index];
				var actStamp = testData[index]['actStamp'];
				var capNum = testData[index]['capNum'];
				var preOfPass = testData[index]['preOfPass'];
			
				var type = testData[index]['type'];
				var main = rowData.main;
				$(this).data('data','√#_#×#_#/');
				
				var result = '';
				if(type == 'null'){
					result = '√';
				}else if(main){
					//如果actStamp为空,那么检查记录也为空
					if(actStamp === 0 || actStamp === ''){
						$(this).html('');
						return true;
					}
					if(preOfPass == 100){
					  result = '√';
					}else{
					  result = '×';
					}
				}else{
					//如果actStamp为空,那么检查记录也为空
					if(actStamp === 0 || actStamp === ''){
						$(this).html('');
						return true;
					}
					if(preOfPass >= passRate && preOfPass <= 100 ){
						//有小数则保留一位
						result = preOfPass.toFixed(1)+'';
						if(result.indexOf('.0') != -1){
							result = result.substring(0, result.indexOf('.0'));
						}
				  		result += '%';
					}else {
						result = '×';
					}
				}
				$(this).html(result);
			}
 		});
 	}
 	
 	//根据私有规则计算最小抽样
 	function calcMinStamp4Private(curObj,capNum){
 			capNum = parseFloat(capNum);
 	 		var tvar = $(curObj).attr('type');
 	 		var result = null;
	 		//null,full,num
			if(tvar == 'null'){
				result = '';
			}else if(tvar == 'full'){
				result = '全';
			}else if(tvar == 'num'){
				var rule = $(curObj).attr('rule');
				var data = $(curObj).data();
				if(rule == 'fix'){
					var strExp = $(curObj).attr('exps');
					var min = $(curObj).attr('min');
					if(strExp != ''){
						result = calcExp(strExp,['cap'],[capNum]);
					}
					if(min != ''){
						var tempRlt = +min;
						result = tempRlt > result ? tempRlt : result;
					}
					result = Math.ceil(result);
				}else if(rule == 'range'){
					var range = $(curObj).attr('range');
					var strExp = $(curObj).attr('exps');
					var min = $(curObj).attr('min');
					var rangeArray = range.split(',');
					var expArray = strExp.split(',');
					var minArray = min.split(',');
					
					var index = getRangeIndex(capNum,rangeArray);
					var minValue = null;
					if(index !=-1){
						result = calcExp(expArray[index],['cap'],[capNum]);
						minValue = +(minArray.length == 1 ? minArray[0] : minArray[index]);
					}else{
						minValue = +minArray[0];
					}
					if(isNaN(minValue)){
						result = Math.ceil(result);
					}else{
						result = Math.ceil(result > minValue ? result : minValue);
					}
				}
			} 	
			return result;
 	}
 	
 	//根据公共规则计算最小抽样数
 	function calcMinStamp4Public(capNum){
 		if(isNullObject(pubRngMap)){
 			initPublicRange();
 		}
 		for(var rng in pubRngMap){
 			var rngArray = rng.split('-');
 			var min = +rngArray[0];
 			var max = +rngArray[1];
 			if(capNum > max){
 				continue;
 			}else if(capNum < min){
 				return null;
 			}else if(min <= capNum && capNum <= max){
 				return pubRngMap[rng];
 			}
 		}
 		return null;
 	}
 	
 	var pubRngMap = {};
 	 /*  初始公共规则
	  *	2-15 2
	  *	16-25 3
	  *	26-90 5
	  *	91-150 8
	  *	151-280 13
	  *	281-500 20
	  *	501-1200 32
	  *	1201-3200 50 
	*/
 	function initPublicRange(){
 		var str = '2-15';
 		pubRngMap[str] = 2;
 		str = '16-25';
 		pubRngMap[str] = 3;
 		str = '26-90';
 		pubRngMap[str] = 5;
 		str = '91-150';
 		pubRngMap[str] = 8;
 		str = '151-280';
 		pubRngMap[str] = 13;
 		str = '281-500';
 		pubRngMap[str] = 20;
 		str = '501-1200';
 		pubRngMap[str] = 32;
 		str = '1201-3200';
 		pubRngMap[str] = 50;
 	}
 	
 	//是否计数单位
 	function isCountUnit(curObj){
 		var value = trim(getDivValue($(curObj)));
 		if(value!='' && !isNaN(value)){//是数字时,自动补齐单位
 			var unit = $(curObj).attr('unit');
 			if(unit && unit!=''){
 				var result = isCount(unit);
 				if(result === false){
 					$(curObj).attr('unitType','measure');//计量
	 				$(curObj).attr('unitNum',value);
	 				$(curObj).html(value+unit);
	 				return false;
 				}else if(result === true){
 					$(curObj).attr('unitType','count');//计数
	 				$(curObj).attr('unitNum',value);
	 				$(curObj).html(value+unit);
	 				return true;
 				}
		 		return null;//unit的属性非法
 			}else{
 				return null;//unit为空时
 			}
 		}else{
	 		var resultArray = value.match(/\d+/);
	 		if(resultArray == null){
	 			return null;
	 		}
	 		var num = resultArray[0];
	 		if(value.substring(0,(num+'').length) != num){
	 			return null;
	 		}
	 		var unit = value.substring((num+'').length);
	 		var result = isCount(unit);
	 		if(result === false){
 				$(curObj).attr('unitType','measure');//计量
 				$(curObj).attr('unitNum',num);
 				return false;
	 		}else if(result === true){
	 			$(curObj).attr('unitType','count');//计数
 				$(curObj).attr('unitNum',num);
 				return true;
	 		}
	 		return null;
 		}
 	}
 	
 	//获得范围的索引号
 	function getRangeIndex(capNum,rangeArray){
 		for(var i = 0; i < rangeArray.length; i++){
 			var range = rangeArray[i];
 			//test:1000-3000
 			if(range.indexOf('-')!=-1){
 				var tempArray = range.split('-');
 				if(tempArray.length ==2){
 					var temp1 = +tempArray[0];
 					var temp2 = +tempArray[1];
 					if(capNum >= temp1 && capNum <= temp2){
 						return i;
 					}
 				}
 			}else{
 			//test:3001
 				if(isNaN(range)){
 					return -1;
 				}
 				if(capNum >= +range){
 					return i;
 				}
 			}
 		}
 		return -1;
 	}
 	
 	/*
 	 * 设置每行的检验批数据
 	 * type  类型
 	 * minStamp 最小抽样数
 	 * capNum   检验批容量
 	 * main     主控属性
 	 * actStamp 实际抽样数
 	 * fineNum  合格数
 	 * badNum   不合格数
 	 * preOfPass 合格率
 	 * index 检查记录index
 	 * fullRuleCount full规则的数量(多样化)
 	 * minSampText 最小抽样数文本(多样化)
 	 */
 	function setTestData4Row(curObj, val, capNum, fullRuleCount, minSampText){
 		var tvar = $(curObj).attr('type');
 		var main = $(curObj).attr('main');
 		var index = $(curObj).parent().parent().parent().index() + 1;
 		if(index != -1){
 			var data = {};
 			data.type = tvar;
 			data.minStamp = val;
 			data.capNum = capNum;
 			data.main = main;
 			data.index = 0;
 			if(fullRuleCount){
 				data.fullRuleCount = fullRuleCount;
 			}
 			if(minSampText){
 				data.minSampText = minSampText;
 			}
 			testData[index] = data;
 		}
 	}
 	
 	//实际抽样数改变事件
 	function changeActSampEvent(curObj){
 		if(!validateActSamp(curObj)){
 			layer.tips('输入不合法!', curObj);
 			return;
 		}
 		var index = $(curObj).parent().parent().parent().index() + 1;
 		var value = getDivValue($(curObj))=='全' ? testData[index].capNum : getDivValue($(curObj));
 		testData[index]['actStamp'] = value;
 		setTestRec(index);
 		setTestRlt(index);
 	}
 	
 	//检查记录改变事件
 	function changeTestRecEvent(curObj){
 		var testIndex = $(curObj).parent().parent().parent().index() + 1;
 		if(!testData[testIndex]){
 			return;
 		}
 		var value = getDivValue($(curObj));
 		var index =  testData[testIndex]['index'];
 		var type = testData[testIndex]['type'];
 		if((type == 'num' || type =='full' )&& value.lastIndexOf('合格') !=-1 ){
 			var fineNum = '';
	 		if(index == 0){
	 			fineNum = value.substring(value.lastIndexOf('合格')+2,value.lastIndexOf('处。'));
	 		}else if(index == 1){
	 			fineNum = value.substring(value.lastIndexOf('合格')+2,value.lastIndexOf('处。'));
	 		}else if(index == 2){
	 			fineNum = value.substring(value.lastIndexOf('合格')+2,value.lastIndexOf('处。'));
	 		}else if(index ==4){
	 			fineNum = value.substring(value.lastIndexOf('合格')+2,value.lastIndexOf('处。'));
	 		}
	 		testData[testIndex]['fineNum'] = fineNum;
	 		var actStamp = testData[testIndex]['actStamp'];
	 		testData[testIndex]['badNum'] = actStamp - (+fineNum);
	 		testData[testIndex]['preOfPass'] = fineNum/actStamp*100;
	 		
	 	}
 		setTestRlt(testIndex);
 	}
 	
 	 //验证实际抽样合法
 	function validateActSamp(curObj){
 		var testIndex = $(curObj).parent().parent().parent().index() + 1;
 		if(!testData[testIndex]){
 			return;
 		}
 		var value = getDivValue($(curObj));
 		var type = testData[testIndex]['type'];
 		if(type == 'null'){
 			if(value == ''){
 				return true;
 			}	
 		}else if (type == 'full'){
 			if(value == '全'){
 				return true;
 			}
 		}
 		var pattern = /^\+?[1-9][0-9]*$/;
 		return pattern.test(value);
 	}
 	
 	//验证检查记录合法
 	function validateTestRec(curObj){
 		
 	}
 	
 	//双击选择结论
 	function showTestRec(curObj){
 		showAutoSlt(curObj,'sltDlgClick4Test');
 	}
 	
 	//双击选择结果
 	function showTestRlt(curObj){
 		showAutoSlt(curObj,'sltDlgClick4TestRlt');
 	}
 	
 	//checkBox选择
 	function selectCheckBox(tagId,curObjId){
 		var name ="";
 		var attval ="";
 		var checkBoxName = "checkBox_"+curObjId;
 		$("input[name='"+checkBoxName+"']:checked").each(function(){
 			name +=$(this).val()+",";
 			if($(this).attr("attrval")){
 				attval +=$(this).attr("attrval")+",";
 			}
 		});
 		if(name){
 			name = name.substring(0,name.length-1);
 			$("#"+curObjId).text(name);
 		}
 		if(attval){
 			attval = attval.substring(0,attval.length-1);
 			$("#attr_"+curObjId).val(attval);
 		}
 		layer.close(divId);
 	}
 	
 	//显示checkBox
	function showAutoCheckBox(curObj){
		var checkData = $(curObj).attr("widgetype");
 		var data =param[checkData];
 		var value = $(curObj).attr('value');
 		
		if(!data && value == ''){
			return;
		}
		
		if($(curObj).attr('contenteditable')=='false'){
			return;
		}
		
		var array = new Array();
		if(data){
			data =data+"#_#"+value;
			array = data.split('#_#');
		}else if(value){
			array = value.split('#_#');
		}else{
			return ;
		}
		var tagId = $(curObj).attr("id");
		
		var tempArr = new Array();
		var tagId = $(curObj).attr("id");
		tempArr.push("<ul style='padding:10px;' id='ul_"+tagId+"'>");
		tempArr.push("</ul>");
		//如果数据为空,不显示
		if(tempArr.length == 4){
			return;
		}
		var text = tempArr.join('');
		var iframeId = getFormContentId();
		if(parent.document != null && parent.document.getElementById(iframeId)!=null){
			var obj = {};
			obj.type = 1;
			obj.title = '选择';
			obj.skin = 'layui-layer-rim';
			obj.area = ['420px', '240px'];
			obj.content = text;
			obj.offset=getLayerOffset();
			divId = layer.open(obj);
		}else{
			divId = layer.open({	
				type: 1,	
				title: '选择',	
				skin: 'layui-layer-rim', 	//加上边框
				area: ['420px', '240px'], 	//宽高
				content: text
			});
		}
		//var html =$("#ul_"+tagId);
		var html ="";
		html+="<table style='width:100%;border-collapse: collapse;border-spacing: 0;table-layout: fixed;font-size:13px;'>";
		for(var i =0; i < array.length; i++){
			if(array[i]==''){
				continue;
			}
			var attrval = "";
			var value ="";
			var arrays = array[i].split(",");
			value = arrays[0];
			if(arrays.length >1){
				attrval = arrays[1];
			}
			html+="<tr>";
			html+="<td style='border:1px solid #333; padding:6px;' tagId='" + tagId + "' >";
			html+="<input type='checkBox' name='checkBox_"+tagId+"' value='"+value+"' attrval='"+attrval+"'/>";
			html+=value;
			html+="</td>";	
			html+="</tr>";	
		}
//		if(value && value != ''){
//			array = value.split('#_#');
//			for(var i =0; i < array.length; i++){
//				if(array[i]==''){
//					continue;
//				}
//				tempArr.push("<tr>");
//				tempArr.push("<td style='border:1px solid #333; padding:6px;' tagId='" + tagId + "' onmousemove='sltDlgMouseMove(this);' onmouseout='sltDlgMouseOut(this);' onclick='sltDlgClick(this);'>");
//				tempArr.push(array[i]);
//				tempArr.push("</td>");	
//				tempArr.push("</tr>");	
//			}
//		}
		

		html+="</table>";	
		html+="<div style='text-align:center;margin-top:10px;'>";	
		html+="<input type=button value='确定' style='margin-right:15px;' onclick=selectCheckBox('"+tagId+"','"+$(curObj).attr("id")+"') />";	
		html+="<input type=button value='取消' onclick='layer.close("+divId+")'/>";	
		html+="</div>";
		$("#ul_"+tagId).append(html);
	}
 	
 	//选择检验批结论
	function sltDlgClick4Test(curObj){
		var tagId = $(curObj).attr("tagId");
		var testIndex = $('#'+tagId).parent().parent().parent().index() + 1;
		var index = $(curObj).parent().index();
		layer.close(divId);//这句代码必须放在$(curObj).parent().index()后面  ---解决ie下去知不道的问题
		var value = '';
		var type = testData[testIndex]['type'];
		if(type == 'num' || type == 'full'){
			value = testRectMap['num'][index];
			if(value.indexOf('{0}')!=-1){
				var args = new Array();
				if(index == 0 || index == 1 ){
					args.push(testData[testIndex]['actStamp']);
					args.push(testData[testIndex]['fineNum']);
				}else if(index == 2 || index == 3){
					args.push(testData[testIndex]['badNum']);
					args.push(testData[testIndex]['actStamp']);
					args.push(testData[testIndex]['fineNum']);				
				}
				value = value.replace(/\{(\d+)\}/g,
					function(s,i){
						return args[i];
	     				 }
	     			);
			}
		}else{
			value = testRectMap['null'][index];
		}
		$('#'+tagId).html(value);
		
	}
	
	//选择检验批结果
	function sltDlgClick4TestRlt(curObj){
		layer.close(divId);
		var value = getDivValue($(curObj));
		var tagId = $(curObj).attr("tagId");
		$('#'+tagId).html(value);
	}
 	
 	var testRectMap = {};
 	//初始化检验批的检查记录
 	function initTestRec(){
 		var testRec = new Array();
 		testRec.push('抽查{0}处，合格{1}处。');
 		testRec.push('共{0}处，全部检查,合格{1}处。');
 		testRec.push('{0}处明显不合格，均已整改并复查合格；抽查{1}处,合格{2}处。');
 		testRec.push('{0}处明显不合格，均已整改并复查合格；共{1}处,全部检验,合格{2}处。');
 		testRec.push('/');
 		testRectMap['num'] = testRec;
 		testRectMap['numData'] = testRec.join('#_#').replace(/\{(\d+)\}/g,' ');
 		
 		testRec = new Array();
 		testRec.push('质量证明文件齐全，检验合格，报告编号 。');
 		testRec.push('质量证明文件不全，检验不合格，报告编号 。');
 		testRec.push('检验合格，报告编号 。');
 		testRec.push('检验不合格，报告编号 。');
 		testRec.push('符合规范及设计文件要求。');
 		testRec.push('/');
 		testRectMap['null'] = testRec;
 		testRectMap['nullData'] = testRec.join('#_#');
 	}
 	
 	/**
     * 检验批多样化选择事件。
     * @param obj {js对象}  指定div的js对象。
     * @return void 0。
     */
 	function multTestSelect(obj){
 		var dataArray = getMultTestData(obj);
 		var tempArr = new Array();
 		tempArr.push ("<div style='padding:14px; height:280px;  overflow:hidden; overflow-y:auto;'>");
 		tempArr.push("<table id='multTestTable' border='1' style='width:100%;border-collapse: collapse;border-spacing: 0;border:1px;'>");
 		tempArr.push("	<thead>");
 		tempArr.push("		<tr height='30px'>");
 		tempArr.push("			<td align='center' style='font-weight:bold;'>是否显示</td>");
		tempArr.push("			<td align='center' style='font-weight:bold;'>检查项目</td>");
		tempArr.push("			<td align='center' style='font-weight:bold;'>容量数量</td>");
		tempArr.push("			<td align='center' style='font-weight:bold;'>容量单位</td>");
 		tempArr.push("		</tr>");
 		tempArr.push("	</thead>");
 		tempArr.push("	<tbody>");
 		for(var i = 0; i < dataArray.length; i++){
 			var data = dataArray[i];
			tempArr.push("	<tr height='30px'>");
			tempArr.push("		<td align='center'><input type='checkbox' " + (data.checkbox ? 'checked' : '') + "/></td>");
			tempArr.push("		<td align='center'>" + data.value + "</td>");
			tempArr.push("		<td align='center'><input type='text' value='" + (data.cap ? data.cap : '')  + "' validate='isPosiInt,min(0)'/></td>");
			tempArr.push("		<td align='center'>" + data.unit + "</td>");
			tempArr.push("	</tr>");
 		}
 		tempArr.push("	</tbody>");
 		tempArr.push("</table>");
 		tempArr.push("</div>");
 		tempArr.push("<div style='text-align:center; padding-top:14px;'>");
 		tempArr.push("<input type='button' class='new-btn-yellow' value='确定' onclick='setMultTestData();'/>&nbsp;<input type='button' class='new-btn-yellow' value='取消' onclick='closeDlg();'/>");
 		tempArr.push("</div>");
 		var content = tempArr.join("");
		openDlg(content,'检验批容量','620px','400px');
 	}
 	
 	/**
     * 解析检验批多样化数据。
     * @param obj {js对象}  指定div的js对象。
     * @return data 数组。
     * 		data.value //显示值
 	 *		data.unit //单位
 	 *		data.rule //规则
 	 *		data.checkbox //是否被勾选
 	 *		data.cap //容量
 	 *		data.min //最小值
 	 *		data.range //范围
 	 *		data.exps //公示
     */
 	function parseMultTestData(obj){
 		var curObj = $(obj);
 		var tagId = curObj.attr('ref');
 		var tabObj = $('#'+tagId);
 		var value = tabObj.attr('value');
 		var rule = tabObj.attr('rule');
 		var range = tabObj.attr('range');
 		var exps = tabObj.attr('exps');
 		var unit = tabObj.attr('unit');
 		var min = tabObj.attr('min');
 		
 		var ruleArray = rule.split(',');
 		var valArray = value.split(',');
 		var unitArray = unit.split(',');
 		var ranArray = range.split('|');
 		var expArray = exps.split('|');
 		var minArray = min.split('|');
 		if(valArray.length == 0 || unitArray.length == 0 || ruleArray.length == 0 || expArray == 0 ){
 			layer.alert('value,unit,rule,exp为空!');	
 			return;
 		}
 		if(valArray.length != unitArray.length || valArray.length != ruleArray.length || valArray.length != expArray.length ){
 			layer.alert('value,unit,rule,exp配置错误!');	
 			return;
 		}
 		//${testCap[type=mult][value=梁,板,墙][rule=range,range,fix][range=1000-3000,3001|1000-3000,3001][exps=0.001*cap,0.005*cap|0.001*cap,0.005*cap|0.001*cap][unit=个,件,件]}
 		var dataArray = new Array();
 		var rangeIndex = 0;
 		for(var i = 0; i < valArray.length; i++){
 			var data = {};
 			data.value = valArray[i];
 			data.unit = unitArray[i];
 			data.rule = ruleArray[i];
 			data.checkbox = 1;//是否被勾选(默认都勾选)
 			data.cap = 0;//容量
 			data.min = minArray[i];
 			if(ruleArray[i] === 'range'){
 				data.range = ranArray[rangeIndex];
 				rangeIndex++;
 			}
 			data.exps = expArray[i];
 			dataArray.push(data);
 		}
 		//缓存起来,不必每次都去解析
 		preformConfig.multTestData = dataArray;
 		return dataArray;
 	}
 	
 	/**
     * 设置检验批多样化数据。
     * @param 
     * @return void 0。
     */
 	function setMultTestData(){
		if(!validateForm($('#multTestTable'))){
 			return;
 		}
 		var dataArray = preformConfig.multTestData;
 		var trs = $('#multTestTable').find("tbody").children();
 		var taotalCap = 0;
 		for(var i = 0; i < trs.length; i++){
 			var tr = trs.eq(i);
 			var data = dataArray[i];
 			var tds = tr.children();
 			for(var j = 0; j < tds.length; j++){
 				var td = tds.eq(j);
 				if(j == 0){
 					data.checkbox = td.children().prop('checked') ? 1 : 0;
 				}else if(j == 1){
 					data.value = td.html();
 				}else if(j == 2){
 					data.cap = td.children().val() ? td.children().val() : "";
 					taotalCap += (+data.cap);
 				}else if(j == 3){
 					data.unit = td.html();
 				}
 			}
 		}
 		preformConfig.multTestTotalCap = taotalCap;
 		printMultTest(dataArray);
 		//最小抽样数,实际抽样数,检查记录,检查结果
 		refreshMultTestData(dataArray);
 		closeDlg();
 	}
 	
 	/**
     * 级联的检验批多样化数据
     * @param dataArray {array对象}  multTestData。
     * @return void 0。
     */
 	function refreshMultTestData(dataArray){
		setMultMinStamp(dataArray);
 		setMultActStamp(dataArray);
 		setTestRec();
 		setTestRlt();
 	}
 	
 	/**
 	 * 判断单位是计数还是计量
 	 * @param unit {String} 单位
 	 * @returns flase为计数,true为计量,void 0 为非法
 	 */
	function isCount(unit){
 		var unitArray1 = ['平','平米','平方','平方米','m²','㎡','立方米','立方','方','m³','米','m','M','','','m','m','',''];
 		var unitArray2 = ['个','件','种','套','部','间','批','吨','樘','扇','处','面','根','块','盏','条','台','只','幅','箱','束','按','榀','组','环','类','格','节点'];
 		for(var i = 0; i < unitArray1.length; i++){
 			if(unit == unitArray1[i]){
 				return false;
 			}
 		}
 		for(var i = 0; i < unitArray2.length; i++){
 			if(unit == unitArray2[i]){
 				return true;
 			}
 		}
 		return void 0;
	}
 	
	/**
 	 * 设置检验批
 	 * @param unit {String} 单位
 	 * @returns flase为计数,true为计量,void 0 为非法
 	 */
 	function setMultMinStamp(dataArray){
 		$("div[widgeType=testminsamp][contenteditable=true]").each(function(){
 			var alias = $(this).attr('alias');
 			var aliasArray = alias.split(',');
 			var result = 0;
 			var tvar = $(this).attr('type');
 			var minSampText = ""; //多样化时需要用到
 			if(tvar == 'null'){
 				result = '';
 			}else if(tvar == 'full'){
 				result = '全';
 			}else if(tvar == 'num'){
 				var fullRuleCount = 0;//检验批容量的rule为full的数量(多样化)
 				var fullRuleIsNotNullCount = 0;////检验批容量的rule为full且值不能为空的数量(多样化)
 	 			for(var i = 0; i < aliasArray.length; i++){
 	 				var index = +aliasArray[i];
 	 				if(index > 0 && dataArray.length >= index){
 	 					var data = dataArray[index-1];
 	 					var unit = data.unit;
 	 					var rule = data.rule;
 	 					var cap = data.cap;
 	 					
 	 					if(rule == 'full'){
 	 						fullRuleCount ++;
 	 					}
 	 					if(rule == 'full' && cap){
 	 						fullRuleIsNotNullCount ++;
 	 					}
 	 					
 	 					var v = 0;
 	 					//检验批多样化 不勾选或勾选不写数值 那么都为空
 	 					if(trim(cap) !== ''){
 	 					    //根据私有规则计算最小抽样数
	 	 		 			v = calcMinStamp4Private2(this,data);
	 	 		 			//如果是计数单位,那么还要公共规则计算
	 	 					var flag = isCount(unit);
	 	 					if(flag === true){//计数
	 	 						var v1 = calcMinStamp4Public(data.cap);
	 	 		 				v = v > v1 ? v : v1;
	 	 					}
 	 					}
 	 					result += v;
 	 				}
 	 			}
 				//用户所设置的所有检验批容量rule为full,那么result为全(多样化)
 				if(fullRuleIsNotNullCount === aliasArray.length ){
 					minSampText = '全';
 				}else if(fullRuleCount === aliasArray.length && result !== 0 ){
 					minSampText = '全';
 				}
 			}
 			$(this).html(minSampText ? minSampText : (result === 0 ? "" : result));
 			setTestData4Row(this, result, preformConfig.multTestTotalCap, fullRuleCount, minSampText);
 		});
 	}
 	
 	//根据私有规则计算最小抽样
 	function calcMinStamp4Private2(curObj,data){
 			var privateExps = $(curObj).attr('exps');//私有的公式
 			var strExp = privateExps ? privateExps : data.exps;//私有公式不存在,则使用私有公式
 			cap = +data.cap;
 	 		var tvar = $(curObj).attr('type');
 	 		var result = null;
	 		//null,full,num
			if(tvar == 'num'){
				var rule = data.rule;
				if(rule == 'fix' || rule == 'full'){//多样化需要full
					
					var min = data.min;
					if(strExp != ''){
						result = calcExp(strExp,['cap'],[cap]);
					}
					if(min != ''){
						var tempRlt = +min;
						result = tempRlt > result ? tempRlt : result;
					}
					result = Math.ceil(result);
				}else if(rule == 'range'){
					var range = data.range;
					var min = data.min;
					var rangeArray = range.split(',');
					var expArray = strExp.split(',');
					var minArray = min.split(',');
					
					var index = getRangeIndex(cap,rangeArray);
					var minValue = null;
					if(index !=-1){
						result = calcExp(expArray[index],['cap'],[cap]);
						minValue = +(minArray.length == 1 ? minArray[0] : minArray[index]);
					}else{
						minValue = +minArray[0];
					}
					if(isNaN(minValue)){
						result = Math.ceil(result);
					}else{
						result = Math.ceil(result > minValue ? result : minValue);
					}
				}
			} 	
			return result;
 	}
 	
 	//设置多样化的实际抽样数
 	function setMultActStamp(dataArray){
 		$("div[widgeType=testactsamp][contenteditable=true]").each(function(){
 		    //根据最小抽样数的类型设置实际抽样数
			var index = $(this).parent().parent().parent().index() + 1;
			var actStampType = $(this).attr('type');
			
			if(testData[index]){
				var rowData = testData[index];
				var minStamp = rowData.minStamp;
				var fullRuleCount = rowData.fullRuleCount;//full rule 的数量
				if(minStamp === 0){
					$(this).html('');
					testData[index].actStamp = 0;
				}else{
					if(rowData.type == 'null'){
						$(this).html('');
						testData[index].actStamp = 0;//设置每行的实际抽样数
					}else if(rowData.type == 'full'){
						var capNum = rowData.capNum;
						$(this).html('');
						testData[index].actStamp = capNum;//设置每行的实际抽样数
					}else if(rowData.type == 'num'){
						var capNum = rowData.capNum;
						var result = null;
						if(fullRuleCount){//多样化
							if(rowData.minSampText){//多样化最小抽样数为'全'时,最小抽样数为''
								result = '';
								$(this).html(result);
								testData[index].actStamp = minStamp;
							}else{
								result = minStamp;
								$(this).html(result);
								testData[index].actStamp = result;
							}
						}else if(actStampType == 'min' && minStamp){
							result = minStamp;
							$(this).html(result);
							testData[index].actStamp = result;
						}else if(actStampType == 'cap' && capNum){
							result = capNum;
							$(this).html(result);
							testData[index].actStamp = result;
						}
					}
				}
			}
 		});
 	}
 	
 	
 	/**
     * 显示检验批结果。
     * @param obj {js对象}  指定div的js对象。
     * @return void 0。
     */
 	function printMultTest(dataArray){
 		var result = "";
 		for(var i = 0; i < dataArray.length; i++){
 			var data = dataArray[i];
 			if(data.checkbox && data.cap){
 				result += data.value + data.cap + data.unit + ',';	
 			}
 		}
 		result = result.substring(0,result.length-1);
 		$("div[widgetype='testcap']").html(result);
 	}
 	
 	/**
     * 获取检验批多样化数据(暴露此函数)
     * @param obj {js对象}  指定div的js对象。
     * @return void 0。
     */
 	function getMultTestData(obj){
 		if(preformConfig.multTestData){
 			return preformConfig.multTestData;
 		}
 		return parseMultTestData(obj);
 	}
 	
 	//沉降位移模块
 	//#######################################
 	//初始化沉降位移
 	function initDspl(data){
 		if(data && data.dsplData){
 			var dsplConfigData = data.dsplData.dsplConfigData;
 			if(dsplConfigData){
 				dsplData.dsplConfigData = dsplConfigData;
 			}
 		}
 		//第二次不必弹出配置框
 		if(!dsplData.dsplConfigData && $('div[widgetype=dsplvalue][contenteditable=true]').size() > 0){
 			openDsplCfgDlg();
 		}
 	}
 	
 	//打开沉降位移的配置对话框
 	function openDsplCfgDlg(){
		var content = getDlgContent("dspl");
		openDlg(content,'位移预警设置','620px','270px');

		//弹出配置框时,填充配置数据
		if(dsplData.dsplConfigData && dsplData.dsplConfigData.total){
			$('#dsplTotal').val(dsplData.dsplConfigData.total);
			$('#dsplNoRule').val(dsplData.dsplConfigData.noRule);
			triggerSelectChange($('#dsplNoRule'));
	 		$('#prefixSuffix').val(dsplData.dsplConfigData.prefixSuffix);
	 		$('#startNo').val(dsplData.dsplConfigData.startNo);
	 		$('#thisOfs').val(dsplData.dsplConfigData.thisOfs);
	 		$('#accumOfs').val(dsplData.dsplConfigData.accumOfs);
		}
 	}
	 	
 	//沉降位移编号规则改变
 	function dsplNoRuleChange(){
 		var val = $('#dsplNoRule').val();
 		if(val == '4' || val == '5'){
 			$('#prefixSuffix').attr("disabled",false);
 		}else{
 			$('#prefixSuffix').val('');
 			$('#prefixSuffix').attr("disabled",true);
 		}
 		if(val == 0 || val == '4' || val == '5' ){
 			$('#startNo').attr("disabled",false);
 		}else {
 			$('#startNo').val('');
 			$('#startNo').attr("disabled",true);
 		}
 	}
 	
 	//沉降位移配置框ok事件
 	function dsplConfOk(){
 		//数据验证
 		if(!validateForm($('#dsplConfigTable'))){
 			return;
 		}
 		//设置沉降配置数据
 		setDsplConfData();
 		//初始化沉降数据
 		initDsplData();
 		//自动计算沉降位移
 		calcDspl();
 	}
 	
 	//设置沉降配置数据
 	function setDsplConfData(){
 		if(!validateForm($('#dsplConfigTable'))){
 			return;
 		}
 		var total = $('#dsplTotal').val();//观测点总数
 		var noRule = $('#dsplNoRule').val();//观测点规则
 		var prefixSuffix = $('#prefixSuffix').val();//前缀后缀
 		var startNo = $('#startNo').val();//起始号
 		var thisOfs = $('#thisOfs').val();//本次偏移量
 		var accumOfs = $('#accumOfs').val();//累计偏移量
 		
 		dsplData.dsplConfigData = {};
 		dsplData.dsplConfigData.total = total;
 		dsplData.dsplConfigData.noRule = noRule;
 		dsplData.dsplConfigData.prefixSuffix = prefixSuffix;
 		dsplData.dsplConfigData.startNo = startNo;
 		dsplData.dsplConfigData.thisOfs = thisOfs;
 		dsplData.dsplConfigData.accumOfs = accumOfs;
 	}
 	
 	//初始化沉降数据
	function initDsplData(){
	 	if(dsplData.dsplConfigData){
	 		initDsplNo();
	 	}
	 	layer.close(divId);
	}
	 
	var letterArray = ['a','b','c','d','e','f','g','h','i','j','k','m','l','n','o','p','q','r','s','t','u','v','w','s','y','z'];
	var romeLetterArray =  ['Ⅰ','Ⅱ','Ⅲ','Ⅳ','Ⅴ','Ⅵ','Ⅶ','Ⅷ','Ⅸ','Ⅹ','Ⅺ','Ⅻ','XIII','XIV','XV','XVI','XVII','XVIII','XIX','XX'];
	//初始化沉降位移编号
	function initDsplNo(){
	 	var startNo = dsplData.dsplConfigData.startNo;
	 	var total = +dsplData.dsplConfigData.total;
	 	var rule = dsplData.dsplConfigData.noRule;
	 	var prefixSuffix = dsplData.dsplConfigData.prefixSuffix;
	 	var noArray = new Array();
	 	if(rule == 0){
	 		startNo = +startNo;
	 		for(var i = 0; i < total; i++ ){
	 			noArray.push(startNo + i);
	 		}
	 	}else if(rule == 1){
	 		for(var i = 0; i < total; i++ ){
	 			if(i < letterArray.length){
	 				noArray.push(letterArray[i]);
	 			}
	 		}
	 	}else if(rule == 2){
	 		for(var i = 0; i < total; i++ ){
	 			if(i < letterArray.length){
	 				noArray.push(letterArray[i].toUpperCase());
	 			}
	 		}
	 	}else if(rule == 3){
	 		for(var i = 0; i < total; i++ ){
	 			if(i < romeLetterArray.length){
	 				noArray.push(romeLetterArray[i]);
	 			}
	 		}
	 	}else if(rule == 4){
	 		startNo = +startNo;
	 		for(var i = 0; i < total; i++ ){
	 			noArray.push(prefixSuffix + (startNo + i));
	 		}
	 	}else if(rule == 5){
			startNo = +startNo;
	 		for(var i = 0; i < total; i++ ){
	 			noArray.push((startNo + i) + prefixSuffix);
	 		}	 	
	 	}
		$('div[widgetype=dsplno][contenteditable=true]').each(function(index){
			$(this).html('');
			if(index < noArray.length){
				$(this).html(noArray[index]);
			}
		});
	 }
	 
	 //自动计算沉降位移(外部调用)
	 function calcDspl(){
	 	$('div[widgetype=dsplthisofs][contenteditable=false],div[widgetype=dsplaccumofs][contenteditable=false]').each(function(){
			calcDsplOfs(this);
	 	});
	 }
	 
	 //计算
	 function calcDsplOfs(obj){
	 	if(!validate($(obj))){
	 		return;
	 	}
	 	if(!dsplData.dsplConfigData){
	 		layer.alert('预警设置为空!');	
     		return;
	 	}
	 	var tId = $(obj).attr('id');
	 	var wType = $(obj).attr('widgetype');
 		var strExp = $(obj).attr('exps');
 		if(strExp && strExp!=''){
			var exp = new Expression('');
			exp.Expression(strExp);		//设置表达式
		 	exp.Parse();	//得到结果
			var arrTokens = exp.getArrTokens();	//变量与运算符的数组
			var result = null;	//结果
			var flag = false;
			for(var i = 0; i < arrTokens.length; i++ ){
	 			if(map[arrTokens[i]]){	
	 				var tagId = map[arrTokens[i]];
	 				var value = getDivValue($('#'+tagId));
	 				if(value != ''){
	 					exp.AddVariable(arrTokens[i], parseFloat(value));	//设置变量
	 					flag = true;
	 				}
	 			}
			}
			if(flag){
				var result = null;
				try{
					result = exp.Evaluate();	
					result = result.toFixed(3);
				}catch(e){
					$(obj).html('');
					return;
				}	
				if(wType == 'dsplthisofs'){
					if(Math.abs(result) > Math.abs(dsplData.dsplConfigData.thisOfs)){
						addOrRemoveCss(tId,'color','red');
						//layer.tips('超过预警值!', obj, {time : 1000});
						//tipsMore : true 多个, time : 1000 显示1秒
					}else{
						addOrRemoveCss(tId,'color');
					}
				}else if(wType == 'dsplaccumofs'){
					if(Math.abs(result) > Math.abs(dsplData.dsplConfigData.accumOfs)){
						addOrRemoveCss(tId,'color','red');
						//layer.tips('超过预警值!', obj, {time : 1000});
						//tipsMore : true 多个, time : 1000 显示1秒
					}else{
						addOrRemoveCss(tId,'color');
					}
				}
		 		result = parseFloat(result);//去掉末尾的0
				$(obj).html(result);
			}
 		}
	 }
	 
	 var dspaRowSpanMap = {};//跨行的列map
	 var dsplRowMap = {};//每行对应的沉降点编号和生成日期(不包含colspan)
	 var dsplInpMap = {};//高程,本次沉降,累计沉降控件对应的行和列(不包含colspan)
	 //解析沉降表格各个数据
	 function parseDsplTable(){
	 	if($.isEmptyObject(dsplRowMap) || $.isEmptyObject(dsplInpMap)){
		 	$('div[widgetype=dsplno],div[widgetype=dspltime]').each(function(){
		 		var rowIndex = $(this).parent().parent().parent().index() + 1;
		 		if(dsplRowMap[rowIndex] === void 0){
		 			var temp = 0;
		 			var rowData = {};
		 			$('table tr:nth-child('+ rowIndex +') td').each(function(){
		 				var colspan = +($(this).attr('colspan'));
		 				$(this).find('div[widgetype=dsplno],div[widgetype=dspltime]').each(function(){
		 					var tagId = $(this).attr('id');
			 				for(var i = 0; i < colspan; i++ ){
			 					rowData[temp+i+1] = tagId;
			 				}
		 				});
		 				$(this).find('div[widgetype=dsplvalue],div[widgetype=dsplthisofs],div[widgetype=dsplaccumofs]').each(function(){
		 					var tagId = $(this).attr('id');
			 				var tdData = {};
			 				tdData.rowIndex = rowIndex;
			 				tdData.colIndex = temp+1;
			 				dsplInpMap[tagId] = tdData;
		 				});
		 				temp+=colspan;
		 			});
		 			if(!$.isEmptyObject(rowData)){
		 				dsplRowMap[rowIndex] = rowData;
		 			}
		 		}
		 	});
	 	}
	 }
	 
	 //解析沉降位移跨行数据
	 function parseDsplRowSpan(){
	 	if($.isEmptyObject(dsplRowMap)){
	 		$('table td[rowspan]').each(function(){
	 			var rowspan =  $(this).attr('rowspan');
	 			
	 			var rowIndex = $(this).parent().index() + 1;
	 			var colIndex = $(this).index() + 1;
	 			
	 		});
	 	}
	 }
	
	 var dsplData = {};//沉降位移数据
	 var dspl110Data = {};//110报警数据
	 /**
	  *	按照编号维度生成沉降详细信息.(生成dsplData dspl110Data)
	  *	返回-1表示没有数据,返回0表示有位移数据和预警数据,返回1表示有位移数据但没有预警数据
	  * 保存或生成位移数据时,会调用此方法
	  */
	 function generateDsplDetail(){
	 	//每次调用这个方法清除之前的信息
	 	for(var name in dsplData){
	 		if(name != 'dsplConfigData'){
	 			delete dsplData[name];
	 		}
	 	}
	 	for(var name in dspl110Data){
	 		delete dspl110Data[name];
	 	}
	 	parseDsplTable();
	 	$('div[widgetype=dsplvalue],div[widgetype=dsplthisofs],div[widgetype=dsplaccumofs]').each(function(){
	 		var tagId = $(this).attr('id');
	 		var value = getDivValue($(this));
	 		var ttype = $(this).attr('widgetype');
	 		
	 		var time = $(this).attr('time');
	 		var no = $(this).attr('no');
	 		if(time == '' || no == '' || isNaN(value) || value == ''){
	 			return true;
	 		}
	 		var dsplNo = getDivValue($('#'+map[no]));
	 		var dsplTime = getDivValue($('#'+map[time]));
			if(dsplNo!='' && dsplTime!='' ){
				//初始化dsplNo
				if(dsplData[dsplNo] === void 0){
					dsplData[dsplNo] = {};	 				
				}
				//初始化dsplNo dsplTime
				if(dsplData[dsplNo][dsplTime] === void 0){
					dsplData[dsplNo][dsplTime] = {};
				}
				dsplData[dsplNo][dsplTime][ttype] = value;
				//生成预警数据(喂,110吗?这里有人装逼已经控制不住局面了!)
				if(ttype == 'dsplthisofs'){
					if(Math.abs(parseFloat(value)) > Math.abs(dsplData.dsplConfigData.thisOfs)){
						//初始化dsplNo
						if(dspl110Data[dsplNo] === void 0){
							dspl110Data[dsplNo] = {};	 				
						}
						//初始化dsplNo dsplTime
						if(dspl110Data[dsplNo][dsplTime] === void 0){
							dspl110Data[dsplNo][dsplTime] = {};
						}
						dspl110Data[dsplNo][dsplTime][ttype] = value;
					}
				}else if(ttype == 'dsplaccumofs'){
					if(Math.abs(parseFloat(value)) > Math.abs(dsplData.dsplConfigData.accumOfs)){
						//初始化dsplNo
						if(dspl110Data[dsplNo] === void 0){
							dspl110Data[dsplNo] = {};	 				
						}
						//初始化dsplNo dsplTime
						if(dspl110Data[dsplNo][dsplTime] === void 0){
							dspl110Data[dsplNo][dsplTime] = {};
						}
						dspl110Data[dsplNo][dsplTime][ttype] = value;
					}
				}
			}
	 	});
	 	
	 	if(!$.isEmptyObject(dsplData) || !$.isEmptyObject(dspl110Data)){
			return 0;
		}else if(!$.isEmptyObject(dsplData) || $.isEmptyObject(dspl110Data)){
			return 1;
		}else {
			return -1;
		}
	 }

	 //打开位移曲线图弹出框
     function openDsplGraphDlg(){
     	//按照编号维度生成沉降详细信息
     	generateDsplDetail();
     	parseHchartsData();
     	var tempArr = new Array();	
     	var noList = getHchartsData('noList');
     	if(noList == null || noList.length == 0){
     		layer.alert('没有数据!');	
     		return;
     	}
		tempArr.push("<ul style='padding:10px;'>");
		tempArr.push("	<select style='float:left;height:500px;width:150px;' onchange='sltDsplGraphChange(this);' oninput='sltDsplGraphChange(this);' multiple='multiple' >");	
		for(var i = 0; i < noList.length; i++){
			if(i == 0){
				//最小平均最大曲线(默认)
				tempArr.push("<option selected='selected' value='minAvgMax'>累计沉降曲线</option>");
				tempArr.push("<option value='" + noList[i] + "'>" + noList[i] + "</option>");	
			}else{
				tempArr.push("<option value='" + noList[i] + "'>" + noList[i] + "</option>");	
			}
		}
		tempArr.push("	</select>");	
		tempArr.push("<div id='container' style='border:1px;float:left;height:500px;overflow-y:auto;'>");	
		tempArr.push("</div>");	
		tempArr.push("</ul>");
		var text = tempArr.join('');
		var iframeId = getFormContentId();
		if(parent.document != null && parent.document.getElementById(iframeId)!=null){
			var obj = {};
			obj.type = 1;
			obj.title = '位移曲线图';
			obj.skin = 'layui-layer-rim';
			obj.area = ['920px', '570px'];
			obj.content = text;
			obj.offset=getLayerOffset();
			divId = layer.open(obj);
		}else{
			divId = layer.open({	
				type: 1,	
				title: '位移曲线图',	
				skin: 'layui-layer-rim', 	//加上边框
				area: ['920px', '570px'], 	//宽高
				content: text
			});
		}
		loadHchartsData('累计沉降', dsplHchartsData.aggr.date, dsplHchartsData.aggr.min, dsplHchartsData.aggr.avg, dsplHchartsData.aggr.max);
     }
     
     
     var dsplHchartsData = {};
     //解析成曲线图数据
     function parseHchartsData(){
     	dsplHchartsData = {};
     	for(var name in dsplData){
     		if(name != 'dsplConfigData'){
     			var dsplno = name;
     			var oneData = dsplData[dsplno]
     			dsplHchartsData[dsplno] = {};
     			dsplHchartsData[dsplno]['timeArray'] = new Array();
     			dsplHchartsData[dsplno]['thisOfsArray'] = new Array();
     			dsplHchartsData[dsplno]['accumOfsArray'] = new Array();
     			for(var name2 in oneData){
     				dsplHchartsData[dsplno]['timeArray'].push(getMonthAndDay(name2));
     				var data = oneData[name2];
     				dsplHchartsData[dsplno]['thisOfsArray'].push(parseFloat(data.dsplthisofs));
     				dsplHchartsData[dsplno]['accumOfsArray'].push(parseFloat(data.dsplaccumofs));
     			}
     		}
     	}
     	//解析最小平均最大的曲线数据
     	var rltMap = parseAggrHchartsData();
     	dsplHchartsData.aggr = rltMap;
     }
     
     //每个沉降点的曲线数据 no为编号
     function getHchartsData(key,no){
     	if($.isEmptyObject(dsplHchartsData)){
     		return null;
     	}
     	var array = new Array();
     	if(key == 'noList'){
     		for(var name in dsplHchartsData){
     			if(name != 'aggr'){
     				array.push(name);
     			}
     		}
     	}else if(key == 'firstNo'){
     		for(var name in dsplHchartsData){
     			return name;
     		}
     	}else if(key == 'timeArray' && dsplHchartsData[no]){
     		array = dsplHchartsData[no]['timeArray'];
     	}else if(key == 'thisOfsArray' && dsplHchartsData[no]){
     		array = dsplHchartsData[no]['thisOfsArray'];
     	}else if(key == 'accumOfsArray' && dsplHchartsData[no]){
     		array = dsplHchartsData[no]['accumOfsArray'];
     	}
     	return array;
     }
     
     /**
      * 解析最小平均最大的曲线数据 
      * (每个沉降点在某个日期的最大最小平均沉降)
      */
     function parseAggrHchartsData(){
     	if($.isEmptyObject(dsplData)){
     		return null;
     	}
     	var map = {};
		for(var no in dsplData){
			if(no != 'dsplConfigData'){
				var data = dsplData[no];
				for(var dateStr in data){
					var accumOfsArray = map[dateStr];
					if(!accumOfsArray){
						accumOfsArray = new Array();
					}
					if(data[dateStr]['dsplaccumofs'] && data[dateStr]['dsplaccumofs']!=''){
						accumOfsArray.push(parseFloat(data[dateStr]['dsplaccumofs']));
					}
					map[dateStr] = accumOfsArray;
				}
			}
		}
		var rltMap = { min : new Array(), max :  new Array(), avg : new Array() , date : new Array()};
		for(var dateStr in map){
			var array = map[dateStr];
			var min = Math.min.apply(null,array);
			var max = Math.max.apply(null,array);
			
			var sum = reduce(array,function(accum,current){
				return accum + current;
			});
			
			var avg = sum/array.length;
			rltMap.min.push(min);
			rltMap.max.push(max);
			rltMap.avg.push(avg);
			rltMap.date.push(getMonthAndDay(dateStr));
		}    
     	return rltMap;
     }
     
     //加载曲线数据(弹出曲线图时调用此方法塞数据)
     function loadHchartsData(no, timeArray, thisOfsArray, accumOfsArray, maxOfsArray){
     	var seriesData = {};
     	if(!maxOfsArray){
     		seriesData =  [{
	            name: '本次沉降',
	            marker: {symbol: 'square'},
	            data: thisOfsArray
	        }, {
	            name: '累计沉降',
	            marker: {symbol: 'diamond'},
	            data: accumOfsArray
	        }];
     	}else{
     		seriesData =  [{
	            name: '最小',
	            marker: {symbol: 'square'},
	            data: thisOfsArray
	        }, {
	            name: '平均',
	            marker: {symbol: 'diamond'},
	            data: accumOfsArray
	        }, {
	            name: '最大',
	            marker: {symbol: 'circle'},
	            data: maxOfsArray
	        }];
     	}
     	$('#container').highcharts({
	        chart: {
	            type: 'spline'
	        },
	        title: {
	            text: no + '位移曲线图'
	        },
	        loading: '加载中...',	
	        noData: {
		        attr: null,
		        position: {
		            "x": 0, 
		            "y": 0, 
		            "align": "center", 
		            "verticalAlign": "middle"
		        },
		        style: {
		            "fontSize": "12px", 
		            "fontWeight": "bold", 
		            "color": "#60606a"
		        }
   			},
	        subtitle: {
	            text: 'Source: wz.10333.com'
	        },
	        xAxis: {
	            categories: timeArray
	        },
	        yAxis: {
	            title: {
	                text: '变化量(mm)'
	            },
	            labels: {
	                formatter: function() {
	                    return this.value +'mm'
	                }
	            }
	        },
	        tooltip: {
	            crosshairs: true,
	            shared: true
	        },
	        plotOptions: {
	            spline: {
	                marker: {
	                    radius: 4,
	                    lineColor: '#666666',
	                    lineWidth: 1
	                }
	            }
	        },
	        series: seriesData
    	});
     }
	
    /**
     * 曲线图选择沉降点编号改变事件
     * @param
     * @return 
     */ 
    function sltDsplGraphChange(obj){
     	var no = $(obj).find("option:selected").val();
     	if(no == 'minAvgMax'){
     		loadHchartsData('累计沉降', dsplHchartsData.aggr.date, dsplHchartsData.aggr.min, dsplHchartsData.aggr.avg, dsplHchartsData.aggr.max);
     	}else{
	   		loadHchartsData(no,getHchartsData('timeArray',no),getHchartsData('thisOfsArray',no),getHchartsData('accumOfsArray',no));
	    }
    }
     
    /**
     * 年月日转为为月日(曲线图的宽度不够)
     * @desc 2015年06月04日 转换为06-04
     * @param
     * @return 
     */
    function getMonthAndDay(dateStr){
     	if(dateStr.indexOf('年') == -1 || dateStr.indexOf('月') == -1 || dateStr.indexOf('日') == -1){
     		layer.alert('时间格式错误!');	
     		return false;
     	}
    	return dateStr.substring(dateStr.indexOf('年')+1,dateStr.indexOf('月')) + '-' + dateStr.substring(dateStr.indexOf('月')+1,dateStr.indexOf('日'));
    }
     
     
    //文件编号
 	//#######################################
    /**
     * 自定义前缀的文件编号
     * @param
     * @return
     */
    function openPrefixDlg(){
    	var prefVal = $('[widgetype=snInput]').attr('prefVal');
    	prefVal = prefVal ? prefVal : '';
    	var strArray = new Array();	
		strArray.push("<br><li><label style='width:180px;'>请输入文件编号的前缀:</label><input type='text' id='prefix' name='prefix' value='" + prefVal + "' validate='isNotNull'></li>");	
		strArray.push("<br><li style='text-align:center;'><input type='button' class='new-btn-yellow' value='确定' onclick='prefixNoOk();'>");
		strArray.push("&nbsp;&nbsp;<input type='button' class='new-btn-gray' value='重置' onclick='resetBrNo();'></li>");
		var text = strArray.join('');
		var iframeId = getFormContentId();
		if(parent.document != null && parent.document.getElementById(iframeId)!=null){
			var obj = {};
			obj.type = 1;
			obj.title = '自定义前缀的文件编号';
			obj.skin = 'layui-layer-rim';
			obj.area = ['500px', '180px'];
			obj.content = text;
			obj.offset=getLayerOffset();
			divId = layer.open(obj);
		}else{
			divId = layer.open({	
				type: 1,	
				title: '自定义前缀的文件编号',	
				skin: 'layui-layer-rim', 	//加上边框
				area: ['500px', '180px'], 	//宽高
				content: text
			});
		}
    }
    
    /**
     * 自定义前缀确定事件
     * @param 
     * @return 
     */
    function prefixNoOk(){
    	if(!validate($('#prefix'))){
	 		return;
	 	}
	 	var prefVal = $('#prefix').val();//前缀文件编号
	 	var serNo = $('[widgetype=snInput]').attr('serNo');//顺序号
	 	$('[widgetype=snInput]').attr('prefVal',prefVal);
	 	$('[widgetype=snInput]').val(prefVal + serNo );
	 	layer.close(divId);
    }
    
    /**
     * 初始化分部列表
     * @param
     * @return 
     */
    function initBrList(){
    	if($('input[widgetype=snInput][type=brsn],input[widgetype=snInput][type=brdatasn],input[widgetype=snInput][type=brprojsn]').length > 0){
    		loadBrList4Jsonp();
    	}
    }
    
    /**
     * 打开分部文件编号弹出层
     * @desc 资料类别 :  1个字母+1个数字或1个字母+2个数字
     * 类别代码 : 1个字母+1个数字或1个字母+2个数字
	 * 工程项目代码 : 自定义不限字数
     */
    function openBrDlg(type,snVal){
    	var param = {};
    	param.snVal = snVal;
		var content = getDlgContent(type, param);
		openDlg(content,'文件编号','600px','220px');
		initBrSltData(type);
    }
    
    var brData = {};
    var brArray = {};
    //初始化分部子分部下拉框
    function initBrSltData(type){
    	var gbSlt = $('#gbSlt');
    	var firstGbId = "";
    	for(var i = 0; i < brArray.length; i++){
    		if( i == 0){
    			firstGbId = brArray[0].id;
    		}
    		gbSlt.append("<option value='" + brArray[i].id + "'>" + brArray[i].name + "</option>");
    	}
    	
    	loadBrData4Jsonp(firstGbId);
    	
    	//再次打开时填充数据
    	var value = $('input[widgetype=snInput]').val();
    	if(value.indexOf('-') !=-1){
    		var valArray = value.split('-');
    		var snType = preformConfig.snType;
    		if(snType == 'brsn'){//分部编号(分部2-子分部2-顺序号3)
    			$('#gbSlt').val(preformConfig.gbVer);
    			triggerSelectChange($('#gbSlt'));
    			brCascadeSelect($('#brSlt'),valArray[0]);
    			brCascadeSelect($('#brItemSlt'),valArray[1]);
    		}else if(snType == 'brdatasn'){//分部2-子分部2-资料类别2,3-顺序号
    			$('#gbSlt').val(preformConfig.gbVer);
    			triggerSelectChange($('#gbSlt'));
    			brCascadeSelect($('#brSlt'),valArray[0]);
    			brCascadeSelect($('#brItemSlt'),valArray[1]);
    			$('#dataNo').val(valArray[2]);
    		}else if(snType == 'brprojsn'){//工程项目代码（自定义）-类别代码2,3-分部代码2-顺序号3
    			if(valArray.length == 5){
    				var temp = valArray.shift();//删除第1个元素,并追加到第二个元素上去
    				valArray[0] = temp + '-' + valArray[0];
    			}
    			$('#gbSlt').val(preformConfig.gbVer);
    			triggerSelectChange($('#gbSlt'));
    			$('#brProjNo').val(valArray[0]);	
    			$('#dataNo').val(valArray[1]);	
    			brCascadeSelect($('#brSlt'),valArray[2]);
    		}
    	}
    }
    
    //分部子分部级联选择
    function brCascadeSelect(jObj,val){
    	jObj.find('option').each(function(){
    		if($(this).val().indexOf(val) == 0){
    			$(this).attr("selected", "selected");
    			return false;
    		}
    	});
    	triggerSelectChange(jObj);
    }
    
    //加载分部子分部数据
    function setBrData4Jsonp(data){
    	data = decodeURIComponent(decodeURIComponent(data));
    	brData = JSON.parse(data);
    }
    
    //根据key获得子类数据
    function getBrValue(gb, br){
    	var rltArray = new Array();
    	if(!gb){
    		return rltArray;
    	}
    	if(gb && !br){
    		if(!brData[gb]){
    			for(var temp in brData[gb]){
    				rltArray.push(temp);
    			}
    			return rltArray;
    		}
    	}else if(gb && br){
    		if(!brData[gb] && !brData[gb][br]){
    			return brData[gb][br];
    		}
    	}
    	return rltArray;
    }
    
    //国标改变事件
    function gbSltChange(obj){
    	var curGbVer = $(obj).find('option:selected').val();	
    	var brSlt = $('#brSlt');
    	var firstBr = null;
    	$("#brSlt option").remove();//清空
    	$("#brItemSlt option").remove();//清空
    	loadBrData4Jsonp(curGbVer);
    }
    
    //分部改变事件
    function brSltChange(obj){
    	var curGbVer = $('#gbSlt').find('option:selected').val();	
    	var curBr = $(obj).find('option:selected').val();	
    	var brItemSlt = $('#brItemSlt');
    	$("#brItemSlt option").remove();//清空
    	if(brData[curGbVer][curBr]){
	    	for(var i = 0; i < brData[curGbVer][curBr].length; i++){
	    		brItemSlt.append("<option value='" + brData[curGbVer][curBr][i] + "'>" + brData[curGbVer][curBr][i] + "</option>");
	    	}
    	}
    }

	//br编号确定事件
    function brNoOk(){
    	if(!validateForm($('#brNoCfgDlg'))){
	 		return;
	 	}
    	var curGbVer = $('#gbSlt').find('option:selected').val();	
    	preformConfig.gbVer = curGbVer;//设置国标
    	var brVal = $('#brSlt').find('option:selected').val();	
    	var brItemVal = $('#brItemSlt').find('option:selected').val();
    	var snType = preformConfig.snType;
    	var brNo = brVal.substring(0,2);//分部编号
    	var brItemNo = brItemVal ? brItemVal.substring(0,2) : '';//子分部编号
    	var serNo = $('input[widgetype=snInput]').attr('serNo');//顺序号
    	if(!isNaN(brNo) && !isNaN(brItemNo)){//如果是数字的,表示正常
    		if(snType == 'brsn'){
    			$('input[widgetype=snInput]').val(brNo + '-' + brItemNo + '-' + serNo);//分部编号(分部2-子分部2-顺序号3)
    			$('input[widgetype=snInput]').attr('prefVal', brNo + '-' + brItemNo + '-');
    		}else if(snType == 'brdatasn'){
    			var dataNo = $('#dataNo').val();
    			$('input[widgetype=snInput]').val(brNo + '-' + brItemNo + '-' + dataNo+ '-' + serNo);//分部2-子分部2-资料类别2,3（自定义）-顺序号
    			$('input[widgetype=snInput]').attr('prefVal', brNo+ '-' + brItemNo+ '-' + dataNo + '-');
    		}else if(snType == 'brprojsn'){
    			var brProjNo = $('#brProjNo').val();
    			var dataNo = $('#dataNo').val();
    			$('input[widgetype=snInput]').val(brProjNo+ '-' + dataNo + '-' + brNo + '-' + serNo);//工程项目代码（自定义）-类别代码2,3-分部代码2-顺序号3
    			$('input[widgetype=snInput]').attr('prefVal', brProjNo+ '-' + dataNo+ '-' + brNo + '-');
    		}
    	}
    	closeDlg();
    }
    
    //重置br编号
    function resetBrNo(){
    	closeDlg();
    	var serNo = $('input[widgetype=snInput]').attr('serNo');
    	if(serNo){
    		$('input[widgetype=snInput]').val(serNo);
    		$('input[widgetype=snInput]').removeAttr('prefVal');
    	}
    }
    
    //分部子分部分项初始化
 	//#######################################
 	function initSecData(){
 		$('div[widgetype=sec],div[widgetype=subsec],div[widgetype=item]').each(function(){
 			var value = $(this).attr('value');
 			if(value){
 				$(this).html(value);
 			}
 		});
 	}
 	
 	//汇总模块
	//#######################################
 	/**
     * 处理汇总的数据
     * @param 
     * @return 
     */
    function handleSumData(){
    	var sum_Ids = param.sum_Ids;
    	var isGroup = $('div[widgetype=timesoftest]').length > 0 ? true : false;
    	if(sum_Ids){
	    	var result = false;
			var json = {};
			json.sum_Ids = sum_Ids;
			json.isGroup = isGroup;	//是否按照'子分部'分组汇总
			json = JSON.stringify(json);
			var url = "/preform_getFileDetail";
			$.ajax({ 
		 		type: 'POST', 
		 		contentType: 'application/json;charset=utf-8', 
		 		url:  url, 
		 		data: json, 
		 		async: false, 
		 		dataType : 'json', 
		 		success : function(data) { 
		         	if(data.body){
		         		setSumData(data.body.fileDetail,isGroup);
		         	} 
		 		}, 
		 		error : function(){  
		 		  layer.alert('操作失败!'); 
		 		}	 
		 	}); 
    	}
    }
    
     /**
     * 设置汇总的数据
     * @param 
     * @return 
     */
    function setSumData(fileDetails,isGroup){
   		if(!fileDetails){
			return;
		}    	
		//单个汇总
		if(!isGroup){
	    	var titleArray = new Array();	//检验批名称
			var unitNumArray = new Array();	//检验批容量
			var unitArray = new Array();	//单位工程
			var secArray = new Array();		//分部
			var subsecArray = new Array();	//子分部
			var itemArray = new Array();	//分项
			var partArray = new Array();	//部位
			
			for(var i = 0; i < fileDetails.length; i++){
				var fileDetail = fileDetails[i];
				titleArray.push(fileDetail.title?fileDetail.title:'');
				unitNumArray.push(fileDetail.unitNum?fileDetail.unitNum:'');
				unitArray.push(fileDetail.unit?fileDetail.unit:'');
				secArray.push(fileDetail.sec?fileDetail.sec:'');
				subsecArray.push(fileDetail.subsec?fileDetail.subsec:'');
				itemArray.push(fileDetail.item?fileDetail.item:'');
				partArray.push(fileDetail.part?fileDetail.part:'');
			}
			forEachSumData(titleArray,'sumtitle');
			forEachSumData(unitNumArray,'sumunitnum');
			forEachSumData(unitArray,'sumunit');
			forEachSumData(secArray,'sumsec');
			forEachSumData(subsecArray,'sumsubsec');
			forEachSumData(itemArray,'sumitem');
			forEachSumData(partArray,'sumpart');
			
			//检验批数量
			$("div[widgeType=numoftest][contenteditable=true]").html(titleArray.length);
		}else{
			//按照子分部分组汇总
			var subsecArray = new Array();		//子分部
			var itemArray = new Array();		//分项
			var timesOfTestArray = new Array();	//检验批次数
			for(var i = 0; i < fileDetails.length; i++){
				var fileDetail = fileDetails[i];
				subsecArray.push(fileDetail.subsec?fileDetail.subsec:'');
				itemArray.push(fileDetail.item?fileDetail.item:'');
				timesOfTestArray.push(fileDetail.timesOfTest?fileDetail.timesOfTest:'');
			}
			
			forEachSumData(subsecArray,'sumsubsec');
			forEachSumData(itemArray,'sumitem');
			forEachSumData(timesOfTestArray,'timesoftest');
		}
    }
    
     /**
     * 循环设置汇总的数据
     * @param data 数据数组  widgeType 控件名
     * @return  
     */
    function forEachSumData(data,widgeType){
    	$('div[widgetype=' + widgeType + ']').each(function(index){
    		if(data.length > index){
    			$(this).html(data[index]);
    		}
    	});
    }

     /**
     * 加载参数传递的分部数据
     * @param
     * @return  
     */
	function loadSecData(){
		var unit = param.unit ? param.unit : '';		//单位工程
		var sec = param.sec ? param.sec : '';			//分部
		var subsec = param.subsec ? param.subsec : '';	//子分部
		var item = param.item ? param.item : '';		//分项
		var part = param.part ? param.part : '';		//部位
		
		unit && $("div[widgeType=unit][contenteditable=true]").html(unit);
		sec && $("div[widgeType=sec][contenteditable=true]").html(sec);
		subsec && $("div[widgeType=subsec][contenteditable=true]").html(subsec);
		item && $("div[widgeType=item][contenteditable=true]").html(item);
		part && $("div[widgeType=part][contenteditable=true]").html(part);
		
		var numOfSubSecSet = {};	//子分部set
		var numOfItemSet = {};		//分项set
		var numOfPartSet = {};		//部位set
		$("div[widgeType=sumsubsec][contenteditable=true]").each(function (){
			var value = getDivValue($(this));
			if(value != ''){
				numOfSubSecSet[value] = 1;
			}
		});
		
		$("div[widgeType=sumitem][contenteditable=true]").each(function (){
			var value = getDivValue($(this));
			if(value != ''){
				numOfItemSet[value] = 1;
			}
		});
		$("div[widgeType=numofitem][contenteditable=true]").each(function (){
			var value = getDivValue($(this));
			if(value != ''){
				numOfItemSet[value] = 1;
			}
		});
		$("div[widgeType=sumpart][contenteditable=true]").each(function (){
			var value = getDivValue($(this));
			if(value != ''){
				numOfSubSecSet[value] = 1;
			}
		});
		
		$("div[widgeType=numofsubsec][contenteditable=true]").html(_.keys(numOfSubSecSet).length);	//子分部数量
		$("div[widgeType=numofitem][contenteditable=true]").html( _.keys(numOfItemSet).length);		//分项数量
		$("div[widgeType=numofpart][contenteditable=true]").html( _.keys(numOfPartSet).length);		//部位数量
		
		//设置分部子分部部位标题
		var attrStr = '|text3|unit|sec|subsec|item|part|';
		$("div[widgeType='title']").each(function(){	
			var attr = $(this).attr('attr');
			if(param[attr] && attrStr.indexOf('|' + attr + '|') != -1){
				$(this).html(param[attr]);
			}
		});
		
		//自动设置加载分部子分部分项编号
		if(param.secsn){
			$('input[widgetype=snInput]').val(param.secsn);
		}
	}
	//返回值 下拉框改变事件
	function onchangeSel(s){
		var attrText = $(s).find("option:selected").text();
		var attrVal = $(s).find("option:selected").attr("attrval");
		var attrId = $(s).attr("id");
		$("#attr_"+attrId).html(attrText);
		$("#attr_"+attrId+"val").html(attrVal);
	}

    