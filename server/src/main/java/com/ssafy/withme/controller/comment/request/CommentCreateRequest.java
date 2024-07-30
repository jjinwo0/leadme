package com.ssafy.withme.controller.comment.request;

import com.ssafy.withme.domain.comment.Comment;
import com.ssafy.withme.domain.user.User;
import com.ssafy.withme.domain.userchallenge.UserChallenge;
import com.ssafy.withme.domain.usercomment.UserCommentLike;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.FetchType.LAZY;

@NoArgsConstructor
@Getter
public class CommentCreateRequest {

    private String content;

    private Long userChallengeId;

}
