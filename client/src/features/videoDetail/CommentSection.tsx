import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Comment } from "types/index";
import { FaComment } from "react-icons/fa";

interface CommentSectionProps {
  show: boolean;
  userChallengeId: number;
}

export const CommentSection: React.FC<CommentSectionProps> = ({
  show,
  userChallengeId,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (show) {
      const fetchComments = async () => {
        try {
          const response = await axios.get(`/api/comments/${userChallengeId}`);
          // 받은 데이터가 배열인지 확인
          if (Array.isArray(response.data)) {
            setComments(response.data);
          } else {
            setComments([]); // 배열이 아닌 경우 빈 배열로 설정
          }
        } catch (error) {
          console.error("댓글을 가져오는 중 오류 발생:", error);
          setComments([]); // 오류 발생 시 빈 배열로 설정
        }
      };

      fetchComments();
    }
  }, [show, userChallengeId]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("ko-KR", options);
  };

  return (
    <CommentSectionWrapper $show={show}>
      <CommentHeader>
        <StyledFaCommentAlt />
        <div>{comments.length}</div>
      </CommentHeader>
      <CommentList>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <CommentItem key={index}>
              <div>
                <img src={comment.profileImg} alt="프로필" />
              </div>
              <div>
                <CommentText>{comment.content}</CommentText>
                <CommentUser>
                  <div>{formatDate(comment.createdData)}</div>
                </CommentUser>
              </div>
            </CommentItem>
          ))
        ) : (
          <NoComment>등록된 댓글이 없습니다</NoComment>
        )}
      </CommentList>
      <Input>
        <input type="text" placeholder="댓글 작성 (Enter로 업로드)" />
      </Input>
    </CommentSectionWrapper>
  );
};

const StyledFaCommentAlt = styled(FaComment)`
  margin-right: 12px;
  color: #ff7676;
  font-size: 18px;
  vertical-align: middle;
`;

const CommentSectionWrapper = styled.div<{ $show: boolean }>`
  position: absolute;
  top: 0;
  right: ${(props) => (props.$show ? "0" : "-40%")};
  width: 400px;
  height: 533px;
  overflow-y: auto;
  transition: right 0.3s ease-in-out;
  margin-right: 48px;
  z-index: 1000;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.8);
`;

const CommentHeader = styled.h2`
  font-size: 24px;
  font-weight: 600;
  display: flex;
  align-items: center;
  padding: 14px 24px;
  background-color: #ffffff;
  z-index: -1;

  & > div {
    font-size: 20px;
    margin-bottom: 2px;
  }
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 24px;
  height: 414px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 15px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #dfdfdf;
    border-radius: 10px;
    border: 4px solid rgba(0, 0, 0, 0);
    background-clip: padding-box;
    cursor: pointer;
  }
`;

const CommentItem = styled.div`
  display: flex;
  flex-direction: row;
  padding: 12px 0;

  & > div:first-child {
    background-color: #e2e2e2;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin-right: 8px;
  }

  &:first-child {
    padding: 0 0 8px;
  }

  &:last-child {
    padding: 8px 0 0;
  }
`;

const CommentUser = styled.div`
  color: #c0c0c0;
  margin-bottom: 2px;
  display: flex;
  align-items: center;
  font-size: 14px;

  & > div:last-child {
    font-size: 12px;
  }
`;

const CommentText = styled.div`
  color: #ee5050;
  margin-bottom: 5px;
  font-size: 15px;
  font-family: "Noto Sans KR", sans-serif;
`;

const Input = styled.div`
  padding: 16px 0 20px;
  margin-top: 8px;
  width: 100%;
  position: absolute;
  bottom: 0;
  background-color: #ffffff;

  & > input {
    display: block;
    width: 90%;
    margin: 0 auto;
    color: #ee5050;
    font-size: 14px;
    font-family: "Noto Sans KR", sans-serif;
    outline: none;
    border: 1px solid #dedede;
    border-radius: 16px;
    padding: 7px 16px;

    &::placeholder {
      color: #bbbbbb;
    }
  }
`;

const NoComment = styled.div`
  text-align: center;
  color: #bbbbbb;
  padding-top: 8px;
  font-size: 14px;
  font-family: "Noto Sans KR", sans-serif;
`;

export default CommentSection;
