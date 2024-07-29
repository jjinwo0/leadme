package com.ssafy.withme.service.comment;

import com.ssafy.withme.controller.comment.request.CommentUpdateRequest;
import com.ssafy.withme.service.comment.response.CommentDeleteResponse;
import com.ssafy.withme.controller.comment.request.CommentCreateRequest;
import com.ssafy.withme.controller.comment.request.CommentDeleteRequest;
import com.ssafy.withme.domain.comment.Comment;
import com.ssafy.withme.domain.userchallenge.UserChallenge;
import com.ssafy.withme.repository.comment.CommentRepository;
import com.ssafy.withme.repository.userchallenge.UserChallengeRepository;
import com.ssafy.withme.service.comment.response.CommentCreateResponse;
import com.ssafy.withme.service.comment.response.CommentUpdateResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserChallengeRepository userChallengeRepository;


    /**
     * user도 파라미터로 추가해야함.
     * @param request
     */
    public CommentCreateResponse create(CommentCreateRequest request) {

        UserChallenge userChallenge = userChallengeRepository.findById(request.getUserChallengeId()).get();
        Comment newComment = Comment.builder()
                .content(request.getContent())
//                .user(user)
                .userChallenge(userChallenge)
                .build();
        Comment saveComment = commentRepository.save(newComment);
        return CommentCreateResponse.of(saveComment);
    }

    public CommentDeleteResponse delete(CommentDeleteRequest request) {
        Comment comment = commentRepository.findById(request.getCommentId()).get();
        commentRepository.delete(comment);
        return CommentDeleteResponse.of(comment);
    }

    public CommentUpdateResponse update(CommentUpdateRequest request) {
        Comment comment = commentRepository.findById(request.getCommentId()).get();
        comment.changeContent(request.getContent());
        Comment updatedComment = commentRepository.save(comment);
        return CommentUpdateResponse.of(updatedComment);
    }
}
