import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body{
        color:${(props) => props.theme.colors.primary} // 기본 글자색 설정
    }
`;

export default GlobalStyle;
