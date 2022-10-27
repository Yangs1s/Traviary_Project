/** @format */
import React, { useEffect, useState, useRef } from "react";
import styled, { css, keyframes } from "styled-components";
import { doc, deleteDoc } from "firebase/firestore";
import { AiTwotoneDelete } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";
import { dbService, storageService } from "../fbase";
import { deleteObject, ref } from "firebase/storage";
import { ImStarFull } from "react-icons/im";
import { GiFalloutShelter } from "react-icons/gi";

const Contents = ({
  traviObj,
  userObj,
  isPostOpen,
    onClose
}: {
  traviObj: any;
  userObj: any;
  isPostOpen:boolean
    onClose:(e:any)=>void
}) => {
  // console.log(traviObj.id)
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);

	const TraviRef = doc(dbService, "TraviDB", `${traviObj.id}`)
	const urlRef = ref(storageService, traviObj.fileAttachURL)
  const onDeleteClick = async () => {
    const Ok = window.confirm("삭제하시겠습니까???");
    console.log(Ok);
    if (Ok) {
      await deleteDoc(TraviRef);
      await deleteObject(urlRef);
    }
  };

  useEffect(() => {
    if (traviObj.createdId === userObj.uid) {
      setEditing(true);
    } else {
      setEditing(false);
    }
  });


  return (
    <>
      <PostContainer visible={isPostOpen}>
        <Wrapper>
          <PostHeader>
            <HeaderWrapper>
              <Closebox>
                <CloseBtn type="button" onClick={onClose}>
                  <span>🆇</span>
                </CloseBtn>
              </Closebox>

              <Icons>
                {editing ? (
                  <>
                    <AiTwotoneDelete
                      className="icons"
                      role="button"
                      onClick={onDeleteClick}
                    />
                    <BiPencil className="icons" />
                  </>
                ) : (
                  <></>
                )}
              </Icons>
            </HeaderWrapper>
          </PostHeader>

          <ContentContainer>
            <ImageContainer>
              <Image src={traviObj.fileAttachURL} id={traviObj.id} />
            </ImageContainer>

            <TextStatContainer>
              <StatContainer>
                <Title> STAT </Title>
                <StatWrapper>
                  <li>
                    Taste:
                    <ImStarFull />
                  </li>
                  <li>
                    Visual:
                    <ImStarFull />
                  </li>
                  <li>
                    Price:
                    <ImStarFull />
                  </li>
                </StatWrapper>
              </StatContainer>

              <TextContainer>
                <div>
                  <Title> POST </Title>
                </div>

                <TextContent>{traviObj.text}</TextContent>
              </TextContainer>
            </TextStatContainer>
          </ContentContainer>
        </Wrapper>
      </PostContainer>
    </>
  );
};


				<ContentContainer>
					<ImageContainer>
						<Image src={traviObj.fileAttachURL} id={traviObj.id} />
					</ImageContainer>

					<TextMapContainer>
						<Title> MAP </Title>
						<MapContainer>
							<MapWrapper></MapWrapper>
						</MapContainer>
						<Title> POST </Title>
						<CommentWrapper>
							<TextContent>{traviObj.text}</TextContent>
						</CommentWrapper>
					</TextMapContainer>
				</ContentContainer>
			</Wrapper>
		</>
	)
}


const modalSettings = (visible: boolean) => css`
  visibility: ${visible ? "visible" : "hidden"};
  z-index: 15;
  animation: ${visible ? slideIn : slideOut} 0.6s ease-out;
  transition: visibility 0.45s ease-out;
`;

const slideIn = keyframes`
  0% {
	opacity:0
  }

  100% {
	opacity:1;
  }
`;

const slideOut = keyframes`
0% {
	opacity:1
  }

  100% {
	opacity:0;
  }
`;

const PostContainer = styled.div<{ visible: boolean }>`
  border-radius: 10px;

  width: 50vw;
  height: 70vh;
  background: #fff;
  border: 2px solid #fefefe;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);
  position: absolute;

  top: 10%;
  left: 20%;

  overflow-y: scroll;

  ${(props) => modalSettings(props.visible)}

  @media screen and (max-width: 750px) {
    height: 60vh;
    margin: 0;
  }
`;



const Wrapper = styled.div`
  width: 50vw;
  height: 64vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;

  @media screen and (max-width: 770px) {
    width: 100%;
    height: 70vh;
    margin: 0;

    display: flex;
  }
`;

/// HEADER --- HEADER
const PostHeader = styled.header`
  width: 50vw;
  height: 5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background: var(--tab-bgcolor);
`;
const HeaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;
const Closebox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;


const CloseBtn = styled.button`
  width: 10%;
  outline: none;
  border: none;
  margin: 0;
  background: transparent;
  span {
    font-size: 3em;
    color: var(--main-color);
  }
  @media screen and (max-width: 770px) {
    span {
      font-size: 2em;
      color: var(--main-color);
    }
  }
`;

const Icons = styled.div`
    width:100%
    height:100%;
    margin:0 2em;
    display:flex;
    align-items:center;
    .icons{
        font-size:3.5em;
        color:var(--main-color);
        text-align:center;
        margin-right:5px;
        padding:0 5px;
    }



// CONTENT //
const ContentContainer = styled.div`
  width: 50vw;
  height: 60vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  @media screen and (max-width: 770px) {
    width: 100%;
    height: 70vh;
    margin: 0;

    display: flex;
    flex-direction: column;
  }
`;

// CONTENT --- Image////////
const ImageContainer = styled.div`
  width: 50vw;
  height: 70%;
  border: 2px solid #fff;
  border-bottom-left-radius: 10px;
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.15);

  @media screen and (max-width: 770px) {
    width: 100%;
    height: 52vh;
    margin: 0;

    display: flex;

    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;
const Image = styled.img`
  width: 30vw;
  height: 30vh;
  padding: 1em;
  text-align: center;
  margin: auto;
  @media screen and (max-width: 770px) {
    width: 47vw;
    height: 30vh;
  }
`;

//CONTETN -  TEXT//
const TextStatContainer = styled.div`
  width: 50vw;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  border-left: 1px solid #e8e8e8;

  @media screen and (max-width: 770px) {
    width: 100%;
    height: 70vh;
  }
`;
const TextContainer = styled.div`
  width: 20vw;
  height: 30vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  margin-top: 2%;

  @media screen and (max-width: 770px) {
    font-size: 0.5em;
    height: 10vh;
  }
`;
const TextContent = styled.span`
  font-size: 2em;
  width: 20vw;
  padding: 1em;
  height: 100%;
  border: solid 1px var(--color-gray0);
  border-radius: 10px;
  display: flex;
  margin: 5% 0;
`;

// CONTENT - Stat //
const StatContainer = styled.div`
  width: 20vw;
  height: 30vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2%;

  @media screen and (max-width: 770px) {
    font-size: 0.5em;
    height: 20vh;
  }
`;
const StatWrapper = styled.ul`
  width: 20vw;
  height: 100%;
  border: solid 1px var(--color-gray0);
  border-radius: 10px;
  display: flex;
  padding: 10px;
  flex-direction: column;
  margin: 5% 0;

  li {
    font-size: 2rem;
    text-align: left;
    margin: 20px 0;
  }
`;

// TITLE
const Title = styled.div`
  width: 5vw;
  font-size: 2em;
  font-weight: 700;

  margin-top: 0.5em;
  border: 1px solid var(--main-color);
  border-radius: 10%;
  text-align: center;
  color: var(--main-color);
  background: var(--tab-bgcolor);

  @media screen and (max-width: 770px) {
    width: 10vw;
    font-size: 1.5em;
  }
`;
