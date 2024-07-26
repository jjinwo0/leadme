package com.ssafy.withme.service.comment;

import com.ssafy.withme.controller.comment.request.CommentCreateRequest;
import com.ssafy.withme.domain.comment.Comment;
import com.ssafy.withme.domain.userchallenge.UserChallenge;
import com.ssafy.withme.repository.comment.CommentRepository;
import com.ssafy.withme.repository.userchallenge.UserChallengeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final UserChallengeRepository userChallengeRepository;
}
