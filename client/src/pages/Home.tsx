import { useState } from "react";
import { LoginModal } from "./LoginModal";
import Header from "./../components/Header";

const Home = () => {
  const [loginModalState, setLoginModalState] = useState<boolean>(false);
  const handleModalOnClick = () => {
    setLoginModalState(!loginModalState);
  };
  return (
    <>
      <Header />
      <div>home</div>
      <button onClick={handleModalOnClick}>로그인</button>
      {loginModalState ? <LoginModal /> : null}
    </>
  );
};

export default Home;
