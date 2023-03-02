/** @format */

import { FormEvent, ChangeEvent, useState } from "react"
import styled from "styled-components"
import { updateDoc, doc } from "firebase/firestore"
import { dbService, storageService } from "@/fbase"
import StraRating from "@components/common/StraRating"
import { BsStars } from "react-icons/bs"
import { TbNotes } from "react-icons/tb"
import { getDownloadURL, ref, uploadString } from "firebase/storage"
import { uuidv4 } from "@firebase/util"

interface EditCardInfo {
	traviObj: any
	userObj: any
	isToggle: () => void
}

const EditCardInfo = ({ traviObj, isToggle, userObj }: EditCardInfo) => {
	const [editText, setEditText] = useState(traviObj.text)
	const [price, setPrice] = useState(traviObj.ratings.pricerating)
	const [taste, setTaste] = useState(traviObj.ratings.tasterating)
	const [visual, setVisual] = useState(traviObj.ratings.visualrating)
	const [fileAttach, setFileAttach] = useState<any>(traviObj.fileAttachURL)
	const TraviRef = doc(dbService, "TraviDB", `${traviObj.id}`)

	const onSubmit = async (event: FormEvent) => {
		event.preventDefault()
		let fileAttachURL = `${traviObj.fileAttachURL}`
		const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`)
		const response = await uploadString(attachmentRef, fileAttach, "data_url")
		fileAttachURL = await getDownloadURL(response.ref)

		await updateDoc(TraviRef, {
			text: editText,
			ratings: {
				pricerating: price,
				tasterating: taste,
				visualrating: visual,
			},
			fileAttachURL: fileAttach,
		})
		isToggle()
	}

	const onChangeText = (
		event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
	) => {
		setEditText(event.target.value)
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

	return (
		<ContentContainer onSubmit={onSubmit}>
			<ImageContainer>
				<ImageInput
					type="file"
					accept="image/*"
					id="files"
					onChange={onFileChange}
				/>
				<ImageLabel htmlFor="files">
					<Image src={fileAttach} className="addImg" />
				</ImageLabel>
			</ImageContainer>

			<TextStatContainer>
				<StatContainer>
					<SubTitle>
						<Star />
						<Name> RATING </Name>
					</SubTitle>
					<StatWrapper>
						<li>
							Taste:&nbsp;
							<StraRating ratingIndex={taste} setRatingIndex={setTaste} />
						</li>
						<li>
							Price:&nbsp;
							<StraRating ratingIndex={price} setRatingIndex={setPrice} />
						</li>
						<li>
							Visual:&nbsp;
							<StraRating ratingIndex={visual} setRatingIndex={setVisual} />
						</li>
					</StatWrapper>
					<HashTags>
						<p>TAG:</p>
						{traviObj.hashtag.map((item: any) => {
							return <Tag>#{item}</Tag>
						})}
					</HashTags>
				</StatContainer>

				<TextContainer>
					<SubTitle>
						<Note />
						<Name> POST </Name>
					</SubTitle>

					<TextContent>
						<InputText
							value={editText}
							onChange={onChangeText}
							autoComplete="off"
						/>
					</TextContent>
					<Button type="submit">
						<span>Update</span>
					</Button>
				</TextContainer>
			</TextStatContainer>
		</ContentContainer>
	)
}

export default EditCardInfo

const ContentContainer = styled.form`
	width: 65vw;
	height: 60vh;
	display: flex;
	align-items: center;
	@media screen and (min-width: 280px) and (max-width: 770px) {
		flex-direction: column;
	}
`

const ImageContainer = styled.div`
	width: 48vw;
	height: auto;
	border-top: 2px solid #fff;
	border-bottom: 2px solid rgba(0, 0, 0, 0.2);
	box-shadow: 2px 0 0 rgba(0, 0, 0, 0.2);
	margin-bottom: 10px;
	display: flex;
	margin: 15px 1px 1px 4px;
	@media screen and (min-width: 280px) and (max-width: 770px) {
		width: 60vw;
		max-width: 350px;
	}
`
const Image = styled.img`
	width: auto;
	max-width: 24vw;
	height: auto;
	max-height: 56vh;
	padding: 1em;
	text-align: center;
	margin: auto;
	@media screen and (min-width: 280px) and (max-width: 770px) {
		padding: 1px;
		width: 60vw;
		max-width: 350px;
	}
`

const TextStatContainer = styled.div`
	width: 48vw;
	height: 50vh;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	@media screen and (min-width: 280px) and (max-width: 770px) {
		width: 70vw;
		flex-direction: column;
	}
`

const StatContainer = styled.div`
	width: 15vw;
	height: 50vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-left: 5px;
	@media screen and (min-width: 280px) and (max-width: 770px) {
		width: 70vw;
		height: auto;
		text-align: center;
	}
`
const StatWrapper = styled.ul`
	width: 14vw;
	height: auto;
	border: solid 1px var(--color-gray0);
	border-radius: 10px;
	display: flex;
	padding: 10px;
	flex-direction: column;
	margin: 5px 0;
	font-family: "Gill Sans", sans-serif;
	font-weight: 600;
	li {
		font-size: 2rem;
		text-align: left;
		margin: 5px 0;
	}
	@media screen and (min-width: 280px) and (max-width: 770px) {
		width: 70vw;
		height: 13px;
		margin: 0;
		font-weight: 500;
		flex-direction: row;
		justify-content: center;
		border: 0;
		padding: 1px;
	}
	@media screen and (min-width: 280px) and (max-width: 480px) {
		li {
			font-size: 13px;
			margin: 0px;
		}
	}
	@media screen and (min-width: 481px) and (max-width: 770px) {
		li {
			font-size: 1.8rem;
			margin: 0px;
		}
	}
	@media screen and (min-width: 771px) and (max-width: 1150px) {
		li {
			font-size: 1rem;
		}
	}
`

const TextContainer = styled.div`
	width: 15vw;
	height: 50vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	border-radius: 10px;
	margin: 5px;

	@media screen and (min-width: 280px) and (max-width: 480px) {
		width: 60vw;
		margin: 0px;
		height: 10vh;
		li {
			font-size: 13px;
			margin: 0px;
		}
	}
	@media screen and (min-width: 481px) and (max-width: 770px) {
		width: 60vw;
		margin: 0px;
		height: 10vh;
		li {
			font-size: 1.8rem;
			margin: 0px;
		}
	}
`
const TextContent = styled.span`
	width: 14vw;
	height: 43vh;
	padding: 10px;
	font-size: 1.3em;
	text-align: left;
	border: solid 1px var(--color-gray0);
	border-radius: 10px;
	display: flex;
	margin: 5px;
	overflow-wrap: break-word;
	word-break: break-all;
	white-space: pre-wrap;
	@media screen and (min-width: 280px) and (max-width: 770px) {
		width: 60vw;
		margin: 0px;
		border: 0;
		border-top: solid 1px var(--color-gray0);
		border-radius: 0;
		padding: 3px;
		margin-top: 5px;
	}
`

const SubTitle = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	width: max-content;
	background: var(--tab-bgcolor);
	border-radius: 10px;
	padding: 3px;
	box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);
	@media screen and (min-width: 280px) and (max-width: 770px) {
		display: none;
	}
`
const Star = styled(BsStars)`
	color: var(--main-color);
	width: 30px;
	font-size: 20px;
`
const Note = styled(TbNotes)`
	color: var(--main-color);
	font-size: 20px;
	width: 30px;
	margin: 0;
`
const Name = styled.div`
	width: max-content;
	font-size: 1.7em;
	font-weight: 900;
	padding-right: 4px;
	vertical-align: middle;

	text-align: center;
	color: var(--main-color);
`

const HashTags = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	@media screen and (min-width: 280px) and (max-width: 770px) {
		width: 70vw;
		height: auto;
		p {
			display: none;
		}
	}
`
const Tag = styled.span`
	width: auto;
	background: green;
	margin: 3px;
	color: #fff;
	font-size: 15px;
	padding: 5px;
	border-radius: 15px;
	@media screen and (min-width: 280px) and (max-width: 770px) {
		width: auto;
		font-size: 11px;
		padding: 3px;
	}
`

const InputText = styled.textarea`
	width: 14vw;
	height: 40vh;
	font-size: 1.1em;
	resize: none;
	padding: 10px;
	border: 0;
`

const ImageInput = styled.input`
	display: none;
`

const ImageLabel = styled.label`
	flex: 1;
	width: auto;
	max-width: 24vw;
	height: auto;
	max-height: 56vh;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: auto;

	&::file-selector-button {
		display: none;
	}
`

const Button = styled.button`
	width: 100px;
	height: 100px;
	margin: 3px;
	background: var(--tab-bgcolor);
	border-radius: 20px;
	border: 1px solid #fff;
	span {
		color: white;
		font-size: 1.7rem;
		font-weight: 900;
		vertical-align: middle;
	}
`
