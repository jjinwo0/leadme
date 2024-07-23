import styled from "styled-components";
import Header from "./../components/Header";
import { SearchBar } from "../components/SearchBar";
import SearchResult from "./../components/SearchResult";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Container>
        <SearchBar width={750} />
        <SearchResult platform={"YouTube"} />
        <SearchResult platform={"TikTok"} />
        <SearchResult platform={"Instagram"} />
      </Container>
    </>
  );
};

const Container = styled.div`
  min-width: 1120px;
  margin: 50px auto;
`;

export default App;
