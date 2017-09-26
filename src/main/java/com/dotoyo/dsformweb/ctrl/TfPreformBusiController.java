package com.dotoyo.dsformweb.ctrl;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadBase.InvalidContentTypeException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.dotoyo.dsform.interf.ITfFrameMessageService;
import com.dotoyo.dsform.interf.ITfPreformService;
import com.dotoyo.dsform.model.AnnexModel;
import com.dotoyo.dsform.model.MessageBo;
import com.dotoyo.dsform.model.TfPreformModel;
import com.dotoyo.dsform.util.PreformConfig;
import com.dotoyo.dsform.util.StringsUtils;
import com.dotoyo.dsformweb.common.FrameMessage;
import com.dotoyo.dsformweb.common.PreformUtilsNew;

import net.sf.json.JSONObject;

@Controller
@RequestMapping("/preformBusi")
public class TfPreformBusiController {
	
//	protected static final transient IFrameLog log = new LogProxy(
//			LogFactory.getLog(TfPreformBusiController.class));

	private static final String tempPath = "temp/annex/";
	
	@Resource(name = "formTfPreformService_form")
	public ITfPreformService iTfpreformService;
	
	@Resource(name = "formTfFrameMessageService_form")	
	public ITfFrameMessageService  iTfFrameMessageService;

	
	/**
	 * 保存预定义表单
	 * 
	 * @param httpRequest
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/savePreform")
	public String savePreform(@RequestParam(value="filename") MultipartFile attach, HttpServletRequest httpRequest,
			HttpServletResponse response) throws Exception {
		//@RequestParam(value="filename") MultipartFile attach, 
		//上传文件start
//				String realpath = httpRequest.getSession().getServletContext().getRealPath("/upload/resources/tmp"); //文件上传到的目录
//				File fs = new File(realpath+"/" + UUID.randomUUID() + ".xls"); //重新命名上传的文件
//				FileUtils.copyInputStreamToFile(attach.getInputStream(),fs);
//		BufferedReader in=new BufferedReader(new InputStreamReader(httpRequest.getInputStream()));
//	    StringBuilder sb = new StringBuilder();   
//	    String line = null;  
//        while ((line = in.readLine()) != null) {   
//        	 sb.append(line);   
//        }
//        System.out.println("fileStream:" + sb);
        
		try {
			response.setCharacterEncoding("utf-8");
			response.setContentType("text/html;charset=utf-8");
			response.setHeader("Access-Control-Allow-Origin", "*");// 以后修改，这里有安全问题
			String id = httpRequest.getParameter("oldId");//这里加old 是为了解决 更新时候，多页模版和普通模版的问题。
			
			TfPreformModel model = new TfPreformModel();
			if (StringsUtils.isEmpty(id)) {
				save4Normal(attach, httpRequest, response);
			} else {
				model.setId(id);
				model = iTfpreformService.selectByPrimaryKey(model);
				if(model == null){
					save4Normal(attach, httpRequest, response);//model为空，当做单页模板来处理
				}else if ("multipage".equals(model.getNote())) {
					save4Multipage(httpRequest, response);
				} else {
					save4Normal(attach, httpRequest, response);
				}
			}
		} catch (InvalidContentTypeException e){
//			//			log.error("", e);
//			PreformUtils.errorResponse(httpRequest,response, new FrameException("3000000000000051",null));
		} catch (Exception e) {
//			//			log.error("", e);
			System.out.println(e.getMessage());
//			PreformUtils.errorResponse(httpRequest,response, e);
		}
		ModelAndView mv = new ModelAndView();
		return "";
	}
	
	private void save4Normal(MultipartFile attach, HttpServletRequest httpRequest,
			HttpServletResponse response) throws Exception {
		Map<String, String> valueForm = new HashMap<String, String>();// 保存普通表单的值
//		PreformUtils.putRequestParam(httpRequest, valueForm);
		String formType =  httpRequest.getParameter("formType");
		String orgType =  httpRequest.getParameter("orgType");
		String rootId =  httpRequest.getParameter("rootId");
		String oldId =  httpRequest.getParameter("oldId");
		valueForm = PreformUtilsNew.putRequestParam(formType, orgType, rootId, "", "", "", oldId);
		AnnexModel annexModel = this.uploadFile4Normal(attach, httpRequest, valueForm);//上传Excel文件
		valueForm.put("note", "normal");// 与批量保存区别开来

		String id = iTfpreformService.savePreform(annexModel, valueForm);//解析并保存表单
		JSONObject json = new JSONObject();
		json.put("id", id);
//		PreformUtilsNew.successResponse(httpRequest, response, json);
		this.successResponse(httpRequest, response, json);
	}
	

	/**
	 * 跨域上传成功后,回调parent的方法(请求成功后,提示用户)
	 * @param httpRequest
	 * @param response
	 * @param json
	 * @throws Exception
	 */
	public void successResponse(HttpServletRequest httpRequest,HttpServletResponse response, JSONObject json) throws Exception {
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
			responseJsonSuccess(response, json);
		}
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
	
