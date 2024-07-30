package com.ssafy.withme.repository.landmark;

import com.ssafy.withme.domain.landmark.Landmark;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Map;

public interface LandmarkRepository extends MongoRepository<Landmark, String> {

    Landmark findByYoutubeId(String youtubeId);
}
