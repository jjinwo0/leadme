import React from "react";
import styled from "styled-components";
import { FaHeart, FaComment, FaVolumeUp } from "react-icons/fa";

interface InteractionButtonsProps {
  likes: number;
  commentCount: number;
  onToggleComments: () => void;
}

export const InteractionButtons: React.FC<InteractionButtonsProps> = ({
  likes,
  commentCount,
  onToggleComments,
}) => {
  return (
    <ButtonsWrapper>
      <Button>
        <FaHeart />
        <span>{likes}</span>
      </Button>
      <Button onClick={onToggleComments}>
        <FaComment />
        <span>{commentCount}</span>
      </Button>
      <Button onClick={() => console.log("Sound toggled")}>
        <FaVolumeUp />
      </Button>
    </ButtonsWrapper>
  );
};

const ButtonsWrapper = styled.div`
  position: absolute;
  right: -60px;
  bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Button = styled.button`
  background: #fff;
  opacity: 0.8;
  border: none;
  color: #ee5050;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  justify-content: center;

  span {
    font-size: 12px;
    margin-top: 5px;
  }
`;
