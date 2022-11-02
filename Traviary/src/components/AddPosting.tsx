import { useState, useEffect, FormEvent, ChangeEvent } from "react"
import styled, { css, keyframes } from "styled-components"

import {
	addDoc,
	collection,
	onSnapshot,
	orderBy,
	query,
	Timestamp,
} from "firebase/firestore"
import { ref, uploadString, getDownloadURL } from "firebase/storage"
import { dbService, storageService } from "../fbase"
import { uuidv4 } from "@firebase/util"

import StraRating from "./StraRating"

type userObjType = {
	isModalOpen: boolean
	userObj: any
}
interface TraviType {
	id?: string
	text?: string
	creatAt?: Timestamp
	createdId?: string
}
const AddPosting = ({ userObj, isModalOpen }: userObjType) => {
	const [postText, setPostText] = useState("")
	const [fileAttach, setFileAttach] = useState<any>("")
	const [isModal, setIsModal] = useState(isModalOpen)
	const [taste, setTaste] = useState(0)
	const [price, setPrice] = useState(0)
	const [visual, setVisual] = useState(0)
	const [infoTravi, setInfoTravi] = useState<TraviType[]>([])

	useEffect(() => {
		const queries = query(
			collection(dbService, "TraviDB"),
			orderBy("createdAt", "desc")
		)
		onSnapshot(queries, (snapshot) => {
			const traviArr = snapshot.docs.map((dosc) => ({
				id: dosc.id,
				...dosc.data(),
			}))
			setInfoTravi(traviArr)
			console.log(isModal)
		})
	}, [])

	const onSubmit = async (event: FormEvent) => {
		event.preventDefault()
		let fileAttachURL = ""

		const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`)
		const response = await uploadString(attachmentRef, fileAttach, "data_url")
		fileAttachURL = await getDownloadURL(response.ref)

		const TraviObj = {
			text: postText,
			ratings: {
				tasterating: taste,
				pricerating: price,
				visualrating: visual,
			},
			createAt: Date.now(),
			createdId: userObj.uid,
			fileAttachURL,
		}
		await addDoc(collection(dbService, "TraviDB"), TraviObj)
		setPostText("")
		setFileAttach("")
		setIsModal((prev) => !prev)
		console.log(isModal)
	}

	const onChange = (
		event: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>
	) => {
		const {
			target: { value },
		} = event
		setPostText(value)
		console.log(value)
	}

	const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const {
			currentTarget: { files },
		} = event as any
		const theFile = files[0]
		const reader = new FileReader()
		reader.onloadend = (finishedEvent: any) => {
			const {
				currentTarget: { result },
			} = finishedEvent
			setFileAttach(result)
		}
		reader.readAsDataURL(theFile)
	}
	console.log(visual)
	return (
		<>
			{isModalOpen === isModal ? (
				<Container onSubmit={onSubmit} visible={isModalOpen}>
					<Wrapper>
						<PhotoContainer>
							<ImageInput
								type="file"
								accept="image/*"
								id="files"
								onChange={onFileChange}
							/>
							<ImageLabel htmlFor="files">
								{fileAttach ? (
									<>
										<img src={fileAttach} className="addImg" />
									</>
								) : (
									<span>⨁</span>
								)}
							</ImageLabel>
						</PhotoContainer>
						<StarRatingContainer>
							<StarRatingItem>
								<span>TASTE :</span>
								<StraRating ratingIndex={taste} setRatingIndex={setTaste} />
							</StarRatingItem>
							<StarRatingItem>
								<span>PRICE :</span>
								<StraRating ratingIndex={price} setRatingIndex={setPrice} />
							</StarRatingItem>
							<StarRatingItem>
								<span>VISUAL :</span>
								<StraRating ratingIndex={visual} setRatingIndex={setVisual} />
							</StarRatingItem>
						</StarRatingContainer>
						<TextContainer>
							<TextArea
								value={postText}
								onChange={onChange}
								name="text"
								placeholder="Write Your Post!!"
							></TextArea>
							{postText ? (
								<Button type="submit">
									<span>POST</span>
								</Button>
							) : (
								<Button type="submit" disabled>
									<span>POST</span>
								</Button>
							)}
						</TextContainer>
					</Wrapper>
				</Container>
			) : null}
		</>
	)
}

export default AddPosting
const modalSettings = (visible: boolean) => css`
	visibility: ${visible ? "visible" : "hidden"};
	z-index: 15;
	animation: ${visible ? slideIn : slideOut} 0.6s ease-out;
	transition: visibility 0.45s ease-out;
`

const slideIn = keyframes`
  0% {
	opacity:0
  }

  100% {
	opacity:1;
  }
`

const slideOut = keyframes`
0% {
	opacity:1
  }

  100% {
	opacity:0;
  }
`

const Container = styled.form<{ visible: boolean }>`
	background: #fff;
	display: flex;
	
	width: 450px;
	height: 800px;
	padding-top: 20px;
	border: 2px solid #efefef;
	box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);
	position:absolute;
	top:8%;
  	left:40%;
	border-radius: 20px;
	z-index: 1;



	${(props) => modalSettings(props.visible)}
`

const Wrapper = styled.div`
	flex:1;	
	padding: 10px;
	margin: 10px 30px;
	border-radius: 20px;
	z-index: 9999;

`
const PhotoContainer = styled.div`
	flex:1;
	height: 300px;
	display: flex;
`

const ImageLabel = styled.label`
	flex:1;
	border: 2px solid #e8e8e8;
	border-radius: 20px;
	position:relative;
	display:flex;
	align-items:center;
	jutify-content:center;
  	
	
	&::file-selector-button {
		display: none;
	}
	span {
		position:absolute;
		font-size: 100px;
		left:40%
	}
	img {
		width: 100%;
		height: 23vh;
		border-radius: 20px;
	}
`

const ImageInput = styled.input`
	display: none;
`

/// STAR RATING
const StarRatingContainer = styled.div`
	flex:1;
	height: 180px;
	margin-top: 10px;
	border: 2px solid #e8e8e8;
	border-radius: 20px;
	padding: 1em;

`
const StarRatingItem = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	jutify-content: center;

	span {
		font-size: 15px;
		font-weight: 700;
		vertical-align: middle;
	}
`

const TextContainer = styled.div`
	flex:1;
	height: 30%;
	margin-top: 10px;
	text-align: center;
	@media screen and (max-width: 900px) {
		width: 100%;
		height: 40%;
	}
	@media screen and (max-width: 530px) {
		width: 100%;
		height: 40%;
	}
	@media screen and (max-width: 400px) {
		width: 100%;
		height: 20%;
	}
`
const TextArea = styled.textarea`
	width: 100%;
	height: 90%;
	resize: none;
	padding: 10px;
	border: 2px solid #e8e8e8;

	border-radius: 20px;
`

const Button = styled.button`
	width: 30%;
	height: 15%;
	background: var(--tab-bgcolor);
	border-radius: 10px;
	border: 1px solid #fff;
	span {
		font-size: 2em;
		font-weight: 800;
		color: var(--main-color);
	}
	@media screen and (max-width: 400px) {
		width: 50%;
		height: 20%;
	}
`
