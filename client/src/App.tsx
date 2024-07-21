import React from "react";
import { Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { MainCanvas } from "./components/MainCanvas";
import { FixedDOM } from "./components/dom/FixedDOM";
import { ThemeProvider } from "styled-components";
import theme from "./theme";
import GlobalStyle from "./globalStyles";
import styled from "styled-components";
import Home from "./pages/Home";
import Rank from "./pages/Rank";
import Search from "./pages/Search";
import Challenge from "./pages/Challenge";

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes>
          <Route
            path="/"
            element={
              <Wrapper>
                <MainCanvas />
                <FixedDOM />
              </Wrapper>
            }
          ></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/rank" element={<Rank />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/challenge" element={<Challenge />}></Route>
        </Routes>
      </ThemeProvider>
    </RecoilRoot>
  );
};

export default App;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;
