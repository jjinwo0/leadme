package com.ssafy.withme.repository.landmark;

import com.ssafy.withme.domain.landmark.LandMark;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LandmarkRepository extends MongoRepository<LandMark, String> {

}
