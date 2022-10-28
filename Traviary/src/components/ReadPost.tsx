import React, { useEffect, useState, useRef, ReactNode } from "react"
import styled, { css, keyframes } from "styled-components"

import Contents from "./Contents"

export type ModalBaseProps = {
	traviObj: any
	userObj: any
	isPostOpen: boolean
	onClose: () => void
}

const ReadPost = ({
	traviObj,
	isPostOpen,
	userObj,
	onClose,
}: ModalBaseProps) => {
	const [open, setOpen] = useState(false)
	const modalRef: any = useRef()

	useEffect(() => {
		let timeoutId: NodeJS.Timeout
		if (isPostOpen) {
			setOpen(true)
		} else {
			setTimeout(() => setOpen(false), 150)
		}

		return () => {
			if (timeoutId !== undefined) {
				clearTimeout(timeoutId)
			}
		}
	}, [isPostOpen])

	if (!open) {
		return null
	}
	return (
		<>
			{isPostOpen === open ? (
				<Background visible={isPostOpen}>
					<PostContainer ref={modalRef} visible={isPostOpen}>
						<Contents traviObj={traviObj} userObj={userObj} />
					</PostContainer>
				</Background>
			) : null}
		</>
	)
}

export default ReadPost

const slideIn = keyframes`
  0% {
	transform:translateX(100%);
  }

  100% {
	transform:translateX(0%);
  }
`

const slideOut = keyframes`
	0% {
	transform:translateX(0%);
  }

  100% {
	transform:translateX(100%);
  }
`

const modalSettings = (visible: boolean) => css`
	visibility: ${visible ? "visible" : "hidden"};
	z-index: 15;
	animation: ${visible ? slideIn : slideOut} 0.6s ease-out;
	transition: visibility 0.45s ease-out;
`
const Background = styled.div<{ visible: boolean }>`
	width: 100%;
	height: 100%;
	position: fixed;
	display: flex;
	z-index: 9999;
	top: 100px;
	background-color: rgba(0, 0, 0, 0.6);
`
const PostContainer = styled.div<{ visible: boolean }>`
	border-top-left-radius: 10px;
	border-bottom-left-radius: 10px;
	border-bottom-right-radius: 10px;
	width: 50%;
	height: 80%;
	background: #fff;
	border: 2px solid #fefefe;
	box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);
	position: absolute;
	right: 0;

	${(props) => modalSettings(props.visible)}

	@media screen and (max-width: 1000px) {
		width: 100%;
		height: 60%;
		position: absolute;
		top: 160px;
		margin: 0;
	}
	@media screen and (max-width: 530px) {
		width: 100%;
		height: 60%;
		position: absolute;
		top: 160px;
		margin: 0;
	}
`
