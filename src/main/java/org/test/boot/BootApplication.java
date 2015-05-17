package org.test.boot;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.web.SpringBootServletInitializer;
import org.springframework.context.ConfigurableApplicationContext;

/**
 * Created by Administrator on 2015-05-17.
 */

@SpringBootApplication
@MapperScan(basePackages="org.test.boot.mappers")
public class BootApplication extends SpringBootServletInitializer{

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(BootApplication.class);
    }


    public static void main(String[] args) {
        ConfigurableApplicationContext ctx = SpringApplication.run(new Object[] { BootApplication.class }, args);
        System.out.println("Spring Boot Started.");
    }
}
