package com.ssafy.withme.dto.chat;

import com.ssafy.withme.domain.chat.constant.UserIdentity;
import lombok.*;

@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ChatRoomGetResponse {

    private String chatRoomNumber;
    private Long buyerId; // 구매자니까 채팅 신청한사람?
    private Long sellerId; // 판매자니까 채팅 신청 받은사람?

    private UserIdentity loginUserIdentity;

    // 음..안쓰지 않을까
    private String accomodationName;
    private int sellPrice;

    private String myNickname;
    private String partnerNickname;

    private ChatMessageDto lastChatMessageDto;

    public void updateChatMessageDto(ChatMessageDto chatMessageDto) {
        this.lastChatMessageDto = chatMessageDto;
    }

    public void changePartnerInfo() {
        String tmp = myNickname;
        this.myNickname = partnerNickname;
        this.partnerNickname = tmp;

        if (this.loginUserIdentity.equals(UserIdentity.SELLER)) {
            this.loginUserIdentity = UserIdentity.BUYER;
        } else if (this.loginUserIdentity.equals(UserIdentity.BUYER)) {
            this.loginUserIdentity = UserIdentity.SELLER;
        }
    }
}
