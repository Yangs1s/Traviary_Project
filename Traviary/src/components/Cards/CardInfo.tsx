/** @format */

import { useEffect, useState } from "react"
import { doc, deleteDoc } from "firebase/firestore"
import { dbService } from "@/fbase"
import EditCardInfo from "./EditCardInfo"
import ReadStar from "@components/ReadStar"
import { AiTwotoneDelete } from "react-icons/ai"
import { BiPencil } from "react-icons/bi"
import { TbNotes } from "react-icons/tb"
import { BsStars } from "react-icons/bs"
import styled, { keyframes, css } from "styled-components"

const CardInfo = ({
	traviObj,
	userObj,
	isPostOpen,
	onClose,
}: {
	traviObj: any
	userObj: any
	isPostOpen: boolean
	onClose: (e: any) => void
}) => {
	const [editing, setEditing] = useState<boolean>(false)
	const [editData, setEditData] = useState<boolean>(false)

	const TraviRef = doc(dbService, "TraviDB", `${traviObj.id}`)

	const onDeleteClick = async () => {
		const Ok = window.confirm("삭제하시겠습니까???")
		if (Ok) {
			await deleteDoc(TraviRef)
		}
	}

	const toggleEditing = () => {
		setEditData((prev) => !prev)
	}

	useEffect(() => {
		if (traviObj.createdId === userObj.uid) {
			setEditing(true)
		} else {
			setEditing(false)
		}
	})
	return (
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
											<EditCardInfo
												traviObj={traviObj}
												isToggle={toggleEditing}
											/>
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
							<SubTitle>
								<Star />
								<Name> RATING </Name>
							</SubTitle>
							<StatWrapper>
								<li>
									Taste:&nbsp;
									<ReadStar ratingLength={traviObj.ratings.tasterating} />
								</li>
								<li>
									Price:&nbsp;
									<ReadStar ratingLength={traviObj.ratings.pricerating} />
								</li>
								<li>
									Visual:&nbsp;
									<ReadStar ratingLength={traviObj.ratings.visualrating} />
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

							<TextContent>{traviObj.text}</TextContent>
						</TextContainer>
					</TextStatContainer>
				</ContentContainer>
			</Wrapper>
		</PostContainer>
	)
}

export default CardInfo

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

const PostContainer = styled.div<{ visible: boolean }>`
	border-radius: 10px;
	width: 65vw;
	height: 63vh;
	background: #fff;
	box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 100;

	${(props) => modalSettings(props.visible)}
	@media screen and (min-width: 280px) and (max-width: 770px) {
		width: 80vw;
		height: 80vh;
	}
`

const Wrapper = styled.div`
	width: 65vw;
	height: 60vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	z-index: 1;
	@media screen and (min-width: 280px) and (max-width: 770px) {
		width: 80vw;
	}
`

/// HEADER --- HEADER
const PostHeader = styled.header`
	width: 100%;
	height: 6vh;
	border-bottom: 1px solid rgba(0, 0, 0, 0.3);
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
	background: var(--tab-bgcolor);
`
const HeaderWrapper = styled.div`
	width: 65vw;
	height: 6vh;
	display: flex;
	justify-content: center;
`
const Closebox = styled.div`
	width: 58vw;
	float: left;
	padding-left: 5px;
	display: inherit;
`

const CloseBtn = styled.button`
	width: 3vw;
	height: 3vh;
	outline: none;
	border: none;
	margin-top: 0;
	background: transparent;
	span {
		font-size: 3em;
		color: var(--main-color);
	}
	@media screen and (min-width: 280px) and (max-width: 770px) {
		span {
			font-size: 2.6em;
		}
	}
`

const Icons = styled.div`
	display: flex;
	align-items: center;
	.icons {
		font-size: 3.5em;
		color: var(--main-color);
		text-align: center;
		margin-right: 5px;
		padding: 0 5px;
	}
`

// CONTENT //
const ContentContainer = styled.div`
	width: 65vw;
	height: 60vh;
	display: flex;
	align-items: center;
	@media screen and (min-width: 280px) and (max-width: 770px) {
		flex-direction: column;
	}
`

// CONTENT --- Image////////
const ImageContainer = styled.div`
	width: 48vw;
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
	padding: 1em;
	text-align: center;
	margin: auto;
	@media screen and (min-width: 280px) and (max-width: 770px) {
		padding: 1px;
		width: 60vw;
		max-width: 350px;
	}
`

//CONTETN -  TEXT//
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
	height: 48vh;
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

// CONTENT - Stat //
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
// TITLE

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
