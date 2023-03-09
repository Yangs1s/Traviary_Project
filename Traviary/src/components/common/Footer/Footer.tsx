/** @format */

import { NOTION_URL, REPO_URL } from "@components/constant";
import { BsGithub } from "react-icons/bs";
import { SiNotion } from "react-icons/si";
import { FaRegUserCircle } from "react-icons/fa";
import styled from "styled-components";
import { GiPalmTree } from "react-icons/gi";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <Footers>
      <Logo>
        <GiPalmTree className="logo" />
        <span className="title">Traviary</span>
      </Logo>

      <RightWrapper className="right_wrapper">
        <div className="copyright_wrapper">
          <p>제로베이스,프론트엔드3조</p>
          <p className="copyright">© Traviary. All Rights Reserved.</p>
        </div>
        <Icons>
          <a href={REPO_URL} className="repo_link">
            <BsGithub className="gitHub" />
          </a>
          <a href={NOTION_URL} className="repo_link">
            <SiNotion className="notion" />
          </a>
          <Link to={"/aboutUs"} className="repo_link">
            <FaRegUserCircle className="user" />
          </Link>
        </Icons>
      </RightWrapper>
    </Footers>
  );
}

const Footers = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 10vh;
  background: var(--tab-bgcolor);

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: white;
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 30px;
  margin: 10px;
  .title {
    font-size: 50px;
    color: var(--main-color);
    font-weight: 700;
    font-family: "Lobster", cursive;
  }
  .logo {
    font-size: 50px;
    margin-right: 5px;
    color: var(--main-color);
  }
`;

const RightWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  .copyright_wrapper {
    font-size: 15px;
    .copyright {
    }
  }

  @media screen and (min-width: 240px) and (max-width: 504px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
  }
`;
const Icons = styled.div`
  display: flex;
  margin: 10px;
  .repo_link {
    font-size: 30px;
    margin-right: 5px;
  }
`;
