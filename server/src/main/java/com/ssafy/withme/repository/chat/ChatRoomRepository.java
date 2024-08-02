package com.ssafy.withme.repository.chat;

import com.ssafy.withme.domain.chat.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

    ChatRoom findByUserIdAndPartnerId(Long userId, Long partnerId);
}
