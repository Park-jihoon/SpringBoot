package org.test.boot.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.test.boot.domain.Member;
import org.test.boot.mappers.MemberMapper;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.Map;


@Controller
public class LoginController {

    @Autowired
    private MemberMapper memberMapper;

    @Value("${application.message:Hello World}")
	private String message = "Hello World한글";


    @RequestMapping(value = {"/", "/login"}, method = RequestMethod.GET)
    public String loginGet(Map<String, Object> model, HttpServletRequest request) {
        model.put("time", new Date());
//        model.put("message", userMapper.getByID("jsoft").getUserid() + "한글");


        Member member = (Member) request.getSession().getAttribute("userInfo");

        if (member != null) {
            return "redirect:/application/main";
        }

        return "login";
    }


    @RequestMapping(value = {"/", "/login"}, method = RequestMethod.POST)
    public String loginPost(
            @RequestParam("inputID") String userId,
            @RequestParam("inputPW") String password,
            HttpServletRequest request, HttpServletResponse response) {
//        model.put("message", userMapper.getByID("jsoft").getUserid() + "한글");
        Member member = memberMapper.getByID(userId, password);
        if(member == null) {
            return "redirect:login?r=NOT";
        } else {
            request.getSession().setAttribute("userInfo", member);
            return "redirect:/application/main";
        }
    }

}
