import { useRecoilValue } from "recoil";
import { IsEnteredAtom } from "../../stores";
import { useRef } from "react";
import { Scroll, useScroll } from "@react-three/drei";
import styled from "styled-components";
import { useFrame } from "@react-three/fiber";
import { useNavigate } from "react-router-dom";

export const MovingDOM = () => {
  const isEntered = useRecoilValue(IsEnteredAtom);
  const fixed = document.getElementById("fixed"); // FixedDOM에서 아이디가 fixed인거 찾아옴
  const scroll = useScroll();
  const nav = useNavigate();
  const article01Ref = useRef<HTMLDivElement>(null);
  const article02Ref = useRef<HTMLDivElement>(null);
  const article03Ref = useRef<HTMLDivElement>(null);
  const article04Ref = useRef<HTMLDivElement>(null);
  const article08Ref = useRef<HTMLDivElement>(null);

  useFrame(() => {
    if (
      !isEntered ||
      !fixed ||
      !article01Ref.current ||
      !article02Ref.current ||
      !article03Ref.current ||
      !article04Ref.current ||
      !article08Ref.current
    )
      return;
    article01Ref.current.style.opacity = `${1 - scroll.range(0, 1 / 8)}`;
    article02Ref.current.style.opacity = `${1 - scroll.range(1 / 8, 1 / 8)}`; // 1/8에서 1/8 스크롤 할동안 사용
    article03Ref.current.style.opacity = `${scroll.curve(2 / 8, 1 / 8)}`; // 2/8에서 1/8 스크롤 할동안 사용
    article04Ref.current.style.opacity = `${scroll.curve(3 / 8, 1 / 8)}`; // 2/8에서 1/8 스크롤 할동안 사용

    if (scroll.visible(4 / 8, 3 / 8)) {
      fixed.style.display = "flex";
      fixed.style.opacity = `${scroll.curve(4 / 8, 3 / 8)}`;
    } else {
      fixed.style.display = "none";
    }
    article08Ref.current.style.opacity = `${scroll.range(7 / 8, 1 / 8)}`; // 2/8에서 1/8 스크롤 할동안 사용
  });

  if (!isEntered) return null;

  return (
    <Scroll html>
      <ArticleWrapper ref={article01Ref}>
        <TitleBox>
          <h1>LeadMe</h1>
        </TitleBox>
      </ArticleWrapper>
      <ArticleWrapper ref={article02Ref}>
        <RightBox>
          <h1>모든 플랫폼 검색을 한 번에</h1>
          <p>유튜브, 인스타, 틱톡의 모든 숏츠 영상을 한 번의 검색으로</p>
        </RightBox>
      </ArticleWrapper>
      <ArticleWrapper ref={article03Ref}>
        <LeftBox>
          <h1>AI 기반 분석 레포트</h1>
          <div>
            <p>AI 기술을 활용한 분석 보고서로 춤 연습을 더욱 효율적으로</p>
          </div>
        </LeftBox>
      </ArticleWrapper>
      <ArticleWrapper className="height-4" ref={article04Ref}></ArticleWrapper>
      <ArticleWrapper ref={article08Ref}>
        <EnterBtn onClick={() => nav("/home")}>START</EnterBtn>
      </ArticleWrapper>
    </Scroll>
  );
};

const ArticleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  width: 100vw;
  height: 100vh;
  &.height-4 {
    height: 400vh;
  }
  background-color: transparent;
  color: #ffffff;
  font-size: 24px;
  padding: 40px;
`;

const TitleBox = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: flex-start;
  min-width: fit-content;
  height: 400px;
  & h1 {
    font-size: 140px;
    font-weight: bold;
  }
`;

const LeftBox = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: flex-start;
  min-width: fit-content;
  height: 400px;
  & > h1 {
    margin-bottom: 30px;
    font-size: 40px;
    font-weight: bold;
  }
  & > div {
    line-height: 35px;
  }
`;

const RightBox = styled.div`
  text-align: right;
  padding: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: flex-end;
  min-width: fit-content;
  height: 400px;
  & > h1 {
    margin-bottom: 30px;
    font-size: 40px;
    font-weight: bold;
  }
`;

const EnterBtn = styled.button`
  flex-direction: column;
  justify-content: center;
  color: #fff;
  background-color: rgba(0.2, 0.2, 0.2, 0.8);
  border: 2px solid #fff;
  width: 300px;
  height: 100px;
  font-size: 35px;
  border-radius: 8px;
  margin-bottom: 260px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.05);
    background-color: rgba(0.2, 0.2, 0.2, 1);
  }
`;
