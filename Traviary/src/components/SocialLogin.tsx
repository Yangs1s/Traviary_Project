import {
	GithubAuthProvider,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth"
import { authService } from "../fbase"

import React, { useState } from "react"
import { useNavigate } from "react-router"

import styled from "styled-components"

const SocialLogin = () => {
	const navigate = useNavigate()
	const onSocialClick = async (event: any) => {
		const {
			target: { name },
		} = event
		let provider: any
		if (name === "google") {
			provider = new GoogleAuthProvider()
		} else if (name === "github") {
			provider = new GithubAuthProvider()
		}
		const data = await signInWithPopup(authService, provider)
		navigate("/main")
		console.log(data)
	}
	return (
		<>
			<IconWrapper>
				<button onClick={onSocialClick} name="google">
					구글
				</button>
				<button onClick={onSocialClick} name="github">
					깃헙
				</button>
			</IconWrapper>
		</>
	)
}

export default SocialLogin

const IconWrapper = styled.div`
	width: 20%;
	display: flex;
	@media screen and (max-width: 991px) {
		width: 50%;
	}
`

const Img = styled.img`
	box-sizing: border-box;
	width: 30px;
	background-color: #ff0063;
`
