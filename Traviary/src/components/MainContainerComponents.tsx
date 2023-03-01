/** @format */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Gallery from "./common/Gallery";
import ReadPost from "./ReadPost";
import { dbService, authService } from "../fbase";
import {
  collection,
  query,
  onSnapshot,
  Timestamp,
  orderBy,
} from "firebase/firestore";

interface TraviProp {
  id?: string;
  text?: string;
  creatAt?: Timestamp;
  createdId?: string;
  fileAttachURL: string;
}
const MainContainerComponents = () => {
  const [isOpenPost, setIsOpenPost] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [travis, setTravis] = useState<TraviProp[]>([]);
  const [postId, setPostId] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    setTimeout(() => {
      const q = query(collection(dbService, "TraviDB"));
      onSnapshot(q, querySnapshot => {
        const Travi: any = querySnapshot.docs.map(docs => ({
          id: docs.id,
          ...docs.data(),
        }));
        setTravis(Travi);
      });
      setIsLoading(true);
    }, 5000);
  }, []);

  useEffect(() => {
    authService.onAuthStateChanged((user: any) => {
      setUserId(user);
    });
  });

  const handleOpenPost = (event: React.MouseEvent<HTMLImageElement>) => {
    event.preventDefault();
    setIsOpenPost(prev => !prev);
    setPostId(event.currentTarget.id);
  };

  const handlePostClose = () => {
    setIsOpenPost(prev => !prev);
  };

  console.log(isLoading);
  return (
    <Container className="main_container">
      <GridContainer className="grid">
        {travis.map(
          (travi: TraviProp) =>
            isLoading && (
              <ImgItem key={travi.id}>
                <img
                  id={travi.id}
                  src={travi.fileAttachURL}
                  alt="게시글이미지"
                  onClick={handleOpenPost}
                  className="image"
                />
              </ImgItem>
            )
        )}
      </GridContainer>

      {travis.map(travi => {
        return (
          <>
            {postId === travi.id ? (
              <ReadPost
                isPostOpen={!isOpenPost}
                traviObj={travi}
                userObj={userId}
                onClose={handlePostClose}
              />
            ) : null}
          </>
        );
      })}
    </Container>
  );
};
export default MainContainerComponents;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  @media screen and (max-width: 900px) {
    width: 100%;
    height: 100%;
    margin: 0;
  }
  @media screen and (max-width: 400px) {
    width: 100%;
    height: 100%;
    margin: 0;
  }
`;

const GridContainer = styled.div`
  width: 100%;
  height: auto;
  background: #fff;
  border: 2px solid #c71967;
  -webkit-column-count: 4;
  column-count: 4;
  -webkit-column-width: 25%;
  column-width: 25%;
  padding: 20px 20px;
  margin: 130px 30px;
  border-radius: 15px;

  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);
  @media screen and (max-width: 901px) {
    -webkit-column-count: 3;
    -moz-column-count: 3;
    column-count: 3;
    column-width: 25%;
  }
  @media screen and (max-width: 530px) {
    -webkit-column-count: 3;
    -moz-column-count: 3;
    column-count: 3;
    -webkit-column-width: 33%;
    -moz-column-width: 33%;
    column-width: 33%;
  }
`;

const Skeleton = styled.div`
  font-size: 50px;
  font-weight: bolder;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ImgItem = styled.div`
  -webkit-transition: all 350ms ease;
  transition: all 350ms ease;
  cursor: pointer;
  margin-bottom: 12px;
  border-radius: 10px;
  box-shadow: 1px 2px 5px 2px rgba(0, 0, 0, 0.2);
  :hover {
    -webkit-filter: brightness(0.5);
    filter: brightness(0.5);
  }
  .image {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
`;
