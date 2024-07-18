import styled from "styled-components";
import { SiGoogle, SiKakaotalk, SiNaver } from "react-icons/si";

export const LoginModal = () => {
  return (
    <Container>
      <Title>소셜로그인</Title>
      <SNSBox>
        <IconWrapper style={{ backgroundColor: "yellow" }}>
          <SiKakaotalk style={{ color: "black" }} />
        </IconWrapper>
        <span>
          <a href="#">카카오 로그인</a>
        </span>
      </SNSBox>
      <SNSBox>
        <IconWrapper style={{ backgroundColor: "red" }}>
          <SiGoogle style={{ color: "white" }} />
        </IconWrapper>
        <span>
          <a href="#">구글 로그인</a>
        </span>
      </SNSBox>

      <SNSBox>
        <IconWrapper style={{ backgroundColor: "green" }}>
          <SiNaver style={{ color: "white" }} />
        </IconWrapper>
        <span>
          <a href="#">네이버 로그인</a>
        </span>
      </SNSBox>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  background-color: #fff;
  width: 500px;
  height: 500px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const SNSBox = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f5f5f5;
  }

  span {
    flex: 1;
    text-align: center;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 8px 0 0 8px;

  svg {
    width: 24px;
    height: 24px;
  }
`;
