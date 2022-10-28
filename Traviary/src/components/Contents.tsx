/** @format */
import React, {
	useEffect,
	useState,
	useRef,
	ChangeEvent,
	FormEvent,
} from "react"
import styled from "styled-components"
import { doc, deleteDoc, updateDoc } from "firebase/firestore"
import { AiTwotoneDelete } from "react-icons/ai"
import { BiPencil } from "react-icons/bi"
import { dbService, storageService } from "../fbase"
import { deleteObject, ref } from "firebase/storage"

const Contents = ({ traviObj, userObj }: { traviObj: any; userObj: any }) => {
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
			currentTarget: { value },
		} = event
		setEditText(value)
	}

	const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
		const {
			currentTarget: { files },
		} = event as any
		const theFile = files[0]
		const reader = new FileReader()
		reader.onloadend = (finishedEvent: any) => {
			const {
				currentTarget: { result },
			} = finishedEvent
			setEditFile(result)
		}
		reader.readAsDataURL(theFile)
	}

	const onSubmit = async (event: FormEvent) => {
		event.preventDefault()
		await updateDoc(TraviRef, { text: editText, fileAttachUrl: editFile })
		setEditData(false)
	}

	useEffect(() => {
		if (traviObj.createdId === userObj.uid) {
			setEditing(true)
		} else {
			setEditing(false)
		}
	})
	const handleClose = () => {
		;[setOpen((prev) => !prev)]
	}

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
									<BiPencil
										className="icons"
										role="button"
										onClick={toggleEditing}
									/>
									{editData ? (
										<>
											<form onSubmit={onSubmit}>
												<input
													type="text"
													name="text"
													value={traviObj.text}
													onChange={onChangeText}
												/>
												<input
													type="file"
													accept="image/*"
													onChange={onChangeFile}
												/>
												<button type="submit">update</button>
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

export default Contents

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	position: absolute;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	z-index: 9999;
	@media screen and (max-width: 900px) {
		width: 100%;
		height: 50%;
		margin: 0;
	}
	@media screen and (max-width: 530px) {
		width: 100%;
		height: 50%;
		margin: 0;
	}
`
const PostHeader = styled.header`
	width: 100%;
	height: 5%;
	border-bottom: 1px solid rgba(0, 0, 0, 0.3);
	border-top-left-radius: 10px;
	background: var(--tab-bgcolor);
	@media screen and (max-width: 900px) {
		width: 100%;
		height: 20%;
		margin: 0;
	}
	@media screen and (max-width: 530px) {
		width: 100%;
		height: 20%;
		margin: 0;
	}
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

// Image////////
const ImageContainer = styled.div`
	width: 60%;
	height: 100%;
	border: 2px solid #fff;
	border-bottom-left-radius: 10px;
	display: flex;
	flex-direction: column;
	background: rgba(0, 0, 0, 0.15);
	margin: 10px 0;

	@media screen and (max-width: 900px) {
		width: 100%;
		height: 100%;
		border: 2px solid #fff;
		border-bottom-left-radius: 10px;
		display: flex;
		flex-direction: column;
		background: rgba(0, 0, 0, 0.15);
	}
	@media screen and (max-width: 530px) {
		width: 60%;
		height: 100%;
		border: 2px solid #fff;
		border-bottom-left-radius: 10px;
		display: flex;
		flex-direction: column;
		background: rgba(0, 0, 0, 0.15);
	}
`
const Image = styled.img`
	width: 100%;
	padding: 1em;
	text-align: center;
	margin: auto;

	@media screen and (max-width: 900px) {
		width: 100%;
	}
`

// CONTENT //
const ContentContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
`

//CONTETN -  TEXT//
const TextMapContainer = styled.div`
	width: 40%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	border-left: 1px solid #e8e8e8;
`
const CommentWrapper = styled.div`
	width: 90%;
	height: 70%;
	margin: 2% 0;
	padding: 1em;
	border: solid 1px var(--color-gray0);
	border-radius: 10px;
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
	width: 20%;
	font-size: 2em;
	margin-top: 0.5em;
	border: 1px solid var(--main-color);
	border-radius: 15%;
	text-align: center;
	color: var(--main-color);
	background: var(--tab-bgcolor);
`
