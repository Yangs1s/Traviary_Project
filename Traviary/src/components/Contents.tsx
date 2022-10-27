/** @format */
import React, {
	useEffect,
	useState,
	useRef,
	ChangeEvent,
	FormEvent,
} from "react"
import styled,{keyframes,css} from "styled-components"
import { doc, deleteDoc, updateDoc } from "firebase/firestore"
import { AiTwotoneDelete } from "react-icons/ai"
import { BiPencil } from "react-icons/bi"
import { dbService, storageService } from "../fbase"
import { deleteObject, ref } from "firebase/storage"
import {ImStarFull} from 'react-icons/im'

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
	const [open, setOpen] = useState(false)
	const [editing, setEditing] = useState(false)
	const [editData, setEditData] = useState(false)
	const [editText, setEditText] = useState(traviObj.text)
	const [editFile, setEditFile] = useState(traviObj.fileAttachURL)

	const TraviRef = doc(dbService, "TraviDB", `${traviObj.id}`)
	const urlRef = ref(storageService, traviObj.fileAttachURL)

	const onDeleteClick = async () => {
		const Ok = window.confirm("삭제하시겠습니까???")
        if (Ok) {
			await deleteDoc(TraviRef)
			await deleteObject(urlRef)
		}
	}

	const toggleEditing = () => {
		setEditData((prev) => !prev)
	}

	const onChangeText = (
		event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
	) => {
		const {
			target: { value },
		} = event
		setEditText(value)
	}

	const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
		const {
			currentTarget: { files },
		} = event as any
		setEditFile(files)
	}

	const onSubmit = async (event: FormEvent) => {
		event.preventDefault()
		await updateDoc(TraviRef, { text: editText, fileAttachUrl: editFile })
		setEditData(false)
	}

	const handleClose = () => {
		;[setOpen((prev) => !prev)]
	}

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
									<BiPencil
										className="icons"
										role="button"
										onClick={toggleEditing}
									/>
									{editData ? (
										<>
											<form onSubmit={onSubmit}>
												<input
													type="textarea"
													value={traviObj.text}
													onChange={onChangeText}
													required
												/>
												<input
													type="file"
													accept="image/*"
													onChange={onChangeFile}
													required
												/>
												<input type="submit" value="update" />
											</form>
										</>
									) : (
										<></>
									)}
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

export default Contents;


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

  width: 30vw;
  height: 70vh;
  background: #fff;

  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 150px;
  left: 35%;


  ${(props) => modalSettings(props.visible)}

  @media screen and (max-width: 750px) {
    height: 60vh;
    margin: 0;
  }
`;

const Wrapper = styled.div`
  width: 30vw;
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
  width: 30vw;
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


`;

// CONTENT //
const ContentContainer = styled.div`
  width: 30vw;
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
  width: 30vw;
  height: 70%;
  
  border-top:2px solid #fff;
  border-bottom:2px solid #fc80ef;

  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  display: flex;
  flex-direction: column;
  background: rgba(255, 70, 150, 0.2);

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
  width: 25vw;
  height: 35vh;
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
  width: 30vw;
  height: 29vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  @media screen and (max-width: 770px) {
    width: 100%;
    height: 70vh;
  }
`;
const TextContainer = styled.div`
  width: 10vw;
  height: 30vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  margin:10px 20px;

  @media screen and (max-width: 770px) {
    font-size: 0.5em;
    height: 10vh;
  }
`;
const TextContent = styled.span`
width: 11vw;
padding: 1em;
height: 100%;
font-size: 1.5em;
  border: solid 1px var(--color-gray0);
  border-radius: 10px;
  display: flex;
  margin: 10px;
`;

// CONTENT - Stat //
const StatContainer = styled.div`
  width: 13vw;
  height: 30vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px ;

  @media screen and (max-width: 770px) {
    font-size: 0.5em;
    height: 20vh;
  }
`;
const StatWrapper = styled.ul`
  width: 13vw;
  height: 90%;
  border: solid 1px var(--color-gray0);
  border-radius: 10px;
  display: flex;
  padding: 10px;
  flex-direction: column;
  margin: 10px;

  font-family: "Gill Sans", sans-serif;
  font-weight:600;
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
