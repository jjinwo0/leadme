package com.ssafy.withme.domain.chat.feign;

import com.ssafy.withme.dto.ChatRoomGetResponse;
import com.ssafy.withme.global.config.chat.FeignConfig;
import com.ssafy.withme.global.response.SuccessMessage;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 채팅 서버 입장 (시큐리티 X ?)
 * userId로 user 정보를 가져오는 상황
 * 비로그인 사용자도 접근 가능
 */

@FeignClient(
        name = "mainFeign", url = "http://localhost:8080/api/v1",
        configuration = FeignConfig.class
)
public interface MainFeignClient {

    @GetMapping("/chat/room/list/feign")
    List<ChatRoomGetResponse> getChatRoomList(@RequestHeader("Authorization") String accessToken);

    @GetMapping("/chat/room/info")
    ChatRoomGetResponse getChatRoomInfo(
            @RequestHeader("Authorization") String accessToken,
            @RequestParam(name = "roomId") String roomId
    );

    @DeleteMapping("/chat/room")
    SuccessMessage deleteChatRoom(
            @RequestHeader("Authorization") String accessToken,
            @RequestParam(name = "roomId") String roomId
    );
}
