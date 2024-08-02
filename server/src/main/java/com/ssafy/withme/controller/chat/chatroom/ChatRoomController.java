package com.ssafy.withme.controller.chat.chatroom;

import com.ssafy.withme.dto.ChatRoomGetResponse;
import com.ssafy.withme.global.config.jwt.TokenProvider;
import com.ssafy.withme.global.response.SuccessResponse;
import com.ssafy.withme.service.chat.chatroom.ChatRoomService;
import com.ssafy.withme.service.chat.message.ChatMongoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/chat/room")
@RequiredArgsConstructor
public class ChatRoomController {

    private final TokenProvider tokenProvider;

    private final ChatRoomService chatRoomService;

    private final ChatMongoService chatMongoService;

    /**
     * 현재 유저가 들어가있는 채팅방 리스트를 조회하는 API
     * - 토큰 확인 로직 수정
     * @param authorization
     * @return
     */
    @GetMapping("/list")
    public List<ChatRoomGetResponse> getChatRoomList(
            @RequestHeader("Authorization") String authorization
    ) {

        String accessToken = authorization.split(" ")[1];

        Long findUserId = tokenProvider.getUserId(accessToken);

        return chatRoomService.getChatRoomListByUserId(findUserId);
    }

    /**
     * 채팅방 정보를 불러오는 API
     * - accessToken 파라미터 제거하고 유저 정보를 토큰에서 제공받는 로직으로 수정
     * @param authorization
     * @param roomId
     * @return
     */
    @GetMapping("/info")
    public ChatRoomGetResponse getChatRoom(
            @RequestHeader("Authorization") String authorization,
            @RequestParam(name = "roomId") String roomId
    ) {
        String accessToken = authorization.split(" ")[1];

        Long userId = tokenProvider.getUserId(accessToken);

        return chatRoomService.getChatRoomInfo(userId, roomId);
    }

    @GetMapping("/message/list")
    public SuccessResponse<?> roomFindInfo(
            @RequestHeader("Authorization") String accessToken,
            @RequestParam(name = "id") String id,
            @RequestParam(name = "page") Integer pageNumber
    ) {
        return SuccessResponse.of(chatMongoService.findAll(id, pageNumber));
    }
}
