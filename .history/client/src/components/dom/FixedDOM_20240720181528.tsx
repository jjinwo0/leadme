import styled from "styled-components";
export const FixedDOM = () => {
  return (
    <FixedDOMWrapper id="fixed">
      <h1>SNS 업로드 기능까지</h1>
      <div>
        <p>인스타와 유튜브 등의 SNS에 바로</p>
        <p>업로드 할 수 있는 기능까지</p>
      </div>
    </FixedDOMWrapper>
  );
};

const FixedDOMWrapper = styled.div`
  text-align: right;
  flex-direction: column;
  justify-content: center;
  width: 445px;
  height: 400px;
  position: fixed;
  font-size: 24px;
  top: 50%;
  right: 10px;
  transform: translate(-50%, -50%);
  display: none;
  color: #fff;
  z-index: 0;
  pointer-events: none;
  & > h2 {
    color: #f6efed;
    font-size: 54px;
    font-weight: 600;
    margin-bottom: 32px;
  }
  & > div {
    line-height: 35px;
  }
`;
