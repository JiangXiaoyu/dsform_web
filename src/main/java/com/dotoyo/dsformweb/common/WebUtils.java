package com.dotoyo.dsformweb.common;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.Reader;
import java.net.URLDecoder;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.dotoyo.dsform.interf.ITfFrameMessageService;
import com.dotoyo.dsform.interf.ITfPreformService;
import com.dotoyo.dsform.model.MessageBo;
import com.dotoyo.dsformweb.log.IFrameLog;
import com.dotoyo.dsformweb.log.LogProxy;

import net.sf.json.JSONObject;

/**
 * 
 * @author xieshh
 * 
 */
@Controller
public class WebUtils {
	protected static final transient IFrameLog log = new LogProxy(
			LogFactory.getLog(WebUtils.class));
  
	private static WebUtils webUtils;
	@Autowired
	@Resource(name = "formTfFrameMessageService_form")	
	public ITfFrameMessageService  iTfFrameMessageService;
	
	@Resource(name = "formTfPreformService_form")
	public ITfPreformService iTfpreformService;

	private WebUtils() {

	}
	 
	public static WebUtils getInstance(){
		if(webUtils == null){
			webUtils = new WebUtils();
		}		
		return webUtils;
	}
	

	/**
	 * 处理成功返回客户端
	 * 
	 * @param response
	 * @param bo
	 * @throws Exception
	 */
	public void responseJsonSuccess(HttpServletResponse response,
			JSONObject json) throws Exception {
		// response.setCharacterEncoding("UTF-8");	
		
		String str = iTfFrameMessageService.getRespMessage(json);
		log.debug(str);
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
	}
	
	/**
	 * 把错误返回客户端
	 * 
	 * @param response
	 * @param bo
	 * @throws Exception
	 */
	public void responseJsonError(HttpServletResponse response,
			Throwable e) throws Exception {
//		IFrameMessage msgF = FrameFactory.getMessageFactory(null);
		MessageBo bo = new MessageBo();
		bo.setRespType("json");
//		@SuppressWarnings("unchecked")
//		String str = msgF.getRespMessage(bo, e);
		String str = iTfFrameMessageService.getRespMessage(bo, e);
//		log.debug(str);
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
	}
	
	/**
	 * 
	 * 取得从请求中取JSON参数,不做xss检查（此方法只给 编辑器使用）
	 * 
	 * @param httpRequest
	 * @return
	 */
	public static JSONObject getJsonFrameRequest4Ckeditor(HttpServletRequest httpRequest)
			throws Exception {

		//
		InputStream inputStream = null;
		Reader reader = null;
		BufferedReader bufferedReader = null;
		StringBuffer sb = new StringBuffer();
		try {
			inputStream = httpRequest.getInputStream();
			reader = new InputStreamReader(inputStream);
			bufferedReader = new BufferedReader(reader);
			String str = null;

			while ((str = bufferedReader.readLine()) != null) {
				sb.append(str);
			}
		} finally {
			if (bufferedReader != null) {
				try {
					bufferedReader.close();
				} catch (Exception e) {

				}
			}
			if (reader != null) {
				try {
					reader.close();
				} catch (Exception e) {

				}
			}
			if (inputStream != null) {
				try {
					inputStream.close();
				} catch (Exception e) {

				}
			}
		}

		if (sb.length() <= 0) {
			sb.append("{}");
		}
		String str = sb.toString();
		// str = URLDecoder.decode(URLDecoder.decode(str, "utf-8"), "utf-8");
		if (!"{}".equals(str)) {
			log.debug(str);
		}
		str = URLDecoder.decode(URLDecoder.decode(str.toString(), "utf-8"),"utf-8");
		log.debug("getJsonFrameRequest4Ckeditor str :" + str);
		JSONObject ret = JSONObject.fromObject(str);
		return ret;

	}
}
