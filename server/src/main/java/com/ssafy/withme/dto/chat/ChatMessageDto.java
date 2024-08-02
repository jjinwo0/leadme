package com.ssafy.withme.dto.chat;

import com.ssafy.withme.domain.chat.ChatMessage;
import com.ssafy.withme.domain.chat.constant.MessageType;
import lombok.*;

import java.io.Serializable;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessageDto implements Serializable {

    // 메시지 타입 : 입장, 채팅, 퇴장
    private MessageType type; // 메시지 타입
    private String roomId; // 방 번호
    private Long userId;
    private String message; // 메시지
    private String time;
    private long userCount; // 채팅방 인원수

    public static ChatMessageDto fromEntity(ChatMessage chatMessage) {
        return ChatMessageDto.builder()
                .type(chatMessage.getType())
                .userId(chatMessage.getUserId())
                .roomId(chatMessage.getRoomId())
                .time(chatMessage.getTime())
                .message(chatMessage.getMessage())
                .build();
    }

}
