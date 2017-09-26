package com.dotoyo.dsformweb.ctrl;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.dotoyo.dsform.constant.PreformConstant;
import com.dotoyo.dsform.interf.IFormTmplService;
import com.dotoyo.dsform.util.StringsUtils;
import com.dotoyo.dsformweb.common.PreformSecuryCheck;
import com.dotoyo.dsformweb.common.PreformUtilsNew;
import com.mongodb.DBObject;

import net.sf.json.JSONObject;

@Controller
@RequestMapping("/preformSys")
public class TfPreformSysController {
		
	@Resource(name = "formFormTmplService_form")
	public IFormTmplService tfPreformService;

	@RequestMapping("/viewPreform")
	public void viewPreform(HttpServletRequest httpRequest,
			HttpServletResponse httpResponse) throws Exception {
		httpResponse.setHeader("Access-Control-Allow-Origin", "*");
		httpResponse.setCharacterEncoding("utf-8");
		httpResponse.setContentType("text/html;charset=utf-8");
		
		String sign =  httpRequest.getParameter("sign");
		String creditSys =  httpRequest.getParameter("creditSys");//诚信平台需要替换domain
		String type = httpRequest.getParameter("type");//预览类型  edit,view
		String orgId = httpRequest.getParameter("orgId");//机构id 
		String _id = httpRequest.getParameter("_id");//文件实例id
		String test =  httpRequest.getParameter("test");//本地需要去掉domain
		String id = httpRequest.getParameter("id");// 文件模板id
		String heightType = httpRequest.getParameter("heightType");// 文件模板id
		String type2 = httpRequest.getParameter("type2");// 文件模板id
		
		File file = null;
		DBObject dbObject = null;
		try {
			PreformSecuryCheck secChk = new PreformSecuryCheck();
			boolean result = secChk.securyCheck(httpRequest, httpResponse);
			if(result){
				file = tfPreformService.viewPreform2(sign, id, _id, type, heightType, type2, creditSys, orgId, test);
			}			
			if (!StringsUtils.isEmpty(_id) && !"undefined".equals(_id)) {
				dbObject = tfPreformService.findMongoDataById(_id);
			}
			
			responsePrint4Html(httpRequest, httpResponse, dbObject, file);
		} catch (Exception e2) {
			//return e2.getMessage();
		}
	}
	
	/**
	 * response输出html文件
	 * @param httpRequest
	 * @param httpResponse
	 * @param result 文件实例数据
	 * @param file 文件
	 * @throws IOException
	 * @throws FileNotFoundException
	 * @throws UnsupportedEncodingException
s	 * @throws Exception
	 */
	private void responsePrint4Html(HttpServletRequest httpRequest,
			HttpServletResponse httpResponse, DBObject dbObject,  File file)
			throws IOException, FileNotFoundException,
			UnsupportedEncodingException, Exception {
		String sign =  httpRequest.getParameter("sign");
		String creditSys =  httpRequest.getParameter("creditSys");//诚信平台需要替换domain
		String type = httpRequest.getParameter("type");//预览类型  edit,view
		String orgId = httpRequest.getParameter("orgId");//机构id 
		String _id = httpRequest.getParameter("_id");//文件实例id
		String test =  httpRequest.getParameter("test");//本地需要去掉domain
		String id = httpRequest.getParameter("id");// 文件模板id
		String heightType = httpRequest.getParameter("heightType");// 文件模板id
		String type2 = httpRequest.getParameter("type2");// 文件模板id
		
		FileInputStream fs = null;
		BufferedReader br = null;
		InputStreamReader ir = null;
		
		StringBuilder sb = new StringBuilder("");
		PrintWriter pw = httpResponse.getWriter();
		try {
			fs = new FileInputStream(file);
			ir = new InputStreamReader(fs, "utf-8");
			br = new BufferedReader(ir);
			String str = "";
			while ((str = br.readLine()) != null) {
				sb.append(str);
				//##########换行方便查看
				sb.append("\r\n");
			}
			
			String htmlStr = "";
			String paramValue = PreformUtilsNew.converURLParam("key");
			if ("edit".equals(type)) {
				htmlStr = handleFlow(_id, orgId, sb.toString(), dbObject);
			} else {
				htmlStr = sb.toString();
			}
			//设置前台传递的参数
			htmlStr = setParamValue(htmlStr, paramValue);
			//处理诚信平台domain
			if("1".equals(creditSys)){
				htmlStr = replaceDomain(htmlStr, PreformConstant.CRED_DOMAIN);//CRED_DOMAIN 为诚信平台domain
			}
			//处理本地测试的情况
			if("localhost".equals(test)){
				htmlStr = handleLocalTest(htmlStr);
			}
			pw.print(htmlStr);
		}catch (Exception e) {
				e.printStackTrace();
		} finally {
			if (br != null) {
				br.close();
			}
			if (ir != null) {
				ir.close();
			}			
			if (fs != null) {
				fs.close();
			}
			if (pw != null) {
				pw.close();
			}
		}
	}

