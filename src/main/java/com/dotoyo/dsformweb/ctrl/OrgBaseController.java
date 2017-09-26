package com.dotoyo.dsformweb.ctrl;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.extremecomponents.table.context.Context;
import org.extremecomponents.table.context.HttpServletRequestContext;
import org.extremecomponents.table.limit.Limit;
import org.extremecomponents.table.limit.LimitFactory;
import org.extremecomponents.table.limit.TableLimit;
import org.extremecomponents.table.limit.TableLimitFactory;

import com.dotoyo.ims.authority.model.UserAdmin;
import com.dotoyo.ims.custom.common.utils.MUtils;
import com.dotoyo.ims.general.constant.Constants;
import com.dotoyo.ims.platform.common.page.PageSupport;
import com.dotoyo.ims.platform.constant.SessionKeyConstantEnum;
import com.dotoyo.ims.platform.ctrl.PlatformController;
import com.dotoyo.ims.platform.utils.FileUtils;
import com.dotoyo.ims.platform.view.JsonModel;
import com.dotoyo.ims.project.model.ProjectOrganization;
import com.dotoyo.ims.user.model.OrganizationUser;
import com.dotoyo.ims.user.model.UserDetail;
import com.dotoyo.ims.user.model.Users;
import com.dotoyo.ims.user.outservice.IUserBasicService;
import com.fasterxml.jackson.databind.ObjectMapper;

public class OrgBaseController extends PlatformController {
	public  Log log = LogFactory.getLog(this.getClass());
//	@Resource(name="userBasicService_user")
	private IUserBasicService userBasicService;
	
	public PageSupport allPs() {
		return new PageSupport(PageSupport.ALL).noNeedCount();
	}
	

	/**
	 * 保存session值
	 */
	public void setAttribute(String key, Object value) {
		getSession().setAttribute(key, value);
	}

	/**
	 * 移除session值
	 */
	public void removeAttribute(String key) {
		getSession().removeAttribute(key);
	}

	/**
	 * 获取session值
	 */
	public Object getAttribute(String key) {
		return getSession().getAttribute(key);
	}

	/**
	 * 获取当前登录用户
	 */
	public Users getUser() {
		if (getAttribute(SessionKeyConstantEnum.SYS_USER.toString())!=null) {
			return (Users)getAttribute(SessionKeyConstantEnum.SYS_USER.name());
		}
		return null;
	}
	
	/**
	 * 获取当前登录用户（运营后台专用）
	 */
	public UserAdmin getAdminUser() {
		if (getAttribute(SessionKeyConstantEnum.AMDIN_USER.toString())!=null) {
			return (UserAdmin)getAttribute(SessionKeyConstantEnum.AMDIN_USER.name());
		}
		return null;
	}

	/**
	 * 获取当前登录用户的详细信息
	 * 2014-1-7
	 * 上午10:16:43
	 * @return
	 */
	public UserDetail getUserDetail(){
		if (getAttribute(SessionKeyConstantEnum.SYS_USER_DETAIL.toString())!=null) {
			return (UserDetail)getAttribute(SessionKeyConstantEnum.SYS_USER_DETAIL.name());
		}
		return null;
	}
	
	public void setUserDetail(UserDetail detail){
		setAttribute(SessionKeyConstantEnum.SYS_USER_DETAIL.toString(), detail);
	}

	public ProjectOrganization getCurrentOrg() {
		ProjectOrganization organization = (ProjectOrganization) getSession().getAttribute(SessionKeyConstantEnum.ORG_ORGANIZATION.name());
		return organization;
	}
	
	/**
	 * 获取当前登录机构用户
	 * @return
	 */
	public OrganizationUser getOrganizationUser(){
		if(getAttribute(SessionKeyConstantEnum.ORGAN_USER.name())!=null){
			return (OrganizationUser)getAttribute(SessionKeyConstantEnum.ORGAN_USER.name());
		}
		return null;
	}

