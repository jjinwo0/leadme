package com.ssafy.withme.service.chat.chatroom;

import com.ssafy.withme.dto.ChatRoomGetResponse;
import com.ssafy.withme.repository.chat.ChatRoomRedisRepository;
import com.ssafy.withme.service.chat.message.ChatMongoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
@Slf4j
public class ChatRoomService {

    private final ChatRoomRedisRepository chatRoomRedisRepository;
    private final ChatMongoService chatMongoService;

    public ChatRoomGetResponse getChatRoomInfo(String accessToken, )
}
