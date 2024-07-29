package com.ssafy.withme.controller.comment;

import com.ssafy.withme.controller.comment.request.CommentCreateRequest;
import com.ssafy.withme.global.response.SuccessResponse;
import com.ssafy.withme.repository.comment.CommentRepository;
import com.ssafy.withme.service.comment.CommentService;
import com.ssafy.withme.service.comment.response.CommentCreateResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class CommentController {

    private final CommentService commentService;

    // 댓글을 조회한다. - 페이징 기능 처리해야함.

    // 댓글을 등록한다.
    @PostMapping("/api/v1/comment")
    public SuccessResponse<CommentCreateResponse> createComment(@RequestBody CommentCreateRequest request){
        return SuccessResponse.of(commentService.create(request));

    }

    // 댓글을 삭제한다.

    // 댓글을 수정한다.
}
