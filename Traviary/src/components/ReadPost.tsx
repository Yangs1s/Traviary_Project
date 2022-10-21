import React, { useEffect, useState, ImgHTMLAttributes } from "react"
import styled from "styled-components"

const ReadPost = ({ traviObj }: { traviObj: any }) => {
	return (
		<PostContainer>
			<Wrapper id={traviObj.id}>{traviObj.text}</Wrapper>
		</PostContainer>
	)
}

export default ReadPost

const PostContainer = styled.div`
	display: none;
	flex-direction: row;

	width: 500px;
	height: 70%;
	background: #fff;
	border: 2px solid #000;
	position: absolute;
	top: 100px;

	bottom: 0;
	right: 0;
`

const Wrapper = styled.div`
	width: 100%;
`
