package org.test.boot.interceptor;


import org.apache.log4j.Logger;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import org.test.boot.domain.Member;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Calendar;

public class LoginCheckInterceptor extends HandlerInterceptorAdapter {

	private Logger log = Logger.getLogger(LoginCheckInterceptor.class);
	
//	private String loginURL;
//	private List<String> exceptionURL;
//	private List<String> secureURL;
//	private List<String> secureExceptionURL;
	
	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
		// set header
		response.setHeader("Pragma", "No-cache");
		response.setHeader("Cache-Control", "no-cache");
		response.addHeader("Cache-Control", "no-store");
		response.setHeader("Expires", "Tues, 01 Jan 1980 00:00:00 GMT");
		// base method call
		String currentURL = request.getRequestURI();
		if(request.getQueryString() != null) currentURL = String.format("%s?%s", currentURL, request.getQueryString());
		request.setAttribute("currentURL", currentURL);
		request.setAttribute("nowDate", Calendar.getInstance().getTime());
		
		Member user = (Member)request.getSession().getAttribute("userInfo");
		
		// Login false
	   if(user == null) {
	    System.out.println("Interceptor : Session Check Fail");
	    // main page 로 이동
	    response.sendRedirect("/login");
	    return false;
	   } else {
		// Login true
	    return super.preHandle(request, response, handler);
	   }
		
		
		// 로그인 제외 URL 체크
//		boolean isException = false;
//		for(int i = 0; i < exceptionURL.size(); i++) {
//			if(currentURL.startsWith(exceptionURL.get(i))) {
//				isException = true;
//				break;
//			}
//		}
		// Secure 적용 제외 URL 체크
//		boolean isSecureException = false;
//		for(int i = 0; i < secureExceptionURL.size(); i++) {
//			if(currentURL.startsWith(secureExceptionURL.get(i))) {
//				isSecureException = true;
//				break;
//			}
//		}
		// 개발환경(localhost)인경우는 ssl 제외
//		if("localhost".equals(request.getLocalName()) || "comm.jsoftkorea.co.kr".equals(request.getLocalName())) isSecureException = true;
		
		// Login Session
//		User user = (User)request.getSession().getAttribute("userInfo");
		
		// HTTPS 적용 URL인경우 https:// 로 연결
//		boolean isScure = false;
//		if(!isSecureException) {
//			for(int i = 0; i < secureURL.size(); i++) {
//				if(currentURL.startsWith(secureURL.get(i))) {
//					isScure = true;
//					break;
//				}
//			}
//			if(isScure && request.getServerPort() != 443) {
//				response.sendRedirect(String.format("https://%s%s", request.getHeader("host"), currentURL));
//				return false;
//			} else if(!isScure && request.getServerPort() == 443) {
//				response.sendRedirect(String.format("http://%s%s", request.getHeader("host"), currentURL));
//				return false;
//			}
//		}

		
		// 예외경로인 경우 처리종료
//		if(isException) return true;
		
			/** for dev */
//			user = new User();
//			user.setUserid("0000");
//			user.setUsername("wook"); 
//			user.setCenter_id(76);
//			user.setUsertype("A");
//			user.setOrg_id(16);
//			user.setEmail("admin@hanmail.net");
//			user.setMobile("010-2244-8282");
//			user.setCenterAddr(centerService.list(76).getAddress());
//			request.getSession().setAttribute("userInfo", user);
		
		// 로그인 여부 체크
//		if(!isException && user == null) {
//			log.debug(String.format("This page requires login. [%s]", currentURL));
//			response.sendRedirect(String.format(
//				"%s?r=NOT_LOGIN&returnURL=%s", loginURL, URLEncoder.encode(currentURL, request.getCharacterEncoding())
//			));
//			return false;
//		}
//		if(!isException && user == null) {
//			log.debug(String.format("This page requires login. [%s]", currentURL));
//			response.sendRedirect(loginURL);
//			return false;
//		}
		
//		return super.preHandle(request, response, handler);
	}

	// applicationContext_global.xml 로부터 설정값 전달
//	public void setLoginURL(String loginURL) {
//		this.loginURL = loginURL;
//	}
//	public void setExceptionURL(List<String> exceptionURL) {
//		this.exceptionURL = exceptionURL;
//	}
//	public void setSecureURL(List<String> secureURL) {
//		this.secureURL = secureURL;
//	}
//	public void setSecureExceptionURL(List<String> secureExceptionURL) {
//		this.secureExceptionURL = secureExceptionURL;
//	}

}
