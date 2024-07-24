package com.ssafy.withme.controller.comment;

import com.ssafy.withme.repository.comment.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class CommentController {

    private final CommentRepository commentRepository;

    @GetMapping("/api/v1/")
}