	/**
	 * 获取当前登录用户所在公司id
	 * 2014-1-7
	 * 下午05:29:37
	 * @return
	 */
	public String getCompanyId(){
		String companyId ="";
		UserDetail sud = null;
		sud = getUserDetail(); //从session中获取到用户的SysUserDetail对象
		if(sud!=null){
			/*if(getUserDetail().getCompany()!=null){
				if(StringUtils.isNotEmpty(getUserDetail().getCompany().getId())){
					companyId = getUserDetail().getCompany().getId();
				}
			}*/
			companyId = sud.getCompanyId();
		}
		return companyId;
	}

	
	/**
	 * 获取当前分页对象(默认每页10条)
	 */
	public Limit getLimit() {
		return getLimit(10);
	}

	/**
	 * 获取当前分页对象
	 */
	public Limit getLimit(int rowDisplay) {
		Context context = new HttpServletRequestContext(getRequest());
		LimitFactory limitFactory = new TableLimitFactory(context);
		Limit limit = new TableLimit(limitFactory);
		limit.setRowAttributes(Integer.MAX_VALUE, rowDisplay);
		return limit;
	}
	
	/**
	 * 将指定的对象转换为JSON字符串, 输出到浏览器中
	 * @throws IOException 
	 */
	public void printJson(Object object, HttpServletResponse response){
		ObjectMapper mapper = new ObjectMapper();
		String jsonString = null;
		try {
			if (object!=null) {
				jsonString = mapper.writeValueAsString(object);
			}
			response.setContentType("text/json;charset=UTF-8");
			response.getWriter().print(jsonString);
		} catch (Exception e) {
			log.error(e.getMessage(), e);
		}
	}

	/**
	 * 输出信息到浏览器
	 * 2014-1-14
	 * 上午09:53:49
	 * @param content
	 * @param charset
	 * @throws Exception
	 */
	public void write(String content,String charset,HttpServletResponse response) throws Exception {
		charset = (charset==null?"UTF-8":charset);
		response.setCharacterEncoding(charset==null?"UTF-8":charset);
		response.setContentType("text/html;charset="+charset);
		response.getWriter().print(content);
	}
	
	public void write(String content, HttpServletResponse response) {
		String charset = "UTF-8";
		response.setCharacterEncoding(charset==null?"UTF-8":charset);
		response.setContentType("text/html;charset="+charset);
		try {
			response.setCharacterEncoding(charset==null?"UTF-8":charset);
			response.setContentType("text/html;charset="+charset);
			response.getWriter().print(content);
		} catch (IOException e) {
			log.error(e.getMessage(), e);
		}
		
	}
	

	/**
	 * 设置消息编码
	 * @param message
	 * @param enc
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	public String encode(String message, String enc) {
		if (!StringUtils.isBlank(message)) {
			try {
				message = URLEncoder.encode(URLEncoder.encode(message, enc), enc);
			} catch (UnsupportedEncodingException e) {
				log.error(e.getMessage(), e);
			}
		}
		return message;
	}

	/**
	 * 消息解码
	 * @param message
	 * @param enc
	 * @return
	 */
	public String decode(String message, String enc) {
		if (!StringUtils.isBlank(message)) {
			try {
				message = URLDecoder.decode(URLDecoder.decode(message, enc), enc);
			} catch (UnsupportedEncodingException e) {
				log.error(e.getMessage(), e);
			}
		}
		return message;
	}
	
	/**
	 * 内容编码
	 * @param src
	 * @return
	 */
	public String escape(String src) {
		// TODO Auto-generated method stub
		if (!StringUtils.isBlank(src)) {
			int i;
			char j;
			StringBuffer tmp = new StringBuffer();
			tmp.ensureCapacity(src.length() * 6);
			for (i = 0; i < src.length(); i++) {
				j = src.charAt(i);
				if (Character.isDigit(j) || Character.isLowerCase(j) || Character.isUpperCase(j))
					tmp.append(j);
				else if (j < 256) {
					tmp.append("%");
					if (j < 16)
						tmp.append("0");
					tmp.append(Integer.toString(j, 16));
				} else {
					tmp.append("%u");
					tmp.append(Integer.toString(j, 16));
				}
			}
			return tmp.toString();
		} else {
			return src;
		}
	}
	
