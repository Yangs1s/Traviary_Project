/** @format */

import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Gallery from "./Gallery"
import ReadPost from "./ReadPost"
import { dbService } from "../fbase"
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
	const [images, setImages] = useState<any[]>([])
	const [isOpenPost, setIsOpenPost] = useState(false)
	const [travis, setTravis] = useState<TraviProp[]>([])
	// const [isOpen, setIsOpen] = useState(props)

	const handleOpenPost = () => {
		setIsOpenPost((prev) => !prev)
	}

	useEffect(() => {
		setImages(Test.imgs)
	}, [])

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

	return (
		<>
			<Container>
				<GridContainer>
					{travis.map((travi: any) => (
						<div onClick={handleOpenPost} key={travi.id}>
							<Gallery traviObj={travi} />
						</div>
					))}
				</GridContainer>
			</Container>
			{travis.map((travi) => (
				<ReadPost key={travi.id} traviObj={travi} />
			))}
		</>
	)
}

export default MainContainerComponents

const Container = styled.div`
	width: 100%;
	height: 100%;
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
	margin: 30px 30px;
	border-radius: 15px;
	position: absolute;
	top: 100px;
	z-index: 0;
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
