import React from "react"
import styled from "styled-components"

interface GalleryProp {
	id?: string
	fileAttachURL: string
}

const Gallery = ({
	traviObj,
	onClick,
}: {
	traviObj: GalleryProp
	onClick: (event: React.MouseEvent<HTMLImageElement>) => void
}) => {
	return (
		<>
			<ImgItem>
				<Image
					id={traviObj.id}
					key={traviObj.id}
					src={traviObj.fileAttachURL}
					alt="게시글이미지"
					onClick={onClick}
				/>
			</ImgItem>
		</>
	)
}

export default Gallery

const Image = styled.img`
	width: 100%;
	height: 100%;
	border-radius: 10px;
`
const ImgItem = styled.div`
	-webkit-transition: all 350ms ease;
	transition: all 350ms ease;
	cursor: pointer;
	margin-bottom: 12px;
	border-radius: 10px;
	box-shadow: 1px 2px 5px 2px rgba(0, 0, 0, 0.2);
	:hover {
		-webkit-filter: brightness(0.5);
		filter: brightness(0.5);
	}
`
