package com.ssafy.withme.dto;

import lombok.*;

@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ChatRoomGetResponse {

    private String chatRoomNumber;
    private Long buyerId; // 구매자니까 채팅 신청한사람?
    private Long sellerId; // 판매자니까 채팅 신청 받은사람?

    // 음..안쓰지 않을까
    private String accomodationName;
    private int sellPrice;

}