	//这个方法提取出来， saveNormal也在使用
	private void save4Multipage(HttpServletRequest httpRequest,
			HttpServletResponse response) throws Exception {
		Map<String, String> result = parseParam4Map(httpRequest);// 把zip保存在临时目录，用来解压后解析Excel，解析完删除(以前是ZIP，现在时多个sheet的Excel)
		result.put("note", "multipage");// 多页
//		PreformUtilsNew.putRequestParam(httpRequest, result);

		String id = this.saveMultipage(result);
		JSONObject json = new JSONObject();
		json.put("id", id);
		PreformUtilsNew.successResponse(httpRequest, response, json);
	}

	/**
	 * excel上传到FTP服务器（普通文件模版）
	 * @param httpRequest
	 * @param map
	 * @return
	 * @throws Exception
	 */
	public AnnexModel uploadFile4Normal(MultipartFile attach, HttpServletRequest httpRequest,
			Map<String, String> map) throws Exception {
			
		
		AnnexModel annexModel = new AnnexModel();
		// 查询上传路径 上传方式
		map.put("formcode", "TfPreform");
		map.put("curcode", "file");

//		IFrameAnnex frameAnnex = FrameFactory.getAnnexFactory(null);

		httpRequest.setCharacterEncoding("utf-8"); // 设置编码
		DiskFileItemFactory factory = new DiskFileItemFactory(); // 获得磁盘文件条目工厂
		File file = new File(tempPath);
		if (!file.exists()) {
			file.mkdirs();
		}
//		//设置暂时存放的 存储室 , 这个存储室，可以和 最终存储文件 的目录不同
//		factory.setRepository(file);
//		//设置缓存的大小，当上传文件的容量超过该缓存时，直接放到 暂时存储室
//		factory.setSizeThreshold(1024 * 1024);
//		ServletFileUpload upload = new ServletFileUpload(factory); //处理上传文件
//		@SuppressWarnings("unchecked")
//		List<FileItem> list = (List<FileItem>) upload.parseRequest(httpRequest); //可以上传多个文件
		
//		 String namet=httpRequest.getParameter("companyupdate");
		 Map<String, String[]> paramMap = httpRequest.getParameterMap();
		 
		
		httpRequest.getInputStream();
//		IFrameSequence sF = FrameFactory.getSequenceFactory(null);
//		annexModel.setId(sF.getSequence());
		annexModel.setId(iTfpreformService.getSeqId());
		
		
		for (Entry<String, String[]> entry : paramMap.entrySet()) { 
			String[] str = entry.getValue();
			if ("busiId".equals(entry.getKey()) && str.length > 0) {
				annexModel.setBusiId(str[0]);
			}
			if(str.length > 0){
				map.put(entry.getKey(), str[0]);
			}			
		}
		
		map.put("excelId",annexModel.getId());//让Excel 和 文件模版在同一目录下
		map.put("virtualPath",PreformUtilsNew.getVirtualPath(map));//让Excel 和 文件模版在同一目录下
		
		byte[] isNew = attach.getBytes();
		boolean flag = false;
		if(isNew != null){
			annexModel = iTfpreformService.uploadFrameAnnex(annexModel, isNew, map);
			this.upload(annexModel, attach.getInputStream(), map);
			flag = true;
		}		

		// 文件模版类型： fixed（固定高度） 和 auto(自适应高度), 默认固定高度
		if ("auto".equals(map.get("thisType"))) {

		} else {
			map.put("thisType", "fiexed");
		}
		// 更新模版文件时没有更新附件
		if (!flag) {
			return null;
		}
//		frameAnnex.commit(annexModel);
		iTfFrameMessageService.commit(annexModel);
		if (file.exists()) {
			file.delete();
		}
		return annexModel;
	}
	
	public void upload(AnnexModel bo, InputStream in, Map<String, String> map)
			throws Exception {
		OutputStream out = null;
		try {
			String path = bo.getPath();
			
			String virtualPath = map.get("virtualPath");
			String excelId = map.get("excelId");
			//文件模版特殊处理
			if(!StringsUtils.isEmpty(virtualPath) && !StringsUtils.isEmpty(excelId) ){
				path = path + virtualPath + excelId;
				createDir(path);
				out = new FileOutputStream(new File(path + File.separator
						+ bo.getId()));
				bo.setPath(path);
			}else{
				createDir(path);
				out = new FileOutputStream(new File(path + File.separator
						+ bo.getId()));
			}
			int length = 0;
			byte[] buf = new byte[1024];
			while ((length = in.read(buf)) != -1) {
				out.write(buf, 0, length);
			}
			out.flush();
		} finally {
			if (in != null) {
				in.close();
			}
			if (out != null) {
				out.close();
			}
		}

	}
	
