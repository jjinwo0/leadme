import React from "react";
import styled from "styled-components";

interface SendModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FindModal: React.FC<SendModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <Container onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>New Chat</Title>
        <Form>
          <input type="text" placeholder="받는 사람" />
          <div>계정을 찾을 수 없습니다.</div>
          <button>start</button>
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
  margin-bottom: 24px;
`;

const Form = styled.form`
  width: 92%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  input {
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
    color: #cecece;
    font-size: 16px;
    font-weight: 400;
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
    background-color: #f3f3f3;
    box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
    cursor: pointer;
  }

  div {
    width: 100%;
    height: 130px;
    margin-bottom: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Noto Sans KR", sans-serif;
    font-size: 15px;
    color: #c0c0c0;
  }
`;

export default FindModal;
