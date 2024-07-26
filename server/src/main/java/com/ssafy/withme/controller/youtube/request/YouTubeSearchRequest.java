package com.ssafy.withme.controller.youtube.request;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class YouTubeSearchRequest {
    private String part;
    private String q;
    private String type;
    private String videoDuration;
    private Long maxResults;
    private String pageToken;
}
