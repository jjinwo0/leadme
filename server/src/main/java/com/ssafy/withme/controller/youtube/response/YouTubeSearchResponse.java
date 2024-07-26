package com.ssafy.withme.controller.youtube.response;


import com.ssafy.withme.controller.youtube.YouTubeController;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class YouTubeSearchResponse {

    private String videoId;
    private Object snippet;

    @Builder
    public YouTubeSearchResponse(String videoId, Object snippet) {
        this.videoId = videoId;
        this.snippet = snippet;
    }


}
