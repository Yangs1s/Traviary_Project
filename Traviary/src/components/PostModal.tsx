
import React, {
	useState,
	useRef,
	ImgHTMLAttributes,
	useEffect,
	FormEvent,
	ChangeEvent,
} from "react"


import { useSpring, animated } from "react-spring"
import styled from "styled-components"

import {
	addDoc,
	collection,
	onSnapshot,
	orderBy,
	query,
	Timestamp,
} from "firebase/firestore"

import { dbService, storageService } from "../fbase"
import AddPosting from './AddPosting';

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
				: (document.body.style.overflow = "scroll")
		}
	})

	const onClose = (e: any) => {
		if (modalRef.current === e.target) {
			setIsModalOpen((prev: any) => !prev)
		}
	}

	// 모달 애니메이션 //
	const modalRef: any = useRef()

	const animation: any = useSpring({
		config: {
			duration: 250,
		},
		transform: isModalOpen ? `translateX(233%)` : `translateX(400%)`,
		position: "absolute",
		top: 0,
		width: "30vw",
		height: "100%",
	})

	return (
		<>
			{isModalOpen
			? <Background ref={modalRef} onClick={onClose}>
					<animated.div style={animation}>
						<AddPosting userObj={userObj} isModalOpen={isModalOpen}/>
					</animated.div>
				</Background>
			 : null}
		</>
	)
}
export default AddPost

const Background = styled.div`
	width: 100%;
	height: 100%;
	position: fixed;
	display: flex;
	z-index: 9999;
	top: 100px;
`
