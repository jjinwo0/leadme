import { useState, useEffect } from "react";
import Header from "components/Header";
import styled from "styled-components";
import { ResponseData } from "types";
import { baseUrl } from "axiosInstance/constants";
import { useMutation } from "@tanstack/react-query";
import { IoChevronBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ensureHttps } from "utils/urlUtils";

interface ListData {
  userId: number;
  userNickname: string;
  liked: number;
  followers: number;
  profileImg: string;
}

const Rank: React.FC = () => {
  const [total, setTotal] = useState<number | null>(null);
  const [rankList, setRankList] = useState<ListData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const navigate = useNavigate();
  const usersPerPage = 10;

  const mutationTotal = useMutation<number, Error>({
    mutationFn: async () => {
      const response = await axios.get<ResponseData<number>>(
        `${baseUrl}/api/v1/rank/list`
      );
      return response.data.data;
    },
    onSuccess: (data: number) => {
      console.log(data);
      setTotal(data);
    },
    onError: (error: Error) => {
      console.error("Error fetching totalNum:", error);
    },
  });

  const mutationRank = useMutation<ListData[], Error, number>({
    mutationFn: async (pageNo: number) => {
      const response = await axios.get<ResponseData<ListData[]>>(
        `${baseUrl}/api/v1/rank`,
        {
          params: { pageNo },
        }
      );
      return response.data.data;
    },
    onSuccess: (data: ListData[]) => {
      console.log(data);
      setRankList(data);
    },
    onError: (error: Error) => {
      console.error("Error fetching paging list:", error);
    },
  });

  useEffect(() => {
    if (total === null) {
      mutationTotal.mutate(); // 전체 유저 수 조회
      mutationRank.mutate(currentPage); // 첫 페이지의 랭킹 리스트 조회
    }
  }, [currentPage]);

  useEffect(() => {
    mutationRank.mutate(currentPage); // 페이지 이동 시 새로운 랭킹 리스트 조회
  }, [currentPage]);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = total !== null ? Math.ceil(total / usersPerPage) : 1;

  const handleNextPage = () => {
    if (total !== null) {
      setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    }
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleProfileClick = (id: number) => {
    navigate(`/mypage/${id}`);
  };

  return (
    <>
      <Header />
      <Container>
        <MainSection>
          <TableWrapper>
            <Table>
              <thead>
                <TableRow>
                  <TableHeader>순위</TableHeader>
                  <TableHeader>아이디</TableHeader>
                  <TableHeader>좋아요</TableHeader>
                  <TableHeader>팔로워</TableHeader>
                </TableRow>
              </thead>
              <TBody>
                {rankList.map((item, idx) => (
                  <TableRow
                    key={item.userId}
                    onClick={() => handleProfileClick(item.userId)}
                  >
                    <TableCell>
                      {(currentPage - 1) * usersPerPage + idx + 1}
                    </TableCell>
                    <TableCell>
                      <img src={ensureHttps(item.profileImg)} alt="." />
                      <div>{item.userNickname}</div>
                    </TableCell>
                    <TableCell>{item.liked}</TableCell>
                    <TableCell>{item.followers}</TableCell>
                  </TableRow>
                ))}
              </TBody>
            </Table>
          </TableWrapper>
          <Pagination>
            <div>
              <SideButton
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                <IoChevronBackSharp />
              </SideButton>
              {Array.from({ length: totalPages }, (_, idx) => (
                <PageButton
                  key={idx + 1}
                  onClick={() => handlePageClick(idx + 1)}
                  disabled={currentPage === idx + 1}
                >
                  {idx + 1}
                </PageButton>
              ))}
              <SideButton
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                <IoChevronBackSharp style={{ transform: "rotate(180deg)" }} />
              </SideButton>
            </div>
          </Pagination>
        </MainSection>
      </Container>
    </>
  );
};

export default Rank;

const Container = styled.div`
  min-width: 1120px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px auto;
  gap: 30px;
`;

const MainSection = styled.div`
  width: 1080px;
  height: 673px;
  border-radius: 20px;
  background: linear-gradient(
    108deg,
    rgba(255, 255, 255, 0.26) 0%,
    rgba(255, 255, 255, 0.07) 100%
  );
  box-shadow: 0px 6px 5px 0px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  padding: 35px;
  gap: 35px;
`;

const TableWrapper = styled.div`
  text-align: center;
  border-radius: 15px;
  border: 1px solid #fff;
  background: linear-gradient(
    108deg,
    rgba(255, 255, 255, 0.8) 0%,
    rgba(255, 255, 255, 0.2) 100%
  );
  backdrop-filter: blur(10px);
  margin-top: 12px;
  height: 521.6px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  tbody > tr:last-child {
    border-bottom: none;
  }
`;

const TableRow = styled.tr`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 400;
  border-bottom: 1px solid #fff;
  cursor: pointer;
`;

const TBody = styled.tbody`
  & > tr:hover {
    background-color: rgba(255, 255, 255, 0.85);
  }
`;

const TableHeader = styled.th`
  padding: 10px;
  font-size: 12px;
  font-weight: 700;
  background-color: rgba(255, 255, 255, 0.4);
`;

const TableCell = styled.td`
  padding: 16px;
  font-size: 16px;
  position: relative;

  &:first-child {
    width: 140px;
  }

  &:nth-child(n + 3) {
    width: 250px;
  }

  & > img {
    position: absolute;
    top: 9px;
    left: 108px;
    width: 30px;
    height: 30px;
    margin-right: 12px;
    border-radius: 50%;
  }

  & > div {
    position: absolute;
    left: 160px;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const PageButton = styled.button`
  width: 24px;
  padding: 4px 0;
  margin: 0 2px;
  border: none;
  border-radius: 5px;
  color: #ee5050;
  background-color: inherit;
  cursor: pointer;

  &:hover {
    background-color: #ffffff;
  }
`;

const SideButton = styled.button`
  width: 40px;
  padding: 8px 0;
  margin: 0 14px;
  border: none;
  border-radius: 5px;
  color: #ee5050;
  background-color: inherit;
  cursor: pointer;
`;
