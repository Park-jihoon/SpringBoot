package org.test.boot.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.test.boot.mappers.UserMapper;

import java.util.Date;
import java.util.Map;



@Controller
public class GreetingController {

    @Autowired
    private UserMapper userMapper;

    @Value("${application.message:Hello World}")
	private String message = "Hello World";

	@RequestMapping("/")
	public String welcome(Map<String, Object> model) {
		model.put("time", new Date());
		model.put("message", userMapper.getByID("jsoft").getUserid());
		return "welcome";
	}


}
