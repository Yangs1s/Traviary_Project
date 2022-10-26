
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

interface TraviType {
	id?: string
	text?: string
	creatAt?: Timestamp
	createdId?: string
}
interface RefObject<T> {
	current: T
}

const AddPost = ({ isModalOpen, setIsModalOpen, userObj }: PostType) => {
	const [infoTravi, setInfoTravi] = useState<TraviType[]>([])
	const [isModal,setIsModal] = useState(true)


	useEffect(() => {
		const queries = query(
			collection(dbService, "TraviDB"),
			orderBy("createdAt", "desc")
		)
		onSnapshot(queries, (snapshot) => {
			const traviArr = snapshot.docs.map((dosc) => ({
				id: dosc.id,
				...dosc.data(),
			}))
			setInfoTravi(traviArr)

		})
	}, [])

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
			{isModalOpen === isModal ? (
				<Background ref={modalRef} onClick={onClose}>
					<animated.div style={animation}>

						<AddPosting userObj={userObj} isModalOpen={isModalOpen}/>
					</animated.div>
				</Background>
			) : <BackgroundHide ref={modalRef}>
					<animated.div style={animation}>
						<AddPosting userObj={userObj} isModalOpen={isModalOpen}/>
					</animated.div>
				</BackgroundHide>}

					</animated.div>
				</Background>
			)
		</>
	)
}
export default AddPost

const Background = styled.div`
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.8);
	position: fixed;
	display: flex;
	z-index: 9999;
	top: 100px;
`

const BackgroundHide = styled.div`
	width: 100%;
	height: 100%;
	display: none;
	z-index: 9999;
	top: 100px;
`

