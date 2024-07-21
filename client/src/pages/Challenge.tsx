import Header from "./../components/Header";
import styled from "styled-components";
import playButtonIcon from "../assets/icons/playButton.png";
import img1 from "../assets/image/img1.png";
import img2 from "../assets/image/img2.png";

interface ImageData {
  id: number;
  src: string;
  title: string;
  tag: string;
}

const imageData: ImageData[] = [
  { id: 1, src: img1, title: "이주은 챌린지", tag: "#기아" },
  { id: 2, src: img2, title: "카리나 챌린지", tag: "#에스파" },
  { id: 3, src: img1, title: "이주은 챌린지", tag: "#치어리더 #기아" },
  { id: 4, src: img2, title: "카리나 챌린지", tag: "#윈터 #카리나" },
];

const Challenge: React.FC = () => {
  return (
    <>
      <Header />
      <PageLayout>
        <MainSection>
          {imageData.map((img) => (
            <ContentSection key={img.id}>
              <TitleSection>
                <MainTitle>{img.title}</MainTitle>
                <PlayButton src={playButtonIcon} />
              </TitleSection>
              <SubTitle>{img.tag}</SubTitle>
              <FeedImage src={img.src} />
            </ContentSection>
          ))}
        </MainSection>
        <MainSection>
          {imageData.map((img) => (
            <ContentSection key={img.id}>
              <TitleSection>
                <MainTitle>{img.title}</MainTitle>
                <PlayButton src={playButtonIcon} />
              </TitleSection>
              <SubTitle>{img.tag}</SubTitle>
              <FeedImage src={img.src} />
            </ContentSection>
          ))}
        </MainSection>
      </PageLayout>
    </>
  );
};

export default Challenge;

const PageLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px auto;
  flex-direction: column;
  gap: 30px;
`;

const MainSection = styled.div`
  width: 1080px;
  height: 500px;
  border-radius: 20px;
  background: linear-gradient(
    118deg,
    rgba(255, 255, 255, 0.26) 5.72%,
    rgba(255, 255, 255, 0.07) 94.28%
  );
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(25px);
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 35px;
  gap: 40px;
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TitleSection = styled.div`
  display: flex;
  align-items: center;
`;

const MainTitle = styled.h1`
  font-size: 20px;
  font-weight: 600;
`;

const PlayButton = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.2);
  }
`;

const SubTitle = styled.div`
  font-size: 14px;
`;
const FeedImage = styled.img`
  width: 200px;
  height: 355.5px;
  border-radius: 8px;
  object-fit: cover;
  cursor: pointer;

  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;
