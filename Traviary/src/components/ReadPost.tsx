import { useEffect, useState, useRef } from "react"
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

	const handlePostClose = () => {
		setOpen(false)
	}
	return (
		<>
			<Background ref={modalRef} visible={isPostOpen} onClick={onClose} />
			<Contents
				traviObj={traviObj}
				userObj={userObj}
				isPostOpen={isPostOpen}
				onClose={handlePostClose}
			/>
		</>
	)
}

export default ReadPost

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

const modalSettings = (visible: boolean) => css`
	visibility: ${visible ? "visible" : "visible"};
	z-index: 15;
	animation: ${visible ? slideIn : slideOut} 0.6s ease-out;
	transition: visibility 0.45s ease-out;
`

const Background = styled.div<{ visible: boolean }>`
	width: 100%;
	height: 100%;
	position: fixed;
	display: flex;
	top: 100px;
	background-color: rgba(0, 0, 0, 0.6);

	${(props) => modalSettings(props.visible)}
`
