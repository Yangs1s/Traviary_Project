import {
	GithubAuthProvider,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth"
import React, { useState } from "react"
import { authService } from "../fbase"
import styled from "styled-components"
import { GiArchiveRegister } from "react-icons/gi"
import { BiLogIn } from "react-icons/bi"
import { BiLogOut } from "react-icons/bi"
import { MdPostAdd } from "react-icons/md"
import { useNavigate } from "react-router"

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
		navigate('/main')
		console.log(data)
	}
	return (
		<>
			<IconWrapper>
				<BiLogIn
					type="button"
					className="icon"
					onClick={onSocialClick}
					name="google"
				/>
				<button onClick={onSocialClick} name="google">
					Continue with Google
				</button>
				<button onClick={onSocialClick} name="github">
					Continue with Github
				</button>
			</IconWrapper>
		</>
	)
}

export default SocialLogin

const IconWrapper = styled.div`
	width: 20%;
	display: flex;
	.icon {
		font-size: calc(var(--base-size) * 4);
		margin-right: 30px;
		color: var(--main-color);
	}
	@media screen and (max-width: 991px) {
		width: 50%;
	}
`
