import React, { useState } from "react";
import styled from "styled-components";
import { BsFillCaretRightFill } from "react-icons/bs";
import youtubeButton from "../../assets/icons/youtubeButton.png";
import tiktokButton from "../../assets/icons/tiktokButton.png";
import instaButton from "../../assets/icons/instaButton.png";
import playButton from "../../assets/icons/playButton.png";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
const API_KEY = "AIzaSyCu0oBuaDUV8ygWfz3bQca0jhcj_1AR7MQ";
const BASE_URL = "https://www.googleapis.com/youtube/v3/search";

interface SearchResultProps {
  platform: string;
}

interface YouTubeItem {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
  };
}

const ITEMS_PER_PAGE = 4;
const SLIDE_WIDTH = 266.5; // 슬라이더 이동 거리 (4개씩만 보이게 했을 때)

const fetchVideos = async ({ pageParam = "", queryKey }: any) => {
  const [_, query] = queryKey;
  const { data } = await axios.get(BASE_URL, {
    params: {
      part: "snippet",
      q: `${query} #shorts #챌린지 #춤 #${query} #dance #댄스챌린지`,
      type: "video",
      videoDuration: "short",
      maxResults: 4,
      pageToken: pageParam,
      key: API_KEY,
    },
  });
  return data;
};

export const SearchResult: React.FC<SearchResultProps> = ({ platform }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const location = useLocation();
  const nav = useNavigate();
  const query = new URLSearchParams(location.search).get("q") || "";

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["videos", query],
    queryFn: fetchVideos,
    getNextPageParam: (lastPage) => lastPage.nextPageToken || undefined,
  });

  const getImg = (pf: string): string => {
    switch (pf) {
      case "YouTube":
        return youtubeButton;
      case "TikTok":
        return tiktokButton;
      case "Instagram":
        return instaButton;
      default:
        return playButton;
    }
  };

  const handleNext = () => {
    const totalVideos = data?.pages.flatMap((page) => page.items).length || 0;
    if (currentIndex + ITEMS_PER_PAGE >= totalVideos && hasNextPage) {
      fetchNextPage();
    }
    setCurrentIndex((prev) =>
      Math.min(prev + ITEMS_PER_PAGE, totalVideos - ITEMS_PER_PAGE)
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - ITEMS_PER_PAGE, 0));
  };

  const handleThumbnailClick = (videoId: string) => {
    nav(`/search/${videoId}?q=${encodeURIComponent(query)}`);
  };

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에러: {(error as Error).message}</div>;
  const videos = data?.pages.flatMap((page) => page.items) || [];

  return (
    <Container>
      <Title>
        <img src={getImg(platform)} alt="platform logo" />
        <div>{platform}</div>
      </Title>
      <SliderContainer>
        {currentIndex > 0 && (
          <LeftBtn onClick={handlePrev}>
            <BsFillCaretRightFill
              color="#ee5050"
              size="24"
              style={{ transform: "rotate(180deg)" }}
            />
          </LeftBtn>
        )}
        <SliderWrapper>
          <Slider $translateValue={-currentIndex * SLIDE_WIDTH}>
            {videos.map((video: YouTubeItem) => (
              <ContentSection
                key={video.id.videoId}
                onClick={() => handleThumbnailClick(video.id.videoId)}
              >
                <FeedImage src={video.snippet.thumbnails.high.url} />
                <FeedTitle>{video.snippet.title}</FeedTitle>
              </ContentSection>
            ))}
          </Slider>
        </SliderWrapper>
        {(currentIndex + ITEMS_PER_PAGE < videos.length || hasNextPage) && (
          <RightBtn onClick={handleNext} disabled={isFetchingNextPage}>
            <BsFillCaretRightFill color="#ee5050" size="24" />
          </RightBtn>
        )}
      </SliderContainer>
      {isFetchingNextPage && <div>로딩 중...</div>}
    </Container>
  );
};

const Container = styled.div`
  width: 1080px;
  min-height: 550px;
  border-radius: 20px;
  margin: 50px auto 56px;
  background: linear-gradient(
    108deg,
    rgba(255, 255, 255, 0.26) 0%,
    rgba(255, 255, 255, 0.07) 100%
  );
  box-shadow: 0px 6px 5px 0px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(15px);
  display: flex;
  flex-direction: column;
  padding: 14px 40px 32px;
  position: relative;
  z-index: 100;

  &::before {
    content: "";
    width: 100%;
    height: 55%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-radius: 0 0 20px 20px;
    z-index: -50;

    background: linear-gradient(
      to top,
      rgba(255, 255, 255, 0.9) 80%,
      rgba(255, 255, 255, 0) 100%
    );
  }
`;

const Title = styled.div`
  font-size: 38px;
  font-weight: 600;
  font-family: "Rajdhani", sans-serif;
  display: flex;
  align-items: center;

  img {
    width: 86px;
    margin-left: -24px;
    margin-top: 4px;
  }

  div {
    margin-left: -6px;
  }
`;

const SliderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const SliderWrapper = styled.div`
  width: 100%;
  overflow: hidden;
`;

interface SliderProps {
  $translateValue: number;
}

const Slider = styled.div<SliderProps>`
  display: flex;
  transition: transform 0.5s ease;
  transform: translateX(${(props) => props.$translateValue}px);
`;

const ContentSection = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  &:hover {
    img {
      transform: scale(1.05);
    }
  }
  &:not(:last-child) {
    margin-right: 66.5px;
  }
`;

const FeedImage = styled.img`
  width: 200px;
  height: 355.5px;
  border-radius: 8px;
  object-fit: cover;
  margin: 10px 0 12px;
  transition: all 0.3s ease;
  cursor: pointer;
`;

const FeedTitle = styled.div`
  color: #ee5050;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 500;
  width: 100%;
  max-height: 40px;
  font-size: 16px;
  line-height: 1.2;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const LeftBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  user-select: none;
  position: absolute;
  top: 200px;
  left: -34px;
  z-index: 150;
`;

const RightBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  user-select: none;
  position: absolute;
  top: 200px;
  right: -34px;
  z-index: 150;
`;
