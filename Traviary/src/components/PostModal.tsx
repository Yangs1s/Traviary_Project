import { useRef, useEffect } from "react"
import { useSpring, animated } from "react-spring"
import styled ,{css,keyframes}from "styled-components"
import AddPosting from "./AddPosting"

type PostType = {
	isModalOpen: boolean
	setIsModalOpen: any
	userObj: any
}

const AddPost = ({ isModalOpen, setIsModalOpen, userObj }: PostType) => {
	// 모달 창 배경 고정
	useEffect(() => {
		{
			isModalOpen
				? (document.body.style.overflow = "hidden")
				: (document.body.style.overflow= "scroll")
		}
	})

	const onClose = (e: any) => {
		if (modalRef.current === e.target) {
			setIsModalOpen((prev: any) => !prev)
		}
	}

	// 모달 애니메이션 //
	const modalRef: any = useRef()



	return (
		<>
			{isModalOpen ? (
				<Background ref={modalRef} onClick={onClose} visible={isModalOpen}>
						<AddPosting userObj={userObj} isModalOpen={isModalOpen} />
				</Background>
			) : null}
		</>
	)
}
export default AddPost


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

const Background = styled.div<{visible:boolean}>`
	width: 100%;
	height: 100%;
	position: fixed;
	display: flex;
	top: 100px;
  	overflow:scroll;
	${(props) => modalSettings(props.visible)}
`
