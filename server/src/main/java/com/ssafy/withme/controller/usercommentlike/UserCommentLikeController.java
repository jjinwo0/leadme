package com.ssafy.withme.controller.usercommentlike;

import com.ssafy.withme.service.usercommentlike.UserCommentLikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class UserCommentLikeController {

    private final UserCommentLikeService userCommentLikeService;

    // 좋아요 버튼을 눌렀을 때 호출한다.
}
