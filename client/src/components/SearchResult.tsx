import React from "react";
import styled from "styled-components";
import img1 from "../assets/image/img1.png";
import img2 from "../assets/image/img2.png";

interface SearchResultProps {
  platform: string;
}

interface ImageData {
  id: number;
  src: string;
  title: string;
}

const imageData: ImageData[] = [
  {
    id: 1,
    src: img1,
    title: "윈터와 카리나의 블라 블라 ",
  },
  {
    id: 2,
    src: img2,
    title: "카리나 챌린지 카리나 챌린지 카리나asdf 챌린지 카리나 챌린지",
  },
  { id: 3, src: img1, title: "이주은 챌린지" },
  { id: 4, src: img2, title: "카리나 챌린지 카리나 챌린지" },
];

const SearchResult: React.FC<SearchResultProps> = ({ platform }) => {
  return (
    <Container>
      <Title>{platform}</Title>
      <Slider>
        {imageData.map((img) => (
          <ContentSection key={img.id}>
            <FeedImage src={img.src} />
            <FeedTitle>{img.title}</FeedTitle>
          </ContentSection>
        ))}
      </Slider>
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
  padding: 35px 40px;
  position: relative;
  z-index: 100;

  &::before {
    content: "";
    width: 100%;
    height: 50%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-radius: 0 0 20px 20px;
    z-index: -50;

    background: linear-gradient(
      to top,
      rgba(255, 255, 255, 0.9) 50%,
      rgba(255, 255, 255, 0) 100%
    );
  }
`;

const Title = styled.div`
  font-size: 40px;
  font-weight: 600;
  font-family: "Rajdhani", sans-serif;
`;

const Slider = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ContentSection = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  &:hover {
    img {
      transform: scale(1.05);
    }
  }
`;

const FeedImage = styled.img`
  width: 200px;
  height: 355.5px;
  border-radius: 8px;
  object-fit: cover;
  margin: 30px 0 12px;

  cursor: pointer;

  transition: all 0.3s ease;
`;

const FeedTitle = styled.div`
  color: #ee5050;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 500;
  width: 200px;
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

export default SearchResult;
