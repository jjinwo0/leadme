import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { SearchBar } from "../components/SearchBar";
import { FaHeart, FaComment, FaVolumeUp } from "react-icons/fa";
import styled from "styled-components";
import img1 from "../assets/image/img1.png";
import img2 from "../assets/image/img2.png";
import { useEffect, useRef, useState } from "react";

interface Comment {
  id: number;
  text: string;
  user: string;
}

interface Video {
  id: number;
  src: string;
  title: string;
  comments: Comment[];
  likes: number;
}

const videoData: Video[] = [
  {
    id: 1,
    src: img1,
    title: "이주은 챌린지",
    comments: [
      { id: 1, text: "와 정말 멋져요!", user: "댄스팬1" },
      { id: 2, text: "춤 실력이 대단해요", user: "음악매니아" },
      { id: 3, text: "다음 영상도 기대됩니다", user: "챌린지러버" },
      { id: 4, text: "이주은 선수 최고!", user: "치어리더팬" },
    ],
    likes: 1543,
  },
  {
    id: 2,
    src: img2,
    title: "카리나 챌린지",
    comments: [
      { id: 1, text: "카리나 춤선 진짜 예뻐요", user: "aespa팬" },
      { id: 2, text: "이 챌린지 너무 재밌어 보여요", user: "댄스챌린저" },
      { id: 3, text: "저도 따라해보고 싶어요!", user: "kpop팬" },
      { id: 4, text: "카리나 영상 더 올려주세요~", user: "뮤직비디오팬" },
    ],
    likes: 2100,
  },
  {
    id: 3,
    src: img1,
    title: "뉴진스 하입보이 챌린지",
    comments: [
      { id: 1, text: "뉴진스 노래 중에 최고인 것 같아요", user: "하입보이팬" },
      { id: 2, text: "안무가 너무 중독적이에요", user: "댄스매니아" },
      { id: 3, text: "이 챌린지 진짜 유행이네요", user: "트렌드워처" },
      { id: 4, text: "다들 너무 잘하시는 것 같아요", user: "일반인" },
    ],
    likes: 3200,
  },
  {
    id: 4,
    src: img2,
    title: "윈터 챌린지",
    comments: [
      { id: 1, text: "윈터 춤 실력 대박이에요", user: "aespa사랑해" },
      { id: 2, text: "이 부분 안무가 진짜 예뻐요", user: "댄스학도" },
      { id: 3, text: "윈터 표정 연기도 일품!", user: "연기덕후" },
      { id: 4, text: "다음에는 카리나 버전도 보고 싶어요", user: "올라운더팬" },
    ],
    likes: 1876,
  },
  {
    id: 5,
    src: img1,
    title: "아이브 러브다이브 챌린지",
    comments: [
      { id: 1, text: "아이브 노래는 항상 중독적이에요", user: "음악중독자" },
      { id: 2, text: "이 안무 진짜 따라하기 어려워요ㅠㅠ", user: "춤린이" },
      { id: 3, text: "원주민 버전도 보고 싶어요!", user: "아이브팬" },
      {
        id: 4,
        text: "이 챌린지 덕분에 노래가 더 좋아졌어요",
        user: "일반청취자",
      },
    ],
    likes: 4150,
  },
  {
    id: 6,
    src: img2,
    title: "챌린지",
    comments: [
      { id: 1, text: "카리나 춤선 진짜 예뻐요", user: "aespa팬" },
      { id: 2, text: "이 챌린지 너무 재밌어 보여요", user: "댄스챌린저" },
      { id: 3, text: "저도 따라해보고 싶어요!", user: "kpop팬" },
      { id: 4, text: "카리나 영상 더 올려주세요~", user: "뮤직비디오팬" },
    ],
    likes: 2100,
  },
];
export const SearchResultDetail: React.FC = () => {
  const { query } = useParams();
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
          <VideoSlide
            key={video.id}
            isActive={index === currentIndex}
            showComments={showComments}
          >
            <VideoContent>
              <VideoThumbnail src={video.src} alt={video.title} />
              <ActionButtons>
                <ActionButton onClick={() => console.log("Liked")}>
                  <FaHeart />
                  <span>{video.likes}</span>
                </ActionButton>
                <ActionButton onClick={toggleComments}>
                  <FaComment />
                  <span>{video.comments.length}</span>
                </ActionButton>
                <ActionButton onClick={() => console.log("Sound toggled")}>
                  <FaVolumeUp />
                </ActionButton>
              </ActionButtons>
            </VideoContent>
            <CommentSection show={showComments}>
              <CommentHeader>댓글 {video.comments.length}</CommentHeader>
              <CommentList>
                {video.comments.map((comment) => (
                  <CommentItem key={comment.id}>
                    <CommentUser>{comment.user}</CommentUser>
                    <CommentText>{comment.text}</CommentText>
                  </CommentItem>
                ))}
              </CommentList>
            </CommentSection>
          </VideoSlide>
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
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  height: calc(100vh - 100px);
  &::-webkit-scrollbar {
    display: none;
  }
`;

const VideoSlide = styled.div<{ isActive: boolean; showComments: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  scroll-snap-align: center;
  height: calc(100vh - 115px);
  width: 100%;
  transition: transform 0.3s ease-in-out;
  transform: ${(props) =>
    props.showComments ? "translateX(-20%)" : "translateX(0)"};
`;

const VideoContent = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const VideoThumbnail = styled.img`
  width: 24vw;
  height: 80vh;
  max-width: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

const ActionButtons = styled.div`
  position: absolute;
  right: -60px;
  bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const ActionButton = styled.button`
  background: #fff;
  opacity: 0.8;
  border: none;
  color: #ee5050;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  justify-content: center;

  span {
    font-size: 12px;
    margin-top: 5px;
  }
`;

const CommentSection = styled.div<{ show: boolean }>`
  position: absolute;
  top: 0;
  right: ${(props) => (props.show ? "0" : "-40%")};
  width: 30%;
  height: 100%;
  padding: 20px;
  overflow-y: auto;
  transition: right 0.3s ease-in-out;
  z-index: 1000;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.8);
`;

const CommentHeader = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 15px;
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const CommentUser = styled.div`
  color: gray;
  font-weight: 600;
  margin-bottom: 2px;
`;

const CommentText = styled.div`
  color: gray;
`;
