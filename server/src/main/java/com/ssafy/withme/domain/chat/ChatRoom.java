package com.ssafy.withme.domain.chat;

import com.ssafy.withme.domain.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", foreignKey = @ForeignKey(name = "fk_chatroom_user"))
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "partner_id", foreignKey = @ForeignKey(name = "fk_chatroom_partner"))
    private User partner;

    private String roomName; // 방 이름

    private LocalDateTime userLeaveTime;
    private LocalDateTime partnerLeaveTime;

    public static ChatRoom create(User user, User partner) {
        String roomName = user.getId() + "-" + partner.getId();

        return ChatRoom.builder()
                .user(user)
                .partner(partner)
                .roomName(roomName)
                .build();
    }

    public void setUserLeaveTime(LocalDateTime time) {
        this.userLeaveTime = time;
    }

    public void setPartnerLeaveTime(LocalDateTime time) {
        this.partnerLeaveTime = time;
    }
}
