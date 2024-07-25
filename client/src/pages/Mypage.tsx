import React from "react";
import Header from "../components/Header";
import styled from "styled-components";

interface User {
  id: string;
  one_liner: string;
  follower: number;
  following: number;
}

const Mypage: React.FC = () => {
  const user: User = {
    id: "rain-bow",
    one_liner: "안녕하세요. 반갑습니다.",
    follower: 456,
    following: 123,
  };

  return (
    <>
      <Header stickyOnly />
      <Container>
        <MainSection>
          <Title>Profile</Title>
          <ProfileContainer>
            <Flex>
              <ProfileImg />
              <table>
                <tbody>
                  <Tr>
                    <Th>아이디</Th>
                    <Td first>{user.id}</Td>
                  </Tr>
                  <Tr>
                    <Th>한 줄 소개</Th>
                    <Td>{user.one_liner}</Td>
                  </Tr>
                  <Tr>
                    <Th>팔로워</Th>
                    <Td>{user.follower}</Td>
                  </Tr>
                  <Tr>
                    <Th>팔로잉</Th>
                    <Td>{user.following}</Td>
                  </Tr>
                </tbody>
              </table>
            </Flex>
            <BtnContainer>
              <Btn>메세지 목록</Btn>
              <Btn>프로필 편집</Btn>
            </BtnContainer>
          </ProfileContainer>
        </MainSection>
      </Container>
    </>
  );
};

const Container = styled.div`
  min-width: 1120px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px auto;
  flex-direction: column;
  gap: 30px;
`;

const MainSection = styled.div`
  width: 1080px;
  border-radius: 20px;
  background: linear-gradient(
    118deg,
    rgba(255, 255, 255, 0.26) 5.72%,
    rgba(255, 255, 255, 0.07) 94.28%
  );
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(50px);
  padding: 30px 40px 26px;
`;

const Title = styled.div`
  font-family: "Rajdhani", sans-serif;
  font-weight: 600;
  font-size: 36px;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: end;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: -6px;
`;

const ProfileImg = styled.div`
  width: 98px;
  height: 98px;
  background-color: white;
  border-radius: 50%;
  margin-right: 60px;
`;

const Tr = styled.tr`
  text-align: left;
`;

const Th = styled.th`
  font-size: 14px;
  color: #a7a7a7;
  width: 160px;
  padding: 6px;
`;

interface TdProps {
  first?: boolean;
}

const Td = styled.td.withConfig({
  shouldForwardProp: (prop) => prop !== "first",
})<TdProps>`
  font-family: "Noto Sans", sans-serif;
  font-size: ${(props) => (props.first ? "20px" : "14px")};
  font-weight: ${(props) => (props.first ? "500" : "400")};
  color: #ee5050;
  padding: 10px;
`;

const BtnContainer = styled.div`
  display: flex;
  margin-bottom: 8px;
`;

const Btn = styled.div`
  font-size: 14px;
  font-family: "Noto Sans KR", sans-serif;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 4px;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.15);
  padding: 6px 10px;
  margin-left: 14px;
`;

export default Mypage;
