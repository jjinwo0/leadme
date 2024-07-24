import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "reset-css";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { accessTokenState } from "./stores/authAtom";

const Root = () => {
  const setAccessToken = useSetRecoilState(accessTokenState);

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    if (token) {
      setAccessToken(token);
    }
  }, [setAccessToken]);

  return <App />;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <BrowserRouter>
      <React.StrictMode>
        <Root />
      </React.StrictMode>
    </BrowserRouter>
  </RecoilRoot>
);
