package org.test.boot.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.test.boot.mappers.MemberMapper;

import java.util.Date;
import java.util.Map;



@Controller
public class GreetingController {

    @Autowired
    private MemberMapper userMapper;

    @Value("${application.message:Hello World}")
	private String message = "Hello World한글";

	@RequestMapping("/welcome")
	public String welcome(Map<String, Object> model) {
		model.put("time", new Date());
//		model.put("message", userMapper.getByID("jsoft").getUserid());
		return "welcome";
	}

    @RequestMapping("/main")
    public String main(Map<String, Object> model) {
        model.put("time", new Date());
//        model.put("message", userMapper.getByID("jsoft").getUserid() + "한글");
        return "application/main";
    }

    @RequestMapping("application/main")
    public String amain(Map<String, Object> model) {
        model.put("time", new Date());
//        model.put("message", userMapper.getByID("jsoft").getUserid() + "한글");
        return "application/main";
    }

}
