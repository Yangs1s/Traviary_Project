/** @format */

import React, { useEffect, useState } from "react"
import Test from "../mock_data/Img_test.json"
import styled from "styled-components"

const Gallery = ({ imgsrc, id }: { id: string; imgsrc: string }) => {
	return (
		<ImgItem>
			<Image key={id} src={imgsrc} alt="게시글이미지" />
		</ImgItem>
	)
}

export default Gallery

const Image = styled.img`
	width: 100%;
	height: 100%;
`
const ImgItem = styled.div`
	-webkit-transition: all 350ms ease;
	transition: all 350ms ease;
	cursor: pointer;
	margin-bottom: 12px;

	:hover {
		filter: opacity(0.8);
	}
`