	/**
	 * 内容解码
	 * @param src
	 * @return
	 */
	public String unescape(String src) {
		// TODO Auto-generated method stub
		if (!StringUtils.isBlank(src)) {
			StringBuffer tmp = new StringBuffer();
			tmp.ensureCapacity(src.length());
			int lastPos = 0, pos = 0;
			char ch;
			while (lastPos < src.length()) {
				pos = src.indexOf("%", lastPos);
				if (pos == lastPos) {
					if (src.charAt(pos + 1) == 'u') {
						ch = (char) Integer.parseInt(src.substring(pos + 2, pos + 6), 16);
						tmp.append(ch);
						lastPos = pos + 6;
					} else {
						ch = (char) Integer.parseInt(src.substring(pos + 1, pos + 3), 16);
						tmp.append(ch);
						lastPos = pos + 3;
					}
				} else {
					if (pos == -1) {
						tmp.append(src.substring(lastPos));
						lastPos = src.length();
					} else {
						tmp.append(src.substring(lastPos, pos));
						lastPos = pos;
					}
				}
			}
			return tmp.toString();
		} else {
			return src;
		}
	}

	/**
	 * 获取返回路径
	 * @param request
	 * @return
	 */
	public String getUrl(HttpServletRequest request) {
		StringBuffer url = request.getRequestURL();
		Map parameters = request.getParameterMap();
		if (parameters != null && parameters.size() > 0) {
			url.append("?");
			for (Iterator iter = parameters.keySet().iterator(); iter.hasNext();) {
				String key = (String) iter.next();
				if (!key.equals("returnUrl")&&!key.equals("message")) {
					String[] values = (String[]) parameters.get(key);
					for (int i = 0; i < values.length; i++) {
						url.append(key).append("=").append(values[i]).append("&");
					}
				}
			}
		}
		String result = url.toString();
		if (result != null) {
			if (result.substring(result.length() - 1, result.length()).equals("&")) {
				result = result.substring(0, result.length() - 1);
			}
		}
		/*return encode(url.toString(), "UTF-8");*/
		return result;
	}
	
	

	
	/**
	 * list分页
	 * @param <T>
	 * @param list
	 * @param pageSize
	 * @return
	 */
	public <T> List<List<T>> splitList(List<T> list, int pageSize) {
		int listSize = list.size();
		int page = (listSize + (pageSize - 1)) / pageSize;
		List<List<T>> listArray = new ArrayList<List<T>>();
		for (int i = 0; i < page; i++) {
			List<T> subList = new ArrayList<T>();
			for (int j = 0; j < listSize; j++) {
				int pageIndex = ((j + 1) + (pageSize - 1)) / pageSize;
				if (pageIndex == (i + 1)) {
					subList.add(list.get(j));
				}
				if ((j + 1) == ((j + 1) * pageSize)) {
					break;
				}
			}
			listArray.add(subList);
		}
		return listArray;
	}
	
