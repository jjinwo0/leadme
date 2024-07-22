<<<<<<< HEAD
import { useState } from "react";
import { LoginModal } from "./LoginModal";
import styled from "styled-components";
import Header from "./../components/Header";

const Home = () => {
  const [loginModalState, setLoginModalState] = useState<boolean>(false);
  const handleModalOnClick = () => {
    setLoginModalState(!loginModalState);
  };
  return (
    <Container>
      <Header />
      <div>home</div>
      <button onClick={handleModalOnClick}>로그인</button>
      {loginModalState ? <LoginModal /> : null}
    </Container>
  );
=======
import PoseLandmarkerComponent from "../components/PoseLandMarker";

const Home = () => {
  return <div>
    <PoseLandmarkerComponent/>
  </div>;
>>>>>>> 90fbcf171036e459ba726097c7b5cc61d91fbf48
};

const Container = styled.div`
  height: 2000px;
`;

export default Home;