	private void createDir(String destDirName) {

		String tDestDirName = destDirName;
		if (!tDestDirName.endsWith(File.separator)) {
			tDestDirName = String.format("%s%s", destDirName, File.separator);
		}
		File dir = new File(tDestDirName);
		if (!dir.exists()) {
			dir.mkdirs();
		}

	}
	
	/**
	 * 解析前台传递过来的参数，如果是二进制文件则解析
	 * 
	 * @param httpRequest
	 * @return
	 * @throws Exception
	 */
	private Map<String, String> parseParam4Map(HttpServletRequest httpRequest)
			throws Exception {
//		String id = FrameFactory.getSequenceFactory(null).getSequence();
		String id = iTfpreformService.getSeqId();
		Map<String, String> result = new HashMap<String, String>();

		httpRequest.setCharacterEncoding("utf-8"); // 设置编码
		DiskFileItemFactory factory = new DiskFileItemFactory(); // 获得磁盘文件条目工厂
		File file = new File(tempPath);
		if (!file.exists()) {
			file.mkdirs();
		}
		// 设置暂时存放的 存储室 , 这个存储室，可以和 最终存储文件 的目录不同
		factory.setRepository(file);
		// 设置 缓存的大小，当上传文件的容量超过该缓存时，直接放到 暂时存储室
		factory.setSizeThreshold(1024 * 1024);
		ServletFileUpload upload = new ServletFileUpload(factory); // 处理上传文件
		@SuppressWarnings("unchecked")
		List<FileItem> list = (List<FileItem>) upload.parseRequest(httpRequest); // 可以上传多个文件

		String time = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss")
				.format(new Date());
		result.put("time", time);
		String path = tempPath + id;
		for (FileItem item : list) {
			if (!item.isFormField()) {
				String filename = item.getName();
				result.put("fileName", filename);
				InputStream is = null;
				FileOutputStream fos = null;
				try {
					is = item.getInputStream();
					File f = new File(path);
					fos = new FileOutputStream(f);

					int length = 0;
					byte[] buf = new byte[1024];
					while ((length = is.read(buf)) != -1) {
						fos.write(buf, 0, length);
					}
				} catch (Exception e) {
					e.printStackTrace();
					throw e;
				} finally {
					if (is != null) {
						is.close();
					}
					if (fos != null) {
						fos.close();
					}
					if (file.exists()) {
						file.delete();
					}
				}
			}else{
				String name = item.getFieldName(); 
				String value = item.getString();
				result.put(name,value);
			}
		}
		// 文件模版类型： fixed（固定高度） 和 auto(自适应高度), 默认固定高度
		if ("auto".equals(result.get("thisType"))) {

		} else {
			result.put("thisType", "fiexed");
		}
		
		result.put("path", path);
		return result;
	}
	
	// Excel文件上传（多页模版）
	private String saveMultipage(Map<String, String> formValueMap)
			throws Exception {
		// 查询上传路径 上传方式
		formValueMap.put("formcode", "TfPreform");
		formValueMap.put("curcode", "file");

		String filePath = formValueMap.get("path");
		File file = new File(filePath);
//		IFrameAnnex frameAnnex = FrameFactory.getAnnexFactory(null);

		String name = formValueMap.get("fileName");
		InputStream is = null;
		AnnexModel annexModel = new AnnexModel();
		
//		IFrameSequence sF = FrameFactory.getSequenceFactory(null);
		
//		String seqId = iTfpreformService.getId(annexModel, formValueMap);
		try {
			annexModel.setName(name);
			is = new FileInputStream(file);
			
			annexModel.setId(iTfpreformService.getSeqId());
			formValueMap.put("excelId",annexModel.getId());//让Excel 和 文件模版在同一目录下
			formValueMap.put("virtualPath",PreformUtilsNew.getVirtualPath(formValueMap));//让Excel 和 文件模版在同一目录下
			
			iTfpreformService.uploadFrameAnnex(annexModel, is, formValueMap);
//			frameAnnex.upload(annexModel, is, formValueMap);
		} catch (Exception e) {
			//			log.error(e);
			throw e;
		} finally {
			if (is != null) {
				is.close();
			}
		}
//		frameAnnex.commit(annexModel);

//		IFrameService fs = FrameFactory.getServiceFactory(null);
//		ITfPreformService sv = (ITfPreformService) fs
//				.getService(TfPreformService.class.getName());
		
		String id = iTfpreformService.getId(annexModel, formValueMap);

//		String id = sv.savePreform4Multipage(annexModel, formValueMap);
		file.deleteOnExit();// 清理临时文件
		return id;
	}
}
