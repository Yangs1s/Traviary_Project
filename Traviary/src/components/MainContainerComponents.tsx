/** @format */

import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Gallery from "./Gallery"
import ReadPost from "./ReadPost"
import { dbService,authService } from "../fbase"
import Test from "../mock_data/Img_test.json"
import { collection, query, onSnapshot, Timestamp } from "firebase/firestore"

interface TraviProp {
	id?: string
	text?: string
	// creatAt?: Timestamp;
	// createdId?: string;
	// image?: ImgHTMLAttributes<HTMLImageElement>;
}
const MainContainerComponents = () => {
	const [isOpenPost, setIsOpenPost] = useState(false)
	const [travis, setTravis] = useState<TraviProp[]>([])
	const [postId, setPostId] = useState("")
	const [userId, setUserId] = useState('')

	useEffect(() => {
		const q = query(collection(dbService, "TraviDB"))
		onSnapshot(q, (querySnapshot) => {
			const Travi: any = querySnapshot.docs.map((docs) => ({
				id: docs.id,
				...docs.data(),
			}))
			setTravis(Travi)
		})
	}, [])

	useEffect(()=>{
		authService.onAuthStateChanged((user:any) => {
			setUserId(user)
		})
	})

	const handleOpenPost = (event: any) => {
		setIsOpenPost((prev) => !prev)
		setPostId(event.currentTarget.id)
	}

	return (
		<>
			<Container>
				<GridContainer>
					{travis.map((travi: any) => (
						<div onClick={handleOpenPost} id={travi.id} key={travi.id}>
							<Gallery traviObj={travi} />
						</div>
					))}
				</GridContainer>
				{travis.map((travi) => (
					<>
						{postId === travi.id ? (
							<ReadPost
								key={travi.id}
								isPostOpen={isOpenPost}
								traviObj={travi}
								userObj = {userId}
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
	@media screen and (max-width: 501px) {
		-webkit-column-count: 3;
		-moz-column-count: 3;
		column-count: 3;
		-webkit-column-width: 33%;
		-moz-column-width: 33%;
		column-width: 33%;
	}
`
