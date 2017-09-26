package com.dotoyo.dsformweb.common;

import java.io.File;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;

import com.dotoyo.dsform.interf.ITfFrameMessageService;
import com.dotoyo.dsform.model.MessageBo;
import com.dotoyo.dsform.util.PreformConfig;
import com.dotoyo.dsform.util.StringsUtils;

import net.sf.json.JSONObject;

public class PreformUtilsNew {
	
//	@Resource(name = "formTfFrameMessageService_form")	
//	public ITfFrameMessageService  iTfFrameMessageService;
	
	public static String getVirtualPath(Map<String, String> map) throws Exception{
		String formType = map.get("formType");
		Map<String,String> param = new HashMap<String, String>(); 
		if(StringsUtils.isEmpty(formType)){
			param.put("value","formType");
//			throw new FrameException("3000000000000052",param);
			throw new Exception();
		}
		StringBuilder sb = new StringBuilder();
		//系统表单
		if("sys".equals(formType)){
			String orgType = map.get("orgType");
			String rootId = map.get("rootId");
			
			checkNull(orgType,"orgType");
			checkNull(rootId,"rootId");
			
			
			//   /sys/单位类型(yz)/目录id/文件模版id
			sb.append(File.separator).append("sys").append(File.separator)
				.append(orgType).append(File.separator).append(rootId).append(File.separator);
		}else if("cusEnt".equals(formType)){
			String cityId = map.get("cityId");
			String entId = map.get("entId");
			
			checkNull(cityId,"cityId");
			checkNull(entId,"entId");
			
			
			// /custom/城市id/企业id/ent/文件模版id
			sb.append(File.separator).append("custom").append(File.separator).append(cityId)
				.append(File.separator).append(entId).append(File.separator).append("ent").append(File.separator);
		}else if("cusOrg".equals(formType)){
			String cityId = map.get("cityId");
			String entId = map.get("entId");
			String orgId = map.get("orgId");
			
			checkNull(cityId,"cityId");
			checkNull(entId,"entId");
			checkNull(orgId,"orgId");
			
			// /custom/城市id/企业id/机构id/文件模版id
			sb.append(File.separator).append("custom").append(File.separator).append(cityId)
				.append(File.separator).append(entId).append(File.separator).append(orgId).append(File.separator);
		}else{
			param.put("value","formType");
//			throw new FrameException("3000000000000052",param);
			throw new Exception();
		}
		return sb.toString();
	}
	
	private static void checkNull(String value,String name) throws Exception{
		 if(StringsUtils.isEmpty(value)){
			 Map<String,String> param = new HashMap<String, String>(); 
			 param.put("value",name);
//			 throw new FrameException("3000000000000052",param);
			 throw new Exception();
		}
	}
	
	/**
	 * 将request中的参数转为json
	 * @param httpRequest
	 * @return
	 */
	public static String converURLParam(String key) {
		JSONObject jsonObject = new JSONObject(); 
		if(StringUtils.isNotEmpty(key)){
			jsonObject.put("key", key);
		}
		return jsonObject.toString();
	}

	public static Map<String, String> putRequestParam(String formType, String orgType, String rootId, String cityId,
			String entId, String orgId, String oldId){
		Map<String,String> map = new HashMap<String, String>();
		if(StringUtils.isNotEmpty(formType)){
			map.put("formType", formType);
		}
		if(StringUtils.isNotEmpty(orgType)){
			map.put("orgType", orgType);
		}
		if(StringUtils.isNotEmpty(rootId)){
			map.put("rootId", rootId);
		}
		if(StringUtils.isNotEmpty(cityId)){
			map.put("cityId", cityId);
		}
		if(StringUtils.isNotEmpty(entId)){
			map.put("entId", entId);
		}
		if(StringUtils.isNotEmpty(orgId)){
			map.put("orgId", orgId);
		}
		if(StringUtils.isNotEmpty(orgId)){
			map.put("orgId", orgId);
		}
		
		return map;
	}
	
	/**
	 * 跨域上传成功后,回调parent的方法(请求成功后,提示用户)
	 * @param httpRequest
	 * @param response
	 * @param json
	 * @throws Exception
	 */
	@Autowired
	public static void successResponse(HttpServletRequest httpRequest,HttpServletResponse response, JSONObject json) throws Exception {
		String crossDomain = httpRequest.getParameter("crossDomain");
		//跨域请求
		if("true".equals(crossDomain)){
			String domain = PreformConfig.getInstance().getConfig(PreformConfig.DOMAIN);//10333.com
//			IFrameMessage msgF = FrameFactory.getMessageFactory(null);
			MessageBo bo = new MessageBo();
			bo.setRespType("json");
			@SuppressWarnings("unchecked")
//			String str = IFrameMessage.getRespMessage(bo, json);
			String str = FrameMessage.getRespMessage(bo, json);
			str = String.format("<html><head><script type='text/javascript'>document.domain='%s';</script><script>" + "window.onload = function(){parent.successCallback('%s');", domain , str )
			+ "}</script></head><body></body></html>";  
			PrintWriter pw = null;
			try {
				pw = response.getWriter();
				pw.print(str);
				pw.flush();
			} finally {
				if (pw != null) {
					pw.close();
				}
			}
		}else{
			WebUtils.getInstance().responseJsonSuccess(response, json);
		}
	}
	
	/**
	 * 跳转到错误页面
	 * @param httpResponse http请求
	 * @param content 显示信息
	 * @param hiddenErrorInfo 隐藏的错误信息
	 * @throws Exception
	 */
	public static void toErrorPage(HttpServletResponse httpResponse,String content,String hiddenErrorInfo) throws Exception {
		PrintWriter pw = httpResponse.getWriter();
		String prefixPath = PreformConfig.getInstance().getConfig(PreformConfig.DS_PATH);// domain
		String imgPath = String.format("%s/js/easyui/themes/icons/tip_warning28.png", prefixPath);
		String hiddenInput = String.format("<input id='errorInfo' type='hidden' value='%s'/>", hiddenErrorInfo);
		
		String domain = PreformConfig.getInstance().getConfig(PreformConfig.DOMAIN);//10333.com
		String domainContent = String.format("<SCRIPT type='text/javascript'>document.domain='%s';</SCRIPT>",domain);
		try {
			pw.write(String.format("<html><head><meta http-equiv='Content-Type' content='text/html; charset=utf-8' />%s</head>"
					+ "<body><div style=' background:#ffe; border:1px solid #fea; color:#ff9b00; height:68px; padding-left:20px; line-height:68px;'>"
					+ "<img src='%s' style='vertical-align:middle; width:28px; height:28px;'/>%s</div> %s</body></html>",
					domainContent, imgPath, content, hiddenInput));
		} finally {
			if (pw != null) {
				pw.close();
			}
		}
	}
}