	/**
	 * 获取IP
	 * @param request
	 * @return
	 */
	public String getIpAddress(HttpServletRequest request) {
		
	    String ip = request.getHeader("x-forwarded-for"); 
	    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
	      ip = request.getHeader("Proxy-Client-IP"); 
	    } 
	    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
	      ip = request.getHeader("WL-Proxy-Client-IP"); 
	    } 
	    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
	      ip = request.getHeader("HTTP_CLIENT_IP"); 
	    } 
	    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
	      ip = request.getHeader("HTTP_X_FORWARDED_FOR"); 
	    } 
	    if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
	      ip = request.getRemoteAddr(); 
	    } 
	    return ip; 
	} 
	
	/**
	 * 返回当前企业类型（监理、施工、业主、设计、勘察）
	 * @param currentOrgType
	 * @return
	 */
	public String returnOrgType(){
		String orgType = "";
		if(Constants.SG.equals(getCurrentOrg().getOrgTypeId())){
			orgType="SG";
		}
		if(Constants.JL.equals(getCurrentOrg().getOrgTypeId())){
			orgType ="JL";
		}
		if(Constants.YZ.equals(getCurrentOrg().getOrgTypeId())){
			orgType ="";
		}
		if(Constants.SJ.equals(getCurrentOrg().getOrgTypeId())){
			orgType ="SJ";
		}
		if(Constants.KC.equals(getCurrentOrg().getOrgTypeId())){
			orgType ="KC";
		}
		return orgType;
	}
	
	/**
	 * 下载图片
	 * @param response
	 * @param session
	 * @param filePath
	 * @param fileName
	 * @param returnUrl
	 * @param isTempFile
	 */
	public void downloadFile(HttpServletResponse response, HttpSession session, String filePath, String fileName, String returnUrl, boolean isTempFile) {
		// TODO Auto-generated method stub
		try {
			File file = new File(filePath);
			if (file.exists() && file.isFile()) {
				InputStream ins = null;
				try {
					ins = new FileInputStream(filePath);
					//放到缓冲流里面
					BufferedInputStream bins = null;
					try {
						bins = new BufferedInputStream(ins);
						//获取文件输出IO流
						OutputStream outs = null;
						try {
							outs = response.getOutputStream();
							BufferedOutputStream bouts = null;
							try {
								bouts = new BufferedOutputStream(outs);
								//设置response内容的类型
								response.setContentType("application/x-download");
								//设置头部信息
								response.setHeader("Content-disposition", "attachment;filename=" + new String(fileName.getBytes("gb2312"), "ISO8859-1"));
								response.setHeader("Content-Length", String.valueOf(file.length()));
								response.setHeader("Content-Type","application/octet-stream");
								int bytesRead = 0;
								byte[] buffer = new byte[8192];
								// 开始向网络传输文件流
								while ((bytesRead = bins.read(buffer, 0, 8192)) != -1) {
									bouts.write(buffer, 0, bytesRead);
								}
							} finally {
								if (bouts != null) {
									// 这里一定要调用flush()方法
									bouts.flush();
									bouts.close();
								}
							}
						} finally {
							if (outs != null) {
								outs.close();
							}
						}
					} finally {
						if (bins != null) {
							bins.close();
						}
					}
				} finally {
					if (ins != null) {
						ins.close();
					}
				}
				//如果是临时文件则下载完后删除文件
				if (isTempFile) {
					FileUtils.deleteFile(filePath);					
				}
			} else {
				String message = "路径错误或文件不存在！";
				message = encode(message, "UTF-8");
				session.setAttribute("message", message);
				response.sendRedirect(returnUrl);
			}
		} catch (IOException e) {
		}
	}
	
	public Users getNextUser() {
		if(isValid("nextUser")) {
			JSONObject nextUserObj = getJsonObject("nextUser");
			Users nextUser = userBasicService.findUserByParam(MUtils.getParams("username", nextUserObj.getString("username")));
				return nextUser;
		}
		return new Users();
	}
	
	public String getNextOrgId() {
		if(isValid("nextUser")) {
			JSONObject nextUserObj = getJsonObject("nextUser");
			return nextUserObj.getString("scopeId").substring(2);
		}
		return "";
	}
	
	/** 返回数据*/
	protected void outPut(HttpServletResponse response, String msg) {
		if (StringUtils.isBlank(msg)) {
			JsonModel.success().output(response);
			return;
		}
		if (msg.contains("success")) {
			JsonModel.success().output(response);
		} else {
			JsonModel.failure().setM(msg).output(response);
		}
	}
}
