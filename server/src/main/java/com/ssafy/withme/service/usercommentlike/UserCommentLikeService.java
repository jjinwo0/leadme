package com.ssafy.withme.service.usercommentlike;

import com.ssafy.withme.repository.usercommentlike.UserCommentLikeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserCommentLikeService {

    private final UserCommentLikeRepository userCommentLikeRepository;


}
