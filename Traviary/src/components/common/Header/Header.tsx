/** @format */

import { useEffect, useState } from "react";
import styled from "styled-components";
import GlobalStyle from "@/assets/Globalstyles";
import SocialLogin from "@components/Auth/SocialLogin";

// react-icons
import { GiPalmTree } from "react-icons/gi";
import { BiLogOut } from "react-icons/bi";
import { MdPostAdd } from "react-icons/md";

import { Link, useNavigate } from "react-router-dom";
import { authService } from "@/fbase";
import OpenCreateModal from "@components/CreateCard/OpenCreateModal";
import { useRecoilState } from "recoil";
import { login } from "@/Store/login";

const { VITE_FIREBASE_API_KEY } = import.meta.env;

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState<boolean>(login);
  const [userObj, setUserObj] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPostClose, setShowPostClose] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    authService.onAuthStateChanged(user => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);
  const Logout = () => {
    authService.signOut();
    localStorage.removeItem(
      `firebase:authEvent:${VITE_FIREBASE_API_KEY}:[DEFAULT]`
    );
    navigate("/");
  };

  const toggleAddPost = () => {
    setIsModalOpen(prev => !prev);
    setShowPostClose(prev => !prev);
  };

  return (
    <>
      <Headers>
        <GlobalStyle />
        <LogoWrapper>
          <GiPalmTree className="logo" />
          <Title>
            {isLoggedIn ? (
              <Link to="/main">
                <span>Traviary</span>
              </Link>
            ) : (
              <Link to="/">
                <span>Traviary</span>
              </Link>
            )}
          </Title>
        </LogoWrapper>

        {!isLoggedIn ? (
          <IconWrapper>
            <SocialLogin />
          </IconWrapper>
        ) : (
          <IconWrapper>
            <MdPostAdd className="icon" onClick={toggleAddPost} />
            <BiLogOut className="icon" onClick={Logout} />
          </IconWrapper>
        )}
      </Headers>

      <OpenCreateModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        userObj={userObj}
      />
    </>
  );
}

const Headers = styled.header`
  background: var(--tab-bgcolor);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
`;

const LogoWrapper = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  .logo {
    font-size: 50px;
    margin-right: 5px;
    color: var(--main-color);
  }
  padding: 20px;
  @media screen and (min-width: 900px) {
    width: 100%;
  }
`;
const Title = styled.h1`
  font-size: 50px;
  color: var(--main-color);
  font-weight: 700;
  font-family: var(--font-lobster);

  @media screen and (min-width: 400px) {
    font-size: calc(var(--base-size) * 3);
  }
`;
const IconWrapper = styled.div`
  width: 20%;
  display: flex;
  cursor: pointer;
  .icon {
    width: 30px;
    font-size: calc(var(--base-size) * 4);
    margin-right: 30px;
    color: var(--main-color);
    cursor: pointer;
  }
  @media screen and (max-width: 900px) {
    width: 50%;
    .icon {
      font-size: 40px;
      margin-right: 30px;
      color: var(--main-color);
      cursor: pointer;
    }
  }
  @media screen and (max-width: 500px) {
    width: 50%;
    .icon {
      margin-right: 5px;
      cursor: pointer;
    }
  }
  @media screen and (max-width: 400px) {
    width: 50%;
    .icon {
      margin-right: 5px;
      cursor: pointer;
    }
  }
`;

const ModalContainer = styled.div`
  /* width: 1020px;
  height: 100%; */
  @media screen and (max-width: 900px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 500px;
  }
  @media screen and (max-width: 500px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 95%;
    height: 500px;
  }
  @media screen and (max-width: 400px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 92%;
    height: 500px;
  }
`;
