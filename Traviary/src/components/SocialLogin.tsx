import {
	GithubAuthProvider,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth"
import React, { useState } from "react"
import { authService } from "../fbase"
import {FcGoogle} from 'react-icons/fc'
const SocialLogin = () => {
	const onSocialClick = (event: any) => {
		const {
			target: { name },
		} = event
		let provider: any
		if (name === "google") {
			provider = new GoogleAuthProvider()
		} else if (name === "github") {
			provider = new GithubAuthProvider()
		}
		const data = signInWithPopup(authService, provider)
		console.log(data)
	}
	return (
		<>			
			<button onClick={onSocialClick} name="google">
			Continue with Github
			</button>
			<button onClick={onSocialClick} name="github">
				Continue with Github
			</button>
		</>
	)
}

export default SocialLogin