	/**
	 * 将传递的参数值保存在隐藏域
	 * @param html
	 * @param paramValue
	 * @return
	 */
	private String setParamValue(String html, String paramValue) {
		JSONObject jsonObject = JSONObject.fromObject(paramValue);
		html = html.replace("<input id='paramValue' name='paramValue' type='hidden'>", 
				String.format("<input id='paramValue' name='paramValue' type='hidden' value='%s'>",jsonObject.toString()));
		return html;
	}

	/**
	 * 处理文件流转
	 * 解决问题:
	 * 		输入控件有值且不属于当前机构,表明当前机构对此输入的数据没有修改权限,那么将此输入控件转变为只可预览
	 * @param _id
	 * @param orgId
	 * @param html
	 * @param result
	 * @return 
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	private String handleFlow(String _id, String orgId, String html,
			DBObject result) throws Exception {
		if (StringsUtils.isEmpty(_id)) {
			return html;
		}
		List<String> orgValue = null;
		if (!StringsUtils.isEmpty(orgId) && result.get(orgId) != null) {
			orgValue = (List<String>) result.get(orgId);
		}
		Pattern pattern = Pattern.compile("^A\\d*$");// 判断是否是 A0 A1 A2 A3
		List<String> list = new ArrayList<String>();
		for (String dkey : result.keySet()) {
			boolean flag = pattern.matcher(dkey).matches();
			if(!flag){
				continue;
			}
			// 这里判断当前orgId是否有权限
			if (orgValue != null) {//orgValue 是当前org所拥有的控件
				if (!orgValue.contains(dkey)) {
					list.add(dkey);
				}
			}else{
				list.add(dkey);
			}
		}
		html = editConver2View(html, list);
		return html;
	}
	
	/**
	 * 替换domain
	 * @param htmlStr http响应body
	 * @param expectDomain 期望的domain
	 * @return
	 */
	private String replaceDomain(String htmlStr, String expectDomain) {
		int startIndex = htmlStr.indexOf("<SCRIPT type='text/javascript'>document.domain=");
		int endQuote = htmlStr.indexOf("</SCRIPT>", startIndex);
		if(startIndex == -1){
			return htmlStr;
		}
		String oldDomain = htmlStr.substring(startIndex, endQuote + 9);
		htmlStr = htmlStr.replace(oldDomain, expectDomain);
		return htmlStr;
	}
	
