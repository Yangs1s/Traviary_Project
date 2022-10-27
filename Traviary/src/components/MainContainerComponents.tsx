/** @format */

import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Gallery from "./Gallery"
import ReadPost from "./ReadPost"
import { dbService, authService } from "../fbase"
import {
	collection,
	query,
	onSnapshot,
	Timestamp,
	orderBy,
} from "firebase/firestore"

interface TraviProp {
	id?: string
	text?: string
	creatAt?: Timestamp
	createdId?: string
}
const MainContainerComponents = ({isClose}:{isClose:boolean}) => {
	const [isOpenPost, setIsOpenPost] = useState(false)
	const [travis, setTravis] = useState<TraviProp[]>([])
	const [postId, setPostId] = useState("")
	const [userId, setUserId] = useState("")

	useEffect(() => {
		const q = query(collection(dbService, "TraviDB"))
		onSnapshot(q, (querySnapshot) => {
			const Travi = querySnapshot.docs.map((docs) => ({
				id: docs.id,
				...docs.data(),
			}))
			setTravis(Travi)
			console.log(travis)
		})
	}, [])


	useEffect(()=>{
		authService.onAuthStateChanged((user:any) => {
			setUserId(user)
		})
	})

	const handleOpenPost = (event: React.MouseEvent<HTMLImageElement>) => {
		event.preventDefault();
		setIsOpenPost(prev => !prev)
		setPostId(event.currentTarget.id)
		console.log(event.currentTarget)
	}

	const handlePostClose = () => {
		setIsOpenPost((prev) => !prev)
	}
	return (
		<>
			<Container>
				<GridContainer>
					{travis.map((travi: any) => (
						<>
						<Gallery 
						id={travi.id}
						traviObj={travi} 
						key={travi.id} 
						onClick={handleOpenPost} 
						/>
						</>
					))}
				</GridContainer>
				
				{travis.map((travi) => (
					<>
						{postId === travi.id ? (
							<ReadPost
								key={travi.id}
								isPostOpen={!isOpenPost}
								traviObj={travi}
								userObj={userId}
								onClose={handlePostClose}
							/>
						) : null}
					</>
				))}
			</Container>
		</>
	)
}
export default MainContainerComponents

const Container = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	@media screen and (max-width: 900px) {
		width: 100%;
		height: 100%;
		margin: 0;
	}
	@media screen and (max-width: 400px) {
		width: 100%;
		height: 100%;
		margin: 0;
	}
`

const GridContainer = styled.div`
	background: #fff;
	border: 2px solid #c71967;
	-webkit-column-count: 4;
	-moz-column-count: 4;
	column-count: 4;
	-webkit-column-width: 25%;
	-moz-column-width: 25%;
	column-width: 25%;
	padding: 20px 20px;
	margin: 130px 30px;
	border-radius: 15px;
	@media screen and (max-width: 901px) {
		-webkit-column-count: 3;
		-moz-column-count: 3;
		column-count: 3;
		column-width: 25%;
	}
	@media screen and (max-width: 530px) {
		-webkit-column-count: 3;
		-moz-column-count: 3;
		column-count: 3;
		-webkit-column-width: 33%;
		-moz-column-width: 33%;
		column-width: 33%;
	}
`
