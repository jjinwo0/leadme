package com.ssafy.withme.domain.chat;

import com.ssafy.withme.domain.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChatRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chat_room_id")
    private Long id;

    private Long userId;

    private Long partnerId;

    private String roomId; // 방 이름

    public static ChatRoom create(Long userId, Long partnerId) {
        String roomName = userId + "-" + partnerId;
        return ChatRoom.builder()
                .userId(userId)
                .partnerId(partnerId)
                .roomId(roomName)
                .build();
    }
}
