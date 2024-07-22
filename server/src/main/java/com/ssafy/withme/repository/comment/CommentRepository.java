package com.ssafy.withme.repository.comment;

import com.ssafy.withme.domain.comment.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
