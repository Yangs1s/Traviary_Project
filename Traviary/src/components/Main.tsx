/** @format */

import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import Card from "@components/Cards/Card";
import { dbService, authService } from "@/fbase";
import {
  collection,
  query,
  onSnapshot,
  Timestamp,
  orderBy,
} from "firebase/firestore";
import { CardTraviObjType } from "@/types/TraviType";
import Spinner from "./common/Spinner";

const Main = () => {
  const [isOpenPost, setIsOpenPost] = useState<boolean>(false);
  const [travis, setTravis] = useState<CardTraviObjType[]>([]);
  const [postId, setPostId] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [isLoading, setIsLoding] = useState<boolean>(true);
  const authId = authService.currentUser?.uid;

  const fetchData = useCallback(() => {
    const q = query(
      collection(dbService, "TraviDB"),
      orderBy("createAt", "desc")
    );
    onSnapshot(q, querySnapshot => {
      const Travi: any = querySnapshot.docs.map(docs => ({
        id: docs.id,
        ...docs.data(),
      }));
      setTravis(Travi);
    });
  }, []);

  useEffect(() => {
    setIsLoding(true);
    fetchData();
    setTimeout(() => {
      setIsLoding(false);
    }, 1600);
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
  console.log(travis);
  return (
    <Container className="main_container">
      {!isLoading ? (
        <GridContainer className="grid">
          {travis.map((travi: CardTraviObjType) =>
            authId === travi.createdId ? (
              <ImgItem key={`${travi.id}${travi.creatAt}`} className="Item">
                <img
                  id={travi.id}
                  src={travi.fileAttachURL}
                  alt="게시글이미지"
                  onClick={handleOpenPost}
                  className="image"
                />
              </ImgItem>
            ) : null
          )}
        </GridContainer>
      ) : (
        <Skeleton className="skeleton">
          <div className="wrapper">
            <Spinner />
            <span>Loading...</span>
          </div>
        </Skeleton>
      )}
      {travis.map(travi => {
        return (
          <div
            key={`${travi.createdId} ${travi.id}`}
            className="card_container"
          >
            {postId === travi.id ? (
              <Card
                isPostOpen={!isOpenPost}
                traviObj={travi}
                userObj={userId}
                onClose={handlePostClose}
              />
            ) : null}
          </div>
        );
      })}
    </Container>
  );
};
export default Main;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
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
  gap: 10px;
  height: auto;
  background: #fff;
  border: 2px solid #c71967;
  column-count: 4;
  column-width: 25%;
  padding: 20px 20px;
  margin: 130px 30px;
  border-radius: 15px;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);
  @media screen and (max-width: 901px) {
    -webkit-column-count: 3;
    column-count: 3;
    column-width: 25%;
  }
  @media screen and (max-width: 530px) {
    -webkit-column-count: 3;
    column-count: 3;
    -webkit-column-width: 33%;
    column-width: 33%;
  }
`;

const Skeleton = styled.div`
  height: 75%;
  width: 95%;
  display: flex;
  flex-direction: column;
  margin: 10% auto;
  border: 2px solid #c71967;
  border-radius: 15px;
  align-items: center;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);
  .wrapper {
    margin: auto;
    span {
      font-size: 3em;
      font-weight: bolder;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

const ImgItem = styled.div`
  -webkit-transition: all 350ms ease;
  transition: all 350ms ease;
  cursor: pointer;
  margin-bottom: 12px;
  border-radius: 10px;
  min-height: auto;
  box-shadow: 1px 2px 5px 2px rgba(0, 0, 0, 0.2);
  :hover {
    -webkit-filter: brightness(0.5);
    filter: brightness(0.5);
  }
  .image {
    width: 100%;
    min-height: max-content;
    border-radius: 10px;
  }
`;
