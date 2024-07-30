package com.ssafy.withme.controller.youtube.response;


import com.ssafy.withme.controller.youtube.YouTubeController;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class YouTubeSearchResponse {

    private String videoId;
    private String nextPageToken;
    private Object snippet;

    @Builder
    public YouTubeSearchResponse(String videoId, String nextPageToken, Object snippet) {
        this.videoId = videoId;
        this.nextPageToken = nextPageToken;
        this.snippet = snippet;
    }


}
