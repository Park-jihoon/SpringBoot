package org.test.boot.common;


import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.core.io.Resource;

@ConfigurationProperties(prefix="mybatis")
public class MybatisProperties {
	private String driverClassName;
	private String url;
	private String username;
	private String password;
	
	private Resource configLocation;
	public String getDriverClassName() {
		return driverClassName;
	}
	public void setDriverClassName(String driverClassName) {
		this.driverClassName = driverClassName;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Resource getConfigLocation() {
		return configLocation;
	}
	public void setConfigLocation(Resource configLocation) {
		this.configLocation = configLocation;
	}
	
	
}
