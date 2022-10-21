/** @format */

import React, { useState, useEffect } from "react"
import Test from "../mock_data/Img_test.json"
import styled from "styled-components"
import Gallery from "./Gallery"
import ReadPost from "./ReadPost"
import { dbService } from '../fbase';
import { collection, query, onSnapshot,Timestamp } from "firebase/firestore";


type GalleryProps = {
	id: number;
	imgsrc: string
}

interface TraviProp {
    id?: string;
    text?: string;
    // creatAt?: Timestamp;
    // createdId?: string;
    // image?: ImgHTMLAttributes<HTMLImageElement>;
  }
const MainContainerComponents = () => {
	const [images, setImages] = useState<GalleryProps[]>([])
	const [isOpenPost, setIsOpenPost] = useState(false);
	const [travis,setTravis] = useState<TraviProp[]>([])
	// const [isOpen, setIsOpen] = useState(props)


	const handleOpenPost = () => {
		setIsOpenPost((prev) => !prev);
	};
	
	useEffect(() => {
		setImages(Test.imgs)
		console.log(images)
	}, [])
	

	useEffect(()=>{
		const q = query(collection(dbService, "TraviDB"))
		onSnapshot(q, (querySnapshot) => {
			const Travi:any = querySnapshot.docs.map((docs) =>({
				id:docs.id,
				...docs.data(),
			}))
			setTravis(Travi)
			console.log(travis)
		})
	},[])

	return (
		<>
		<Container>
			<GridContainer>
				{images.map((image: any) => (
					<div onClick={handleOpenPost} key={image.id} >
						<Gallery imgsrc={image.imgsrc} id={image.id} />
						{/* <ReadPost traviObj ={image}></ReadPost> */}
					</div>
				))}
			</GridContainer>
		</Container>
		{travis.map((travi)=>
		<ReadPost 
		key={travi.id} 
		traviObj={travi}/>
		)}
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
	-webkit-column-count: 5;
	-moz-column-count: 5;
	column-count: 5;
	-webkit-column-width: 20%;
	-moz-column-width: 20%;
	column-width: 20%;
	padding: 20px 20px;
	margin: 10px 30px;
	border-radius: 15px;

	@media screen and (max-width: 901px) {
		-webkit-column-count: 3;
		-moz-column-count: 3;
		column-count: 3;
		column-width: 100%;
	}
	@media screen and (max-width: 501px) {
		-webkit-column-count: 2;
		-moz-column-count: 2;
		column-count: 2;
	}
	@media screen and (max-widh: 400px) {
		-webkit-column-count: 1;
		-moz-column-count: 1;
		column-count: 1;
		-webkit-column-width: 100%;
		-moz-column-width: 100%;
		column-width: 100%;
	}
`
