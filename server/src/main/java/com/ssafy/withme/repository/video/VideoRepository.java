package com.ssafy.withme.repository.video;

import com.ssafy.withme.domain.video.Video;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VideoRepository extends JpaRepository<Video, Long> {
}
