import React from "react";
import styled from "styled-components";

interface ModalProps {
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <Container>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>Profile</Title>
        <ProfileImg></ProfileImg>
        <Form>
          <Flex>
            <input type="text" placeholder="rain-bow" />
            <CheckButton>중복 확인</CheckButton>
          </Flex>
          <input type="text" placeholder="안녕하세요. 반갑습니다." />
          <button>change</button>
        </Form>
      </Container>
    </Overlay>
  );
};

const Overlay = styled.div`
  min-width: 1120px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.65);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
`;

const Container = styled.div`
  width: 450px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  padding: 40px 36px 28px;

  z-index: 9999;
  border-radius: 10px;
  border: 3px solid rgba(223, 223, 223, 0.4);
  background: rgba(252, 252, 252, 0.8);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.15);
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

const Title = styled.div`
  text-align: center;
  font-family: "Rajdhani", sans-serif;
  font-size: 40px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const ProfileImg = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: #ececec;
  margin-bottom: 24px;
`;

const Form = styled.form`
  width: 92%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > input {
    width: 100%;
    min-width: 348px;
    color: #ee5050;
    font-family: "Noto Sans KR", sans-serif;
    font-size: 14px;
    border: none;
    box-shadow: inset -2px -2px 4px 4px rgba(255, 255, 255, 0.8),
      inset 1px 1px 2px 2px rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    margin-bottom: 20px;
    outline: none;
    padding: 9.5px 20px;
  }

  input::placeholder {
    color: #ee5050;
    font-size: 16px;
  }

  & > input::placeholder {
    font-size: 14px;
  }

  button {
    color: #ee5050;
    font-size: 21px;
    font-weight: 500;
    font-family: "Noto Sans", sans-serif;
    width: 100%;
    border: none;
    border-radius: 6px;
    padding: 6px 0;
    margin: 8px 0;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    cursor: pointer;
  }
`;

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;

  & > input {
    width: 248px;
    color: #ee5050;
    font-family: "Noto Sans KR", sans-serif;
    font-size: 14px;
    border: none;
    box-shadow: inset -2px -2px 4px 4px rgba(255, 255, 255, 0.8),
      inset 1px 1px 2px 2px rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    margin-bottom: 18px;
    outline: none;
    padding: 9.5px 20px;
  }

  input::placeholder {
    color: #ee5050;
    font-size: 16px;
  }

  & > input::placeholder {
    font-size: 14px;
  }
`;

const CheckButton = styled.div`
  width: 84px;
  height: 39px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  background-color: #f3f3f3;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
  font-size: 14px;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 400;
  cursor: pointer;
`;

export default Modal;
