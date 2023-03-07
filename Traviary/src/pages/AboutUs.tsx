/** @format */

import { profile } from "@/data/profile";
import { SUNGJIN, YOUNGBIN } from "@components/constant";
import styled from "styled-components";
const AboutUs = () => {
  return (
    <Container>
      <div className="wrapper">
        <Title>ABOUT US</Title>
        <div className="profile">
          {profile.map(item => (
            <Profile key={`${item.id}${item.name}`}>
              <div
                className="profile_img"
                style={{ backgroundImage: `url(${item.bgUrl})` }}
              ></div>
              <div className="info">
                <span className="category">Name</span>
                <p className="content">{item.name}</p>
                <span className="category">Position</span>
                <p className="content">{item.position}</p>
                <span className="category">Role</span>
                <p className="content">{item.role}</p>
              </div>
              <div className="info">
                <span className="category">YEAR</span>
                <p className="content">{item.year}</p>
              </div>
              <div className="info">
                <span className="category">GRADUATE</span>
                <p className="content">{item.graduate}</p>
              </div>
              <div className="info">
                <span className="category">EXPERIENCE</span>
                <p className="content">{item.career}</p>
              </div>
            </Profile>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default AboutUs;

const Container = styled.section`
  width: 100vw;
  height: 100vh;
  .wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .profile {
      justify-content: center;
      align-items: center;
      display: flex;
    }
  }
`;
const Profile = styled.div`
  min-width: 300px;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  background-image: linear-gradient(#fff, #fff),
    linear-gradient(to right, #e77cb9, #e1306c, #fd1d1d, #f56040);
  background-origin: border-box;
  background-clip: content-box, border-box;
  border-radius: 20px;
  margin: 10px;
  border: 5px solid transparent;
  .profile_img {
    margin: 10px;
    width: 200px;
    height: 200px;
    border-radius: 100%;
    border: 2px solid #000;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .info {
    margin: 2px 10px;

    .category {
      font-size: 1.5em;
      font-weight: bold;
    }
    .content {
      font-size: 1.2em;
    }
  }
`;

const Title = styled.h1`
  font-size: 5.6em;
  font-weight: 900;
`;
