import { FormEvent, ChangeEvent, useState } from "react"
import styled from "styled-components"
import { updateDoc, doc } from "firebase/firestore"
import { dbService } from "../fbase"
import StraRating from "./StraRating"

const EditData = ({ traviObj }: any) => {
	const [editData, setEditData] = useState(false)
	const [editText, setEditText] = useState(traviObj.text)
	const [price, setPrice] = useState(traviObj.ratings.pricerating)
	const [taste, setTaste] = useState(traviObj.ratings.tasterating)
	const [visual, setVisual] = useState(traviObj.ratings.visualrating)
	const TraviRef = doc(dbService, "TraviDB", `${traviObj.id}`)

	const onSubmit = async (event: FormEvent) => {
		event.preventDefault()
		await updateDoc(TraviRef, {
			text: editText,
			ratings: {
				pricerating: price,
				tasterating: taste,
				visualrating: visual,
			},
		})
		setEditData(false)
	}

	const onChangeText = (
		event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
	) => {
		const {
			target: { value },
		} = event
		setEditText(value)
	}

	return (
		<>
			<Container>
				<form onSubmit={onSubmit}>
					<InputText
						value={editText}
						onChange={onChangeText}
						autoComplete="off"
					/>
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
					<Button type="submit">
						<span>Update</span>
					</Button>
				</form>
			</Container>
		</>
	)
}

export default EditData

const Container = styled.div`
	background: #fff;
	width: 21vw;
	height: 33vh;
	position: absolute;
	left: 100%;
	top: 50%;
	border: 3px solid #e8e8e8;
	border-radius: 20px;
	overflow-wrap: break-word;
	word-break: break-all;
	white-space: pre-wrap;
`

const InputText = styled.textarea`
	width: 100%;
	height: 90%;
	resize: none;
	padding: 10px;
	border: 2px solid #e8e8e8;

	border-radius: 20px;
`

const Button = styled.button`
	width: 10vh;
	height: 5vh;
	background: var(--tab-bgcolor);
	border-radius: 10px;
	border: 1px solid #fff;
	span {
		font-size: 15px;
		font-weight: 700;
		vertical-align: middle;
	}
`

const StarRatingContainer = styled.div`
	width: 20.5vw;
	height: 24vh;
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
