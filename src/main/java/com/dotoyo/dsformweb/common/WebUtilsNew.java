package com.dotoyo.dsformweb.common;

import java.sql.Timestamp;
import java.util.Date;

import com.dotoyo.dsform.model.IModel;
//import com.dotoyo.frame.json.processor.JsonDateValue2StringProcessor;
//import com.dotoyo.frame.json.processor.JsonTimeValue2StringProcessor;

import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;

public class WebUtilsNew {
	
	/**
	 * 
	 * 取得JSON中取模型
	 * 
	 * @param JSONObject
	 * @return
	 */
	public static JSONObject modelToJson(IModel model) throws Exception {

		JsonConfig cfg = new JsonConfig();
		JsonDateValue2StringProcessor pro = new JsonDateValue2StringProcessor();
		cfg.registerJsonValueProcessor(Date.class, pro);
		JsonTimeValue2StringProcessor timePro = new JsonTimeValue2StringProcessor();
		cfg.registerJsonValueProcessor(Timestamp.class, timePro);

		JSONObject ret = JSONObject.fromObject(model, cfg);

		return ret;
	}
	
	

}
