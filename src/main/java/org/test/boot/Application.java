package org.test.boot;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.test.boot.common.MybatisProperties;

@SpringBootApplication
@EnableConfigurationProperties(MybatisProperties.class)
public class Application  {


	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
		System.out.println("Spring Boot Started.");
	}
}
