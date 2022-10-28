import { useState, useEffect, FormEvent, ChangeEvent } from "react"
import styled from "styled-components"

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
				<Container onSubmit={onSubmit}>
					<Wrapper>
						<PhotoContainer>
							<ImageInput
								type="file"
								accept="image/*"
								id="files"
								onChange={onFileChange}
							/>
							<ImageLabel htmlFor="files">
								<span>⨁</span>
							</ImageLabel>
							<PhotoList>
								{fileAttach && (
									<>
										<img src={fileAttach} width="120px" />
									</>
								)}
							</PhotoList>
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

const Container = styled.form`
	background: #fff;
	display: flex;
	position: absolute;
	right: 0;
	width: 55vw;
	height: 80vh;
	border: 2px solid #efefef;
	box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);
	margin-left: auto;
	border-radius: 20px;
	z-index: 1;
	overflow: scroll;
	@media screen and (max-width: 900px) {
		width: 100%;
		height: 80%;
		margin: 0;
	}
	@media screen and (max-width: 530px) {
		width: 100%;
		height: 70%;
		margin: 0;
	}
	@media screen and (max-width: 400px) {
		width: 100%;
		height: 100%;
		margin: 0;
	}
`

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	padding: 10px;
	margin: 10px 30px;
	border-radius: 20px;
	z-index: 9999;
`
const PhotoContainer = styled.div`
	width: 100%;
	height: 30%;
	display: flex;
	flex-direction: row;
	margin-bottom: 20px;
	@media screen and (max-width: 900px) {
		width: 100%;
		height: 40%;
		display: block;
	}
	@media screen and (max-width: 530px) {
		width: 100%;
		height: 40%;
		display: block;
	}
	@media screen and (max-width: 400px) {
		width: 100%;
		height: 40%;
		display: block;
	}
`

const ImageLabel = styled.label`
width:45vw;
height:100%
font-size: 50px;
text-align:center;
border: 2px solid #e8e8e8;
border-radius:20px;
padding: 13% 0;
margin-right:1vw;
&::file-selector-button{
	display:none
}
span{
	font-size:100px;
}
`

const ImageInput = styled.input`
	display: none;
`
const PhotoList = styled.ul`
	width: 20%;
	margin-left: 1em;
	border: 2px solid #e8e8e8;
	border-radius: 20px;
	padding: 1em;
	margin: 0 auto;
	@media screen and (max-width: 900px) {
		width: 100%;
		height: 20%;
		text-align: center;
		display: flex;
	}
	@media screen and (max-width: 530px) {
		width: 100%;
		height: 30%;
		text-align: center;
		display: flex;
	}
	@media screen and (max-width: 400px) {
		width: 100%;
		height: 20%;
		text-align: center;
		display: flex;
	}
`

const StarRatingContainer = styled.div`
	width: 100%;
	height: 30%;
	border: 2px solid #e8e8e8;
	border-radius: 20px;
	padding: 1em;
	@media screen and (max-width: 400px) {
		width: 100%;
		text-align: center;
	}
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
	width: 100%;
	height: 30%;
	margin-top: 20px;
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
		color: var(--main-color);
	}
	@media screen and (max-width: 400px) {
		width: 50%;
		height: 20%;
	}
`
