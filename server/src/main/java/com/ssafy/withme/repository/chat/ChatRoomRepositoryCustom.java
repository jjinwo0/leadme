package com.ssafy.withme.repository.chat;

import com.ssafy.withme.domain.chat.ChatRoom;

import java.util.List;

public interface ChatRoomRepositoryCustom {

    List<ChatRoom> findByUserId(Long userId);
}
