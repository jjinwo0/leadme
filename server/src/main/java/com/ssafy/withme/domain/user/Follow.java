package com.ssafy.withme.domain.user;

import com.ssafy.withme.domain.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Follow extends BaseEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "follow_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "to_users_id", foreignKey = @ForeignKey(name = "fk_follow_to_user"))
    private User toUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_users_id", foreignKey = @ForeignKey(name = "fk_follow_from_user"))
    private User fromUser;

    @Builder
    public Follow(User toUser, User fromUser) {
        this.toUser = toUser;
        this.fromUser = fromUser;
    }
}
