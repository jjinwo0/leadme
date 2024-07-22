import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const Header: React.FC = () => {
  const location = useLocation();

  const getPageTitle = (path: string): string => {
    switch (path) {
      case "/home":
        return "LeadMe";
      case "/search":
        return "Search";
      case "/challenge":
        return "Challenge";
      case "/rank":
        return "Rank";
      default:
        return "LeadMe";
    }
  };

  return (
    <>
      <Top>
        <TopLeft>
          Let's dance with
          <br />
          LeadMe
        </TopLeft>
        <TopCenter>{getPageTitle(location.pathname)}</TopCenter>
        <TopRight>
          <div>
            feat. Instagram
            <br />
            TikTok
            <br />
            YouTube
          </div>
          <LoginBtn>Login</LoginBtn>
        </TopRight>
      </Top>
      <StickyNav>
        <Bottom>
          <StyledLink to="/home">home</StyledLink>
          <StyledLink to="/search">search</StyledLink>
          <StyledLink to="/challenge">challenge</StyledLink>
          <StyledLink to="/rank">rank</StyledLink>
        </Bottom>
      </StickyNav>
    </>
  );
};

const Top = styled.div`
  width: 100%;
  padding: 18px 30px 8px;
  color: #ee5050;
  font-size: 19px;
  font-family: "Rajdhani", sans-serif;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  border-bottom: 1px solid #ee5050;
  background-color: #f6efed;
  position: relative;
`;

const TopLeft = styled.div`
  width: 200px;
  text-align: left;
  font-weight: 600;
`;

const TopCenter = styled.div`
  font-weight: 700;
  font-size: 108px;
`;

const TopRight = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
  font-weight: 600;
`;

const LoginBtn = styled.button`
  width: 72px;
  padding: 1px 0;
  color: #ee5050;
  font-size: 19px;
  font-weight: 600;
  font-family: "Rajdhani", sans-serif;
  border: 1px solid #ee5050;
  border-radius: 4px;
  background-color: #ffffff;
  margin-top: 8px;
  cursor: pointer;
`;

const StickyNav = styled.div`
  position: sticky;
  top: 0;
  z-index: 5000;
  background-color: #f6efed;
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-bottom: 1px solid #ee5050;
`;

const StyledLink = styled(Link)`
  color: #ee5050;
  font-size: 18px;
  font-family: "Noto Sans", sans-serif;
  text-decoration: none;
  padding: 9px 14px;
  margin: 0 18px;

  &:hover {
    color: #ff7676;
    text-decoration: underline;
  }
`;

export default Header;
