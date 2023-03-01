/** @format */

import { useRef, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import CreateCard from "./CreateCard";

type PostType = {
	isModalOpen: boolean;
	setIsModalOpen: any;
	userObj: any;
};

const OpenCreateModal = ({
	isModalOpen,
	setIsModalOpen,
	userObj,
}: PostType) => {
	// 모달 창 배경 고정
	useEffect(() => {
		{
			isModalOpen
				? (document.body.style.overflowY = "scroll")
				: (document.body.style.overflowY = "hidden");
		}
	});

	console.log(isModalOpen);

	const onClose = (e: any) => {
		if (modalRef.current === e.target) {
			setIsModalOpen((prev: any) => !prev);
		}
	};

	// 모달 애니메이션 //
	const modalRef: any = useRef();

	return (
		<>
			{isModalOpen ? (
				<Background ref={modalRef} onClick={onClose} visible={isModalOpen}>
					<CreateCard userObj={userObj} isModalOpen={isModalOpen} />
				</Background>
			) : null}
		</>
	);
};
export default OpenCreateModal;

const slideIn = keyframes`
  0% {
	opacity:0
  }

  100% {
	opacity:1;
  }
`;

const slideOut = keyframes`
0% {
	opacity:1
  }

  100% {
	opacity:0;
  }
`;

const modalSettings = (visible: boolean) => css`
	visibility: ${visible ? "visible" : "visible"};
	z-index: 15;
	animation: ${visible ? slideIn : slideOut} 0.6s ease-out;
	transition: visibility 0.45s ease-out;
`;

const Background = styled.div<{ visible: boolean }>`
	width: 100%;
	height: 100%;
	position: fixed;
	display: flex;
	top: 100px;
	${(props) => modalSettings(props.visible)}
`;
