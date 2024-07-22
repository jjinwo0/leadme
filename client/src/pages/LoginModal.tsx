import styled from "styled-components";
import { SiNaver } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import { RiKakaoTalkFill } from "react-icons/ri";

interface LoginModalProps {
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  return (
    <Overlay onClick={onClose}>
      <Container onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>Login</Title>
        <SNSBox backgroundColor="#fbff00" hoverColor="#f7e600">
          <IconWrapper>
            <RiKakaoTalkFill style={{ color: "#533030" }} />
          </IconWrapper>
          <span>
            <a
              style={{ color: "#533030" }}
              href="http://localhost:8080/oauth2/authorization/kakao"
            >
              카카오 로그인
            </a>
          </span>
        </SNSBox>

        <SNSBox backgroundColor="#03CF5D" hoverColor="#02b74b">
          <IconWrapper>
            <SiNaver
              style={{ color: "white", width: "18px", height: "18px" }}
            />
          </IconWrapper>
          <span>
            <a
              style={{ color: "#ffffff" }}
              href="http://localhost:8080/oauth2/authorization/naver"
            >
              네이버 로그인
            </a>
          </span>
        </SNSBox>

        <SNSBox backgroundColor="#ffffff" hoverColor="#f0f0f0">
          <IconWrapper>
            <FcGoogle style={{ color: "white" }} />
          </IconWrapper>
          <span>
            <a href="http://localhost:8080/oauth2/authorization/google">
              구글 로그인
            </a>
          </span>
        </SNSBox>
      </Container>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
`;

const Container = styled.div`
  width: 400px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  padding: 20px;
  gap: 10px;
  z-index: 9999;
  border-radius: 10px;
  border: 3px solid rgba(223, 223, 223, 0.4);
  background: rgba(255, 255, 255, 0.75);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  color: #ee5050;
  cursor: pointer;
`;

const Title = styled.h1`
  font-family: "Rajdhani", sans-serif;
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 30px;
`;

interface SNSBoxProps {
  backgroundColor: string;
  hoverColor: string;
}

const SNSBox = styled.div<SNSBoxProps>`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.08),
    0px 2px 3px 0px rgba(0, 0, 0, 0.17);
  margin-bottom: 10px;
  transition: 0.3s ease;
  cursor: pointer;
  background-color: ${(props) => props.backgroundColor};

  &:hover {
    background-color: ${(props) => props.hoverColor};
  }

  span {
    flex: 1;
    text-align: center;
  }
  a {
    text-decoration: none;
    color: #444444;
    font-family: Roboto;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
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
