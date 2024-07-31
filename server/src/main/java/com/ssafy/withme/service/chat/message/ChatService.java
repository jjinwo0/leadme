package com.ssafy.withme.service.chat.message;

import com.ssafy.withme.domain.chat.constant.MessageType;
import com.ssafy.withme.domain.chat.constant.UserIdentity;
import com.ssafy.withme.dto.ChatMessageDto;
import com.ssafy.withme.dto.ChatRoomGetResponse;
import com.ssafy.withme.dto.MessageSubDto;
import com.ssafy.withme.repository.chat.ChatRoomRedisRepository;
import com.ssafy.withme.service.chat.RedisPublisher;
import com.ssafy.withme.service.chat.chatroom.ChatRoomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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
            chatRoomService.deleteChatRoom(accessToken, chatMessage.getRoomId(), userId);
        }
        // 2. 채팅방 리스트에 새로운 채팅방 정보가 없다면, 넣어준다. 마지막 메시지도 같이 담는다. 상대방 redis에도 업데이트 해준다.
        ChatRoomGetResponse newChatRoom = null;
        if (chatRoomRedisRepository.existChatRoom(userId, chatMessage.getRoomId())) {
            newChatRoom = chatRoomRedisRepository.getChatRoom(userId, chatMessage.getRoomId());
        } else {
            newChatRoom = chatRoomService.getChatRoomInfo(accessToken, chatMessage.getRoomId());
        }

        partnerId = getPartnerId(chatMessage, newChatRoom);
        setNewChatRoomInfo(chatMessage, newChatRoom);

        // 3. 마지막 메시지들이 담긴 채팅방 리스트들을 가져온다.
        // 4. 파트너 채팅방 리스트도 가져온다. (파트너는 userId로 가져옴)
        List<ChatRoomGetResponse> chatRoomList = chatRoomService.getChatRoomList(userId, accessToken);
        List<ChatRoomGetResponse> partnerChatRoomList = getChatRoomListByPartnerId(partnerId);

        // 5. 마지막 메시지 기준으로 정렬 채팅방 리스트 정렬
        chatRoomList = chatRoomService.sortChatRoomListLatest(chatRoomList);
        partnerChatRoomList = chatRoomService.sortChatRoomListLatest(partnerChatRoomList);

        MessageSubDto messageSubDto = MessageSubDto.builder()
                .userId(userId)
                .partnerId(partnerId)
                .chatMessageDto(chatMessage)
                .list(chatRoomList)
                .partnerList(partnerChatRoomList)
                .build();

        redisPublisher.publish(messageSubDto);

    }

    private Long getPartnerId(ChatMessageDto chatMessageDto, ChatRoomGetResponse my) {
        if (my.getBuyerId() == chatMessageDto.getUserId()) {
            return my.getSellerId();
        }
        return my.getBuyerId();
    }

    /**
     * redis에 채팅방 정보가 없는 경우 새로 저장
     * @param chatMessage
     */
    private void setNewChatRoomInfo(ChatMessageDto chatMessage, ChatRoomGetResponse newChatRoom) {
        newChatRoom.updateChatMessageDto(chatMessage);

        // 상대방 채팅 리스트와 내 채팅 리스트 둘다 채팅방을 저장한다.
        // 1. 로그인 유저가 seller라면 지금 전송한 메시지를 레디스에 최신메시지로 저장한다.
        if (newChatRoom.getLoginUserIdentity().equals(UserIdentity.SELLER)) {
            if (!chatMessage.getType().equals(MessageType.DELETE)) {
                chatRoomRedisRepository.setChatRoom(newChatRoom.getSellerId(),
                        chatMessage.getRoomId(), newChatRoom);
            }
            newChatRoom.changePartnerInfo(); // 닉네임 체인지
            chatRoomRedisRepository.setChatRoom(newChatRoom.getBuyerId(),
                    chatMessage.getRoomId(), newChatRoom);
        } else if (newChatRoom.getLoginUserIdentity().equals(UserIdentity.BUYER)) {
            if (!chatMessage.getType().equals(MessageType.DELETE)) {
                chatRoomRedisRepository.setChatRoom(newChatRoom.getBuyerId(),
                        chatMessage.getRoomId(), newChatRoom);
            }

            newChatRoom.changePartnerInfo(); //닉네임 체인지
            chatRoomRedisRepository.setChatRoom(newChatRoom.getSellerId(),
                    chatMessage.getRoomId(), newChatRoom);
        }

        // 다시 원상태로 복귀
        newChatRoom.changePartnerInfo();
    }

    // redis에서 채팅방 리스트 불러오는 로직
    private List<ChatRoomGetResponse> getChatRoomListByPartnerId(Long userId) {
        List<ChatRoomGetResponse> chatRoomListGetResponseList = new ArrayList<>();

        if (chatRoomRedisRepository.existChatRoomList(userId)) {
            chatRoomListGetResponseList = chatRoomRedisRepository.getChatRoomList(userId);
            for (ChatRoomGetResponse chatRoomListGetResponse : chatRoomListGetResponseList) {
                chatRoomService.setListChatLastMessage(chatRoomListGetResponse);
            }
        }

        return chatRoomListGetResponseList;
    }
}
