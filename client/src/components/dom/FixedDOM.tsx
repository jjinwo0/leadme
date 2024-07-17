import styled from "styled-components";
export const FixedDOM = () => {
  return (
    <FixedDOMWrapper id="fixed">
      <h2>SNS 업로드 기능까지</h2>
      <p>인스타와 유튜브에 바로 업로드 가능</p>
    </FixedDOMWrapper>
  );
};

const FixedDOMWrapper = styled.div`
  text-align: right;
  flex-direction: column;
  justify-content: center;
  width: 500px;
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
    color: #fffaec;
    font-size: 32px;
    font-weight: 600;
    margin-bottom: 32px;
  }

  & > p {
    color: #c9c9c9;
    font-size: 22px;
    font-weight: 400;
  }
`;