	/**
	 * 将指定的可编辑控件转换为预览控件
	 * @param html
	 * @param list
	 * @return
	 */
	private String editConver2View(String html, List<String> list) {
		for (String inputId : list) {
			String textStr = String.format(
					"<input id='%s' name='%s' type='text'", inputId, inputId); //<input id='A0' name='A0' type='text'
																				
			String textAreaStr = String.format(
			"<div id='%s' name='%s' class='area-edit' isTextarea='true' contenteditable='true' showmenu='true'",
					inputId, inputId); //<textarea id='A0' name='A0'
																				
			String editorStr = String .format( "<div id='%s' name='%s' isEditor='true' contenteditable='true'",
					inputId, inputId); //<div id='A0' name='A0'
			
			String chkStr = String.format(
					"<input id='%s' name='%s' type='checkbox' alias='", inputId, inputId); //<input id='A0' name='A0' type='checkbox'
			
			String orgProStr = String.format("<div id='%s' name='%s' widgeType=", inputId, inputId); //所有div
			
			//处理参建方控件的下拉框
			String selectStr = String.format("<select id='%ss' name='%ss'", inputId, inputId);
			
			int inputStart = -1;
			
			if ((inputStart = html.indexOf(textStr)) != -1) {// 处理input
				int inputEnd = html.indexOf(">", inputStart);
				String inputHtml = html.substring(inputStart, inputEnd + 1);
				String spanHtml = inputHtml.replace("<input", "<span").replace(
						"/>", "></span>").replace("border", "noborder");
				//特殊控件处理
				spanHtml = spanHtml.replace("ondblclick=\"dblclickEvent",
						"ondblclick1=\"dblclickEvent");
				//背景色处理
				spanHtml =spanHtml.replace("background-color","background-color1");
				html = html.replace(inputHtml, spanHtml);
			} else if ((inputStart = html.indexOf(textAreaStr)) != -1) {// 处理多行输入框
				String strEnd="contenteditable='true' showmenu='true'";
				String replaceStrEnd="contenteditable='false' showmenu='false'";
				int inputEnd = html.indexOf(strEnd, inputStart);
				String inputHtml = html.substring(inputStart, inputEnd + strEnd.length());
				String spanHtml = inputHtml.replace(strEnd, replaceStrEnd);
				html = html.replace(inputHtml, spanHtml);
			} else if ((inputStart = html.indexOf(editorStr)) != -1) {// 处理编辑器
				String newEditorStr = String.format("<div id='%s' name='%s' isEditor='true' ", inputId,inputId);
				html = html.replace(editorStr, newEditorStr);
			} else if((inputStart = html.indexOf(chkStr)) != -1){//处理单选框
				String str = html.substring(inputStart);
				String alias =  str.substring(str.indexOf("alias='") + 7, str.indexOf("' enabled='enabled'"));
				if(!StringUtils.isEmpty(alias)){
					html = html.replaceAll(String.format("type='checkbox' alias='%s' enabled='enabled'", alias), String.format("type='checkbox' alias='%s' disabled='disabled'", alias));
				}
			}else if ((inputStart = html.indexOf(orgProStr)) != -1) {// 处理当前项目和机构
				String strEnd="contenteditable='true'";
				String replaceStrEnd="contenteditable='false'";
				html = html.replace( String.format("border: 1px solid #ccc;overflow: hidden;'><div id='%s' name='%s'", inputId, inputId) , 
						String.format("border: 0px solid #ccc;overflow: hidden;'><div id='%s' name='%s'", inputId, inputId));
				int inputEnd = html.indexOf(strEnd, inputStart);
				if(inputEnd == -1){
					break;//当contenteditable处理完毕,中断循环
				}
				
				//判断contenteditable 是否为false
				int curConEdtIndex = html.indexOf("contenteditable='",inputStart);
				String curConEdt = html.substring(curConEdtIndex + 17 , curConEdtIndex + 17 + 5);//18为"contenteditable='"的长度,5为"false"长度
				if(curConEdt.startsWith("false")){
					continue;//当contenteditable='false'跳出本次循环
				}
				
				String inputHtml = html.substring(inputStart, inputEnd + strEnd.length());
				String spanHtml = inputHtml.replace(strEnd, replaceStrEnd);
				html = html.replace(inputHtml, spanHtml);
			}
			
			//处理参建方控件的样式
			if((inputStart = html.indexOf(selectStr)) != -1){
				int divStart = html.lastIndexOf("<div class='ptcp-div' ", inputStart);
				int divEnd = html.indexOf("</div>", divStart);
				String divStr = html.substring(divStart, divEnd + 6);
				int spanStart = divStr.indexOf("<span");
				int spanEnd = divStr.indexOf("></span>",spanStart);
				String spanStr = divStr.substring(spanStart, spanEnd + 8);
				spanStr = spanStr.replace("onpropertychange", "onpropertychange1").replace("oninput", "oninput1")
					.replace("ptcp-input", "ptcp-input1");
				html = html.replace(divStr, spanStr);
			}
		}
		return html;
	}
	
	/**
	 * 处理本地测试的情况
	 * 1.去掉domain.
	 * 2.增加 保存按钮.
	 * @param rlsStr
	 * @param newDomain
	 * @return
	 */
	private String handleLocalTest(String rlsStr) {
		rlsStr = replaceDomain(rlsStr,"");
		rlsStr = addSaveBtn(rlsStr);
		return rlsStr;
	}
	
	/**
	 * 测试环境增加保存按钮
	 * @param htmlStr html页面
	 * @return
	 */
	private String addSaveBtn(String htmlStr) {
		int bodyEndIndex = htmlStr.indexOf("<!--endprint1-->");
		if(bodyEndIndex == -1){
			return htmlStr;
		}
		htmlStr = htmlStr.replace("<!--endprint1-->", "<!--endprint1-->" + 
				"<div id='dlg-buttons' style='margin-bottom: 5px;margin-left: 5cm;margin-top: 20px;'><input type='submit' value='保存' onclick='saveData();   '/> </div>" + 
				"<div id='dlg-buttons' style='margin-bottom: 5px;margin-left: 5cm;margin-top: 20px;'><input type='submit' value='预览' onclick='viewPreform();'/> </div>");
		return htmlStr;
	}

}
