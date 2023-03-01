/** @format */

import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { authService } from "../fbase";
import { useNavigate } from "react-router";

import { AiOutlineGoogle, AiFillGithub } from "react-icons/ai";
import styled from "styled-components";

const SocialLogin = () => {
  const navigate = useNavigate();
  const onSocialClick = async (event: any) => {
    const {
      target: { name },
    } = event;
    let provider: any;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    }
    const data = await signInWithPopup(authService, provider);
    navigate("/main");
    console.log(data);
  };

  return (
    <>
      <IconWrapper>
        <Button onClick={onSocialClick} name="google">
          GOGGLE
        </Button>
      </IconWrapper>
    </>
  );
};

export default SocialLogin;

const IconWrapper = styled.div`
  width: 20%;
  display: flex;
  @media screen and (max-width: 991px) {
    width: 50%;
  }
`;

const Button = styled.button`
  outline: none;
  border: none;
  padding: 1px;
  background: transparent;
  width: 60px;
  font-size: 20px;
  color: #fff;
`;
