import { useState } from "react";
import { LoginModal } from "./LoginModal";

const Home = () => {
  const [loginModalState, setLoginModalState] = useState<boolean>(false);
  const handleModalOnClick = () => {
    setLoginModalState(!loginModalState);
  };
  return (
    <div>
      <div>home</div>
      <button onClick={handleModalOnClick}>로그인</button>
      {loginModalState ? <LoginModal /> : null}
    </div>
  );
};

export default Home;
