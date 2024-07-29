package com.ssafy.withme.controller.comment;

import com.ssafy.withme.domain.comment.Comment;
import lombok.Builder;
import lombok.Getter;

@Getter
public class CommentDeleteResponse {

    private String content;

    @Builder
    private CommentDeleteResponse(String content) {
        this.content = content;
    }

    public static CommentDeleteResponse of(Comment comment){
        return CommentDeleteResponse.builder()
                .content(comment.getContent())
                .build();
    }
}
