package com.ssafy.withme.dto.chat;

import lombok.*;

@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ChatRoomGetResponse {

    private String chatRoomNumber;

    private Long userId;

    private Long partnerId;
//    private Long buyerId; // 구매자니까 채팅 신청한사람?
//    private Long sellerId; // 판매자니까 채팅 신청 받은사람?

    private ChatMessageDto lastChatMessageDto;

    public void updateChatMessageDto(ChatMessageDto chatMessageDto) {
        this.lastChatMessageDto = chatMessageDto;
    }
}
