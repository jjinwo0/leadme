import styled from "styled-components";
import Header from "./../components/Header";
import { SearchBar } from "../components/SearchBar";

const Search = () => {
  return (
    <>
      <Header />
      <Container>
        <SearchBar width={755} />
      </Container>
    </>
  );
};

const Container = styled.div`
  padding-top: 50px;
`;

export default Search;
