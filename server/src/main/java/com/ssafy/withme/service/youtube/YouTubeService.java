package com.ssafy.withme.service.youtube;


import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.youtube.YouTube;
import com.google.api.services.youtube.model.SearchListResponse;
import com.google.api.services.youtube.model.SearchResult;
import com.ssafy.withme.controller.youtube.request.YouTubeSearchRequest;
import com.ssafy.withme.controller.youtube.response.YouTubeSearchResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class YouTubeService {

    @Value("${youtube-api-key}")
    private String apiKey;

    /**
     * 유튜브 API 를 활용하여 영상 정보를 받아온다.
     * @param youTubeSearchRequest
     * @return
     * @throws IOException
     */
    public List<YouTubeSearchResponse> searchYouTube(YouTubeSearchRequest youTubeSearchRequest) throws IOException {
        JsonFactory jsonFactory = GsonFactory.getDefaultInstance();

        YouTube youTube = new YouTube.Builder(
                new com.google.api.client.http.javanet.NetHttpTransport(),
                jsonFactory,
                request -> {})
                .build();

        YouTube.Search.List search = youTube.search().list(Collections.singletonList("id, snippet"));

        search.setKey(apiKey);
        search.setPart(Collections.singletonList(youTubeSearchRequest.getPart()));
        search.setQ(youTubeSearchRequest.getQ());
        search.setType(Collections.singletonList(youTubeSearchRequest.getType()));
        search.setVideoDuration(youTubeSearchRequest.getVideoDuration());
        search.setMaxResults(youTubeSearchRequest.getMaxResults());
        search.setPageToken(youTubeSearchRequest.getPageToken());

        SearchListResponse searchResponse = search.execute();
        String nextPageToken = searchResponse.getNextPageToken();
        java.util.List<SearchResult> searchResultList = searchResponse.getItems();

        List<YouTubeSearchResponse> searchResponseList = searchResultList.stream()
                .map(searchResult -> YouTubeSearchResponse.builder()
                                .videoId(searchResult.getId().getVideoId())
                                .nextPageToken(nextPageToken)
                                .snippet(searchResult.getSnippet())
                                .build())
                .collect(Collectors.toList());

        return searchResponseList;
    }


}
