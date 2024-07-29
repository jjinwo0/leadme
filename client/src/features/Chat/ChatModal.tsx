import styled from "styled-components";
import { useEffect, useRef } from "react";
interface ChatData {
  id: number;
  userId: string;
  lastMessage: string;
  profileImg: string;
  messages: Message[];
}

interface Message {
  id: number;
  senderId: string;
  content: string;
  timestamp: string;
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  chat: ChatData | null;
}

export const ChatModal: React.FC<ChatModalProps> = ({
  isOpen,
  onClose,
  chat,
}) => {
  const modalBodyRef = useRef<HTMLDivElement>(null);

  // 채팅이 길어지면 스크롤이 생기는데 기본적으로 스크롤 젤 위부터 시작
  // 근데 채팅창은 최근메세지 먼저 보여야하니까 제일 아래부터 보이도록
  useEffect(() => {
    if (modalBodyRef.current) {
      modalBodyRef.current.scrollTop = modalBodyRef.current.scrollHeight;
    }
  }, [chat, isOpen]);

  if (!isOpen || !chat) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h2>{chat.userId}</h2>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <ModalBody ref={modalBodyRef}>
          {chat.messages.map((message) => {
            const isMine = message.senderId === "me";
            return (
              <MessageContainer key={message.id} $isMine={isMine}>
                {!isMine && (
                  <ProfileImage src={chat.profileImg} alt={chat.userId} />
                )}
                <MessageContent>
                  <MessageBubble $isMine={isMine}>
                    {message.content}
                  </MessageBubble>
                  <MessageTime $isMine={isMine}>
                    {message.timestamp}
                  </MessageTime>
                </MessageContent>
              </MessageContainer>
            );
          })}
        </ModalBody>
        <MessageInputContainer>
          <MessageInput placeholder="메시지를 입력하세요 (Enter로 전송)" />
        </MessageInputContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  width: 90%;
  max-width: 600px;
  height: 80vh;
  display: flex;
  flex-direction: column;
  color: black;
  margin-top: 50px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
  color: black;
  & h2 {
    font-size: 20px;
    font-weight: 500;
    padding: 5px;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

const ModalBody = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;

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

const MessageContainer = styled.div<{ $isMine: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.$isMine ? "row-reverse" : "row")};
  align-items: flex-start;
  margin-bottom: 10px;
  max-width: 80%;
  ${(props) => (props.$isMine ? "margin-left: auto;" : "margin-right: auto;")}
`;

const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
  align-self: flex-start;
`;

const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: calc(100% - 40px);
`;

const MessageBubble = styled.div<{ $isMine: boolean }>`
  background-color: ${(props) => (props.$isMine ? "white" : "#f8f8f8")};
  border-radius: 20px;
  padding: 10px 15px;
  border: ${(props) => (props.$isMine ? "1px solid #e5e5ea" : "none")};
  word-wrap: break-word;
  max-width: 100%;
`;

const MessageTime = styled.span<{ $isMine: boolean }>`
  font-size: 12px;
  color: #999;
  margin-top: 5px;
  align-self: ${(props) => (props.$isMine ? "flex-end" : "flex-start")};
  padding: 0 6px;
`;

const MessageInputContainer = styled.div`
  display: flex;
  padding: 20px;
  border-top: 1px solid #e0e0e0;
`;

const MessageInput = styled.input`
  flex-grow: 1;
  border: 1px solid #e0e0e0;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 14px;
`;
