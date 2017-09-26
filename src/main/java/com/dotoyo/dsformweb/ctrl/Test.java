package com.dotoyo.dsformweb.ctrl;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
//@RequestMapping("/js")/
public class Test {
//	@RequestMapping("/preformCss.css")
	public ModelAndView test(HttpServletRequest httpRequest,
			HttpServletResponse httpResponse){
		ModelAndView mav=new ModelAndView();
		mav.setViewName("test");
		return mav;
	}

}
