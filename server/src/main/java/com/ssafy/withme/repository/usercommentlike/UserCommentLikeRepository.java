package com.ssafy.withme.repository.usercommentlike;

import com.ssafy.withme.domain.usercomment.UserCommentLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserCommentLikeRepository extends JpaRepository<UserCommentLike, Long> {
}
