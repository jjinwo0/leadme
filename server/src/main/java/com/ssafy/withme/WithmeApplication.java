package com.ssafy.withme;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class WithmeApplication {

	public static void main(String[] args) {
		SpringApplication.run(WithmeApplication.class, args);
	}

}
