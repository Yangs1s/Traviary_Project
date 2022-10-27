/** @format */
import React, { useEffect, useState,useRef } from "react"
import styled from "styled-components";
import { doc, deleteDoc } from "firebase/firestore";
import { AiTwotoneDelete } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";
import { dbService, storageService } from "../fbase";
import { deleteObject, ref } from "firebase/storage";

const Contents = ({traviObj,userObj}: {
	traviObj: any
	userObj: any
}) => {
  // console.log(traviObj.id)
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);

  const TraviRef = doc(dbService, "TraviDB", `${traviObj.id}`);
  const urlRef = ref(storageService, traviObj.fileAttachURL);

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
  const handleClose = () => {
    [setOpen((prev) => !prev)];
  };

  return (
    <>
      <Wrapper>
        <PostHeader>
          <HeaderWrapper>
            <Closebox>
              <CloseBtn type="button" onClick={handleClose}>
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
        <Foot/>
    </>
  );
};

export default Contents;



const Wrapper = styled.div`
	width: 49vw;
	height: 70vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	z-index: 1;

	@media screen and (max-width: 770px) {
		width: 100%;
		height: 70vh;
		margin: 0;
        
        display:flex;
    }
`

/// HEADER --- HEADER
const PostHeader = styled.header`
	width: 49vw;
	height: 5rem;
	border-bottom: 1px solid rgba(0, 0, 0, 0.3);
	border-top-left-radius: 10px;
	background: var(--tab-bgcolor);
`
const HeaderWrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
`
const Closebox = styled.div`
	width: 100%;
	height: 100%;
	display: flex;

`

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
`

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


`


// CONTENT //
const ContentContainer = styled.div`
	width: 49vw;
	height: 70vh;
	display: flex;
	align-items: center;

    @media screen and (max-width: 770px) {
		width: 100%;
		height: 70vh;
		margin: 0;

        display:flex;
        flex-direction:column;
	}
`

// CONTENT --- Image////////
const ImageContainer = styled.div`
	width: 45vw;
	height: 100%;
	border:2px solid #fff;
	border-bottom-left-radius:10px;
	display: flex;
	flex-direction: column;
	background:rgba(0,0,0,0.15);

    @media screen and (max-width: 770px) {
		width: 100%;
		height: 52vh;
		margin: 0;

        display:flex;

        border-bottom-left-radius:10px;
        border-bottom-right-radius:10px;
	}
`
const Image = styled.img`
	width: 30vw;
    height:60vh;
	padding: 1em;
	text-align: center;
	margin: auto;
    @media screen and (max-width: 770px) {
		width: 47vw;
        height: 30vh;
	}
`

//CONTETN -  TEXT//
const TextMapContainer = styled.div`
	width: 20vw;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	border-left: 1px solid #e8e8e8;

    @media screen and (max-width: 770px) {
		width: 100%;
        height:70vh;
	}
`
const CommentWrapper = styled.div`
	width: 90%;
	height: 70%;
	margin: 2% 0;
	padding: 1em;
	border: solid 1px var(--color-gray0);
	border-radius: 10px;

        
    @media screen and (max-width: 770px) {
        font-size:0.5em;
        height:10vh;
	}
`
const TextContent = styled.span`
	font-size: 2em;
`

// CONTENT - MAP //
const MapContainer = styled.div`
	width: 100%;
	height: 40%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 2%;

    @media screen and (max-width: 770px) {
        font-size:0.5em;
        height:20vh;
	}
`
const MapWrapper = styled.div`
	width: 90%;
	height: 100%;
	border: solid 1px var(--color-gray0);
	border-radius: 10px;
	display: flex;
	margin: 5% 0;
`

// TITLE
const Title = styled.div`
	width: 5vw;
	font-size: 2em;
    font-weight:700;

	margin-top: 0.5em;
	border: 1px solid var(--main-color);
	border-radius: 10%;
	text-align: center;
	color: var(--main-color);
	background: var(--tab-bgcolor);

    @media screen and (max-width: 770px) {
		width: 10vw;
        font-size:1.5em;
	}
`

const Foot = styled.div`
    width:100%;
    height:7.7vh;
    background:var(--tab-bgcolor);
    border-bottom-left-radius:10px;
    border-bottom-right-radius:10px;
    margin-bottom:5px;

    @media screen and (max-width: 770px) {
        height:7.5vh;
	}
`