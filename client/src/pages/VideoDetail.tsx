import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { SearchBar } from "../components/SearchBar";
import { VideoPlayer } from "../features/videoDetail/VideoPlayer";
import { videoData } from "../data/videoData";

export const VideoDetail: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [showComments, setShowComments] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const slideHeight = window.innerHeight;
      const index = Math.round(scrollPosition / slideHeight);
      setCurrentIndex(index);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleComments = () => setShowComments(!showComments);

  return (
    <PageLayout>
      <Header stickyOnly />
      <SearchBarWrapper>
        <SearchBar width={650} />
      </SearchBarWrapper>
      <VideoContainer>
        {videoData.map((video, index) => (
          <VideoPlayer
            key={video.id}
            video={video}
            isActive={index === currentIndex}
            showComments={showComments}
            onToggleComments={toggleComments}
          />
        ))}
      </VideoContainer>
    </PageLayout>
  );
};

const PageLayout = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const SearchBarWrapper = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
`;

const VideoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  height: 100vh;
  &::-webkit-scrollbar {
    display: none;
  }
`;
