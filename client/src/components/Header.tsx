import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { FaInstagram } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { useState } from "react";
import { LoginModal } from "../pages/LoginModal";

interface HeaderProps {
  stickyOnly?: boolean;
}

const Header: React.FC<HeaderProps> = ({ stickyOnly = false }) => {
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
      {!stickyOnly && (
        <HeaderWrapper>
          <Top>
            <TopLeft>
              Let's dance with
              <br />
              LeadMe
            </TopLeft>
            <TopCenter>
              <a href="">{getPageTitle(location.pathname)} !</a>
            </TopCenter>
            <TopRight>
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
            </TopRight>
          </Top>
        </HeaderWrapper>
      )}
      <StickyNav>
        <NavContent>
          <StyledLink to="/home">home</StyledLink>
          <StyledLink to="/search">search</StyledLink>
          <StyledLink to="/challenge">challenge</StyledLink>
          <StyledLink to="/rank">rank</StyledLink>
          <LoginBtn
            onClick={() => {
              setLoginModal(!loginModal);
            }}
          >
            login
          </LoginBtn>
        </NavContent>
      </StickyNav>
    </>
  );
};

const HeaderWrapper = styled.header`
  min-width: 1080px;
  margin: 14px 20px -5px;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const Top = styled.div`
  padding: 18px 30px 8px;
  color: #ee5050;
  font-size: 16px;
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
  font-size: 72px;
  margin: 2px 0 6px;

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const TopRight = styled.div`
  width: 200px;
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
  color: #ee5050;
  border: none;
  background-color: inherit;
  font-size: 16px;
  text-decoration: none;
  position: absolute;
  right: 36px;
  cursor: pointer;

  &:hover {
    color: #ff7676;
    text-decoration: underline;
  }
`;

const StickyNav = styled.nav`
  min-width: 1080px;
  position: sticky;
  top: 0px;
  z-index: 999;
  margin: 0px 20px;
  background: linear-gradient(
    to top,
    rgba(255, 255, 255, 1) 80%,
    rgba(255, 255, 255, 0) 100%
  );
  border-radius: 0 0 20px 20px;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const NavContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2.5px 0;
  background: linear-gradient(
    108deg,
    rgba(255, 255, 255, 0.26) 0%,
    rgba(255, 255, 255, 0.07) 100%
  );
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 0 0 20px 20px;
  position: relative;
`;

const StyledLink = styled(Link)`
  color: #ee5050;
  font-size: 16px;
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
