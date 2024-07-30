package com.ssafy.withme.service.chat.message;

import com.ssafy.withme.domain.chat.constant.MessageType;
import com.ssafy.withme.dto.ChatMessageDto;
import com.ssafy.withme.repository.chat.ChatRoomRedisRepository;
import com.ssafy.withme.service.chat.RedisPublisher;
import com.ssafy.withme.service.chat.chatroom.ChatRoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
@Slf4j
public class ChatService {

    private final RedisPublisher redisPublisher;
    private final ChatRoomRedisRepository chatRoomRedisRepository;
    private final ChatRoomService chatRoomService;

    /**
     * 채팅방에 메시지 발송
     */
    public void sendChatMessage(ChatMessageDto chatMessage, String accessToken) {
        // 0. redis에 해당 채팅방 roomId(key)에 마지막 메시지(value)를 넣어준다.
        chatRoomRedisRepository.setLastChatMessage(chatMessage.getRoomId(), chatMessage);

        Long userId = chatMessage.getUserId();
        Long partnerId;

        // 1. 채팅방이 삭제되는 것이라면 delete를 해준다.
        if (chatMessage.getType().equals(MessageType.DELETE)) {
            chatRoomService.
        }
    }
}
