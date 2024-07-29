import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

interface VideoPlayerProps {
  video: {
    videoId: string;
    snippet: {
      title: string;
      thumbnails: {
        high: {
          url: string;
        };
      };
    };
  };
  isActive: boolean;
  onIntersection: (videoId: string, isIntersecting: boolean) => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  video,
  isActive,
  onIntersection,
}) => {
  const [canEmbed, setCanEmbed] = useState(true);
  const videoRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const currentVideoRef = videoRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        onIntersection(video.videoId, entry.isIntersecting);
      },
      {
        threshold: 0.7,
      }
    );

    if (currentVideoRef) {
      observer.observe(currentVideoRef);
    }

    return () => {
      if (currentVideoRef) {
        observer.unobserve(currentVideoRef);
      }
    };
  }, [video.videoId, onIntersection]);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe && canEmbed) {
      if (isActive) {
        iframe.contentWindow?.postMessage(
          '{"event":"command","func":"playVideo","args":""}',
          "*"
        );
      } else {
        iframe.contentWindow?.postMessage(
          '{"event":"command","func":"pauseVideo","args":""}',
          "*"
        );
      }
    }
  }, [isActive, canEmbed]);

  const handleIframeError = () => {
    setCanEmbed(false);
  };

  return (
    <VideoPlayerWrapper ref={videoRef}>
      <VideoContent>
        {canEmbed ? (
          <iframe
            ref={iframeRef}
            src={`https://www.youtube.com/embed/${
              video.videoId
            }?enablejsapi=1&autoplay=${
              isActive ? "1" : "0"
            }&rel=0&modestbranding=1&controls=1`}
            title={video.snippet.title}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onError={handleIframeError}
          />
        ) : (
          <ThumbnailImage
            src={video.snippet.thumbnails.high.url}
            alt={video.snippet.title}
          />
        )}
      </VideoContent>
    </VideoPlayerWrapper>
  );
};

const VideoPlayerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  scroll-snap-align: start;
  height: 90vh;
  width: 100%;
  margin: 5vh 0; // 위아래에 5vh의 마진 추가
`;

const VideoContent = styled.div`
  position: relative;
  width: 39.375vh; // 9:16 비율 유지하면서 높이의 70%로 설정
  height: 70vh; // 화면 높이의 70%로 설정
  display: flex;
  align-items: center;
  justify-content: center;

  iframe,
  img {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 10px;
    object-fit: cover;
  }
`;

const ThumbnailImage = styled.img`
  cursor: pointer;
`;

export default VideoPlayer;
