package com.ssafy.withme.service.comment;

import com.ssafy.withme.controller.comment.request.CommentCreateRequest;
import com.ssafy.withme.domain.comment.Comment;
import com.ssafy.withme.domain.userchallenge.UserChallenge;
import com.ssafy.withme.repository.comment.CommentRepository;
import com.ssafy.withme.repository.user.UserRepository;
import com.ssafy.withme.repository.userchallenge.UserChallengeRepository;
import com.ssafy.withme.service.comment.response.CommentCreateResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

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
}
