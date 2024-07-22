import { useParams } from "react-router-dom";
import Header from "../components/Header";

export const SearchResultDetail: React.FC = () => {
  const { query } = useParams();

  return (
    <>
      <Header stickyOnly />
      <div>검색결과:{query}</div>
    </>
  );
};
