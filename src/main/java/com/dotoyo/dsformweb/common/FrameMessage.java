package com.dotoyo.dsformweb.common;

import java.util.Map;

import com.dotoyo.dsform.model.IModel;
import com.dotoyo.dsform.model.MessageBo;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class FrameMessage {
	
	public static String getRespMessage4json(MessageBo bo, JSONObject param)
			throws Exception {

		if (param instanceof JSONObject) {
			JSONObject json = (JSONObject) param;
			JSONObject ret = getRespMessage4Json();
			ret.put("body", json);
			return ret.toString();
		} else {
			// 未实现
			throw new Exception();
		}
	}
	
	public static JSONObject getRespMessage4Json() throws Exception {
		JSONObject ret = new JSONObject();
		ret.put("code", "0000000000000000");
		ret.put("msg", "成功");
		ret.put("body", "{}");
		return ret;
	}
	
	/**
	 * 把对象变为报文字串
	 * 
	 * @param bo
	 * @param msg
	 * @return
	 * @throws Exception
	 */
	public String getRespMessage(MessageBo bo, String msg, long count)
			throws Exception {
		if ("json".equals(bo.getRespType())) {

			return getRespMessage4json(bo, msg, count);
		} else if ("xml".equals(bo.getRespType())) {
			// 未实现
//			FrameException bte = new FrameException("3000000000000001", null);
//			throw bte;
			throw new Exception();
		} else {
			// 不支持
//			FrameException bte = new FrameException("3000000000000001", null);
//			throw bte;
			throw new Exception();
		}

	}
	/**
	 * 把对象变为报文字串
	 * 
	 * @param bo
	 * @param msg
	 * @return
	 * @throws Exception
	 */
	private String getRespMessage4json(MessageBo bo, String msg, long count)
			throws Exception {
		JSONObject ret = new JSONObject();
		ret.put("code", "0000000000000000");
//		ret.put("msg", FrameUtils.getWords("0000000000000000", "", null));
		ret.put("msg", "msg");
		ret.put("rows", msg);
		ret.put("total", count);
		return ret.toString();

	}
	
	public String getRespMessage(MessageBo bo, IModel model) throws Exception {
		if ("json".equals(bo.getRespType())) {

			return getRespMessage4json(bo, model);
		} else if ("xml".equals(bo.getRespType())) {
			// 未实现
//			FrameException bte = new FrameException("3000000000000001", null);
//			throw bte;
			throw new Exception();
		} else {
			// 不支持
//			FrameException bte = new FrameException("3000000000000001", null);
//			throw bte;
			throw new Exception();
		}

	}
	
	private String getRespMessage4json(MessageBo bo, IModel model)
			throws Exception {
		JSONObject ret = getRespMessage4Json();
		ret.put("body", WebUtilsNew. modelToJson(model));
		return ret.toString();
	}
	
	public String getRespMessage(MessageBo bo, JSONArray param)
			throws Exception {
		if (param instanceof JSONArray) {
			JSONArray array = (JSONArray) param;
			JSONObject ret = getRespMessage4Json();
			ret.put("body", array);
			return ret.toString();
		} else {
			// 未实现
//			FrameException bte = new FrameException("3000000000000001", null);
//			throw bte;
			throw new Exception();
		}
	}
	
	public static String getRespMessage(MessageBo bo, Map<String, Object> param)
			throws Exception {
		if (param != null) {
			if ("json".equals(bo.getRespType())) {
				if (param instanceof JSONObject) {
					return getRespMessage4json(bo, (JSONObject) param);
				} else {
					// 未实现
//					FrameException bte = new FrameException("3000000000000001",
//							null);
//					throw bte;
					throw new Exception();
				}

			} else if ("xml".equals(bo.getRespType())) {
				// 未实现
//				FrameException bte = new FrameException("3000000000000001",
//						null);
//				throw bte;
				throw new Exception();
			} else {
				// 不支持
//				FrameException bte = new FrameException("3000000000000001",
//						null);
//				throw bte;
				throw new Exception();
			}

		} else {

			return getRespMessage4Json().toString();
		}

	}

}
