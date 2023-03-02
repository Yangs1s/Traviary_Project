/** @format */

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
import { dbService, storageService } from "@/fbase"
import { uuidv4 } from "@firebase/util"

import StraRating from "@components/common/StraRating"

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
interface Tags {
	hashTag: string
}
const CreateCard = ({ userObj, isModalOpen }: userObjType) => {
	const [postText, setPostText] = useState<string>("")
	const [fileAttach, setFileAttach] = useState<any>("")
	const [isModal, setIsModal] = useState<boolean>(isModalOpen)
	const [taste, setTaste] = useState<number>(0)
	const [price, setPrice] = useState<number>(0)
	const [visual, setVisual] = useState<number>(0)

	const [hashTags, setHashTags] = useState<string[]>([])
	const [hashTag, setHashTag] = useState<string>("")
	const [infoTravi, setInfoTravi] = useState<TraviType[]>([])
	const tags = [] as string[]
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
			hashtag: hashTags,
			createAt: Date.now(),
			createdId: userObj.uid,
			fileAttachURL,
		}
		await addDoc(collection(dbService, "TraviDB"), TraviObj)
		setPostText("")
		setFileAttach("")
		setIsModal((prev) => !prev)
	}

	const onChange = (
		event: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>
	) => {
		setPostText(event.target.value)
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

	const tagChange = (
		event: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>
	) => {
		setHashTag(event.target.value)
	}
	const TagsSubmit = () => {
		setHashTag("")
		if (hashTags.length < 11) {
			hashTags.push(hashTag)
		} else {
			document.getElementById("tagBtn")?.ariaDisabled
		}
	}
	const deleteTag = (e: React.MouseEvent<HTMLButtonElement>) => {
		const deleteTagItem =
			e.currentTarget?.parentElement?.firstChild?.textContent?.split("#")[1]
		const filteredTagList = hashTags.filter(
			(tagItem) => tagItem !== deleteTagItem
		)
		setHashTags(filteredTagList)
	}
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
						<StarTextContainer>
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
							<TagCotainer>
								<HashTags>
									<input
										type="text"
										id="hashtagText"
										value={hashTag}
										onChange={tagChange}
									/>
									<button type="button" onClick={TagsSubmit} id={"tagBtn"}>
										Tag
									</button>

									{hashTags.map((item, index) => {
										return (
											<TagsWrap className={"wrap"}>
												<Tag className="tags" key={`${index}${item}`}>
													{`#${item}`}
												</Tag>
												<button onClick={deleteTag}>X</button>
											</TagsWrap>
										)
									})}
								</HashTags>
							</TagCotainer>
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
						</StarTextContainer>
					</Wrapper>
				</Container>
			) : null}
		</>
	)
}

export default CreateCard

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
	opacity:1;
  }

  100% {
	opacity:0;
  }
`

const Container = styled.form<{ visible: boolean }>`
	background: #fff;
	display: flex;
	width: 700px;
	height: auto;
	max-height: 450px;
	border: 2px solid #efefef;
	box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);
	position: absolute;
	top: 100px;
	left: 30%;
	border-radius: 20px;
	z-index: 1;

	${(props) => modalSettings(props.visible)}
`

const Wrapper = styled.div`
	flex: 1;
	display: flex;
	flex-direction: row;
	height: 100%;
	max-height: 750px;
	padding: 10px;
	margin: 10px 30px;
	border-radius: 20px;
	z-index: 9999;
`
const PhotoContainer = styled.div`
	flex: 1;
	height: 400px;
	display: flex;
	margin: 5px;
`

const ImageLabel = styled.label`
	flex: 1;
	height: 100%;
	border: 2px solid #e8e8e8;
	border-radius: 20px;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;

	&::file-selector-button {
		display: none;
	}
	span {
		position: absolute;
		font-size: 100px;
		left: 40%;
	}
	img {
		width: 100%;
		height: auto;
		max-height: 400px;
		border-radius: 20px;
	}
`

const ImageInput = styled.input`
	display: none;
`
const StarTextContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin: 5px;
`
/// STAR RATING
const StarRatingContainer = styled.div`
	flex: 1;
	height: 180px;
	margin-bottom: 10px;
	border: 2px solid #e8e8e8;
	border-radius: 20px;
	padding: 1em;
`
const StarRatingItem = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	span {
		font-size: 15px;
		font-weight: 700;
		vertical-align: middle;
	}
`

const TextContainer = styled.div`
	flex: 1;
	height: 100px;
	text-align: center;
`
const TextArea = styled.textarea`
	width: 100%;
	height: 150px;
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
`

const TagCotainer = styled.div`
	width: 100%;

	form {
		width: 100%;
	}
	.tags {
	}
`

const HashTags = styled.div`
	display: flex;
	flex-direction: column;
`

const Tag = styled.span`
	width: auto;
	background: green;
	margin: 3px;
	color: #fff;
	font-size: 15px;
	padding: 3px;
	border-radius: 20px;
`

const TagsWrap = styled.div`
	button {
		outline: 0;
		border: 0;
	}
`
