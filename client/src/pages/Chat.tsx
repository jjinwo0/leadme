import Header from "../components/Header";
import styled from "styled-components";
import { useState } from "react";
import { ChatModal } from "../features/Chat/ChatModal";

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
const chatList: ChatData[] = [
  {
    id: 1,
    userId: "user1",
    lastMessage: "안녕하세요!",
    profileImg: "https://via.placeholder.com/40",
    messages: [
      { id: 1, senderId: "user1", content: "안녕하세요!", timestamp: "10:00" },
      { id: 2, senderId: "me", content: "네, 안녕하세요!", timestamp: "10:01" },
      {
        id: 3,
        senderId: "user1",
        content: "오늘 날씨가 좋네요.",
        timestamp: "10:02",
      },
      {
        id: 4,
        senderId: "me",
        content: "어쩌라구요",
        timestamp: "10:03",
      },
      {
        id: 5,
        senderId: "user1",
        content:
          "ajsldsfjksldjflksdjfkljsdklfjklsjdfkljsda kljsdflk jsdaklfj lksdajf klsjadflkjsadlkfjklsdajflk sjdaklf sdakljf klsdajklf jsdaklfj klsadjf ",
        timestamp: "10:03",
      },
      {
        id: 6,
        senderId: "me",
        content: "?????",
        timestamp: "10:03",
      },
    ],
  },
  {
    id: 2,
    userId: "카리나",
    lastMessage: "안녕하세요!",
    profileImg: "https://via.placeholder.com/40",
    messages: [
      { id: 1, senderId: "user1", content: "안녕하세요!", timestamp: "10:00" },
      {
        id: 2,
        senderId: "me",
        content: "오 카리나님 무슨일이에요?",
        timestamp: "10:01",
      },
      {
        id: 3,
        senderId: "user1",
        content: "그냥해봤어요",
        timestamp: "10:02",
      },
      {
        id: 4,
        senderId: "me",
        content: "어쩌라구요",
        timestamp: "10:03",
      },
      {
        id: 5,
        senderId: "user1",
        content: "ㅂㅂㅂ",
        timestamp: "10:03",
      },
    ],
  },
];

export const Chat: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<ChatData | null>(null);

  const openModal = (chat: ChatData) => {
    setSelectedChat(chat);
  };

  const closeModal = () => {
    setSelectedChat(null);
  };

  return (
    <>
      <Header stickyOnly />
      <ChatPageContainer>
        <ChatListContainer>
          <ChatListTitle>Message</ChatListTitle>
          {chatList.map((chat) => (
            <ChatListItem key={chat.id} onClick={() => openModal(chat)}>
              <UserProfileImage
                src={chat.profileImg}
                alt={`${chat.userId}'s profile`}
              />
              <ChatPreviewInfo>
                <ChatUserName>{chat.userId}</ChatUserName>
                <ChatPreviewMessage>{chat.lastMessage}</ChatPreviewMessage>
              </ChatPreviewInfo>
            </ChatListItem>
          ))}
        </ChatListContainer>
        <ChatModal
          isOpen={selectedChat !== null}
          onClose={closeModal}
          chat={selectedChat}
        />
      </ChatPageContainer>
    </>
  );
};

const ChatPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px auto;
  padding: 0 20px;
`;

const ChatListContainer = styled.div`
  width: 530px;
  height: 560px;
  overflow-y: auto;
  padding: 25px;
  border-radius: 10px;
  border: 3px solid rgba(223, 223, 223, 0.4);
  background: rgba(255, 255, 255, 0.75);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10px);

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

const ChatListTitle = styled.h1`
  font-size: 36px;
  font-weight: 600;
  font-family: Rajdhani;
  text-align: center;
`;

const ChatListItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
  &:last-child {
    border-bottom: none;
  }
`;

const UserProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const ChatPreviewInfo = styled.div`
  flex: 1;
`;

const ChatUserName = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
  color: #666;
`;

const ChatPreviewMessage = styled.div`
  color: #666;
  font-size: 0.9em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
