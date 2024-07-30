package com.ssafy.withme.global.config.chat;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@RequiredArgsConstructor
// 여기 설정 해줘야함!
@EnableMongoRepositories(basePackages = "com")
public class MongoConfig {
}
