import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { SearchBar } from "../components/SearchBar";
import styled from "styled-components";

export const SearchResultDetail: React.FC = () => {
  const { query } = useParams();

  return (
    <>
      <Header stickyOnly />
      <PageLayout>
        <SearchBar width={650} />
        <div>검색결과:{query}</div>
      </PageLayout>
    </>
  );
};

const PageLayout = styled.div`
  display: flex;
  align-items: center;
  margin: 30px 20px;
  padding: 30px;
  flex-direction: column;
  gap: 30px;
  border-radius: 20px;
  background: linear-gradient(
    108deg,
    rgba(255, 255, 255, 0.26) 0%,
    rgba(255, 255, 255, 0.07) 100%
  );

  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(15px);
  height: 100vh;
`;
