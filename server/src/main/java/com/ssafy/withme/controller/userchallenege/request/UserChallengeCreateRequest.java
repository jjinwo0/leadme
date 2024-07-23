package com.ssafy.withme.controller.userchallenege.request;

import com.ssafy.withme.domain.challenge.Challenge;
import com.ssafy.withme.domain.comment.Comment;
import com.ssafy.withme.domain.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

import static jakarta.persistence.FetchType.LAZY;

@NoArgsConstructor
@Getter
public class UserChallengeCreateRequest {

    private String name;

    private String videoPath;

    private Long challengeId;

    private Long userId;
}
