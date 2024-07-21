import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { FaInstagram } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { useState } from "react";
import { LoginModal } from "../pages/LoginModal";
const Header: React.FC = () => {
  const location = useLocation();
  const [loginModal, setLoginModal] = useState<boolean>(false);

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

  const handleCloseModal = () => {
    setLoginModal(false);
  };

  return (
    <>
      {loginModal ? <LoginModal onClose={handleCloseModal} /> : null}
      <HeaderWrapper>
        <Top>
          <TopLeft>
            Let's dance with
            <br />
            LeadMe
          </TopLeft>
          <TopCenter>{getPageTitle(location.pathname)} !</TopCenter>
          <TopRight>
            <div>
              <SnsBox>
                Instagram
                <FaInstagram />
              </SnsBox>
              <SnsBox>
                TikTok
                <FaTiktok />
              </SnsBox>
              <SnsBox>
                YouTube
                <FaYoutube />
              </SnsBox>
            </div>
            <LoginBtn
              onClick={() => {
                setLoginModal(!loginModal);
              }}
            >
              Login
            </LoginBtn>
          </TopRight>
        </Top>
      </HeaderWrapper>
      <StickyNav>
        <NavContent>
          <StyledLink to="/home">home</StyledLink>
          <StyledLink to="/search">search</StyledLink>
          <StyledLink to="/challenge">challenge</StyledLink>
          <StyledLink to="/rank">rank</StyledLink>
        </NavContent>
      </StickyNav>
    </>
  );
};

const HeaderWrapper = styled.header`
  margin: 20px 20px -5px;
`;

const Top = styled.div`
  padding: 18px 30px 8px;
  color: #ee5050;
  font-size: 19px;
  font-family: "Rajdhani", sans-serif;
  display: flex;
  justify-content: space-between;
  border-radius: 20px 20px 0 0;
  background: linear-gradient(
    108deg,
    rgba(255, 255, 255, 0.26) 0%,
    rgba(255, 255, 255, 0.07) 100%
  );
  box-shadow: -4px 0 4px -4px rgba(0, 0, 0, 0.15),
    4px 0 4px -4px rgba(0, 0, 0, 0.15), 0 -4px 4px -4px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
`;
const TopLeft = styled.div`
  width: 200px;
  text-align: left;
  font-weight: 600;
`;

const TopCenter = styled.div`
  font-weight: 700;
  font-size: 80px;
  margin-top: 16px;
`;

const TopRight = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
  font-weight: 600;
`;

const SnsBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 5px;
  gap: 10px;
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
  margin: 4px 0 6px;
  cursor: pointer;
`;

const StickyNav = styled.nav`
  position: sticky;
  top: 0px;
  z-index: 999;
  margin: 0px 20px;
  background: linear-gradient(
    to top,
    rgba(255, 255, 255, 1) 80%,
    rgba(255, 255, 255, 0) 100%
  );
`;

const NavContent = styled.div`
  display: flex;
  justify-content: center;
  padding: 5px 0;
  background: linear-gradient(
    108deg,
    rgba(255, 255, 255, 0.26) 0%,
    rgba(255, 255, 255, 0.07) 100%
  );
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 0 0 20px 20px;
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
