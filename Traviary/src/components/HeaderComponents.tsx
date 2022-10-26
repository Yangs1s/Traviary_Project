/** @format */

import React, { useEffect, useState } from "react"
import styled from "styled-components"
import GlobalStyle from "../assets/Globalstyles"
import SocialLogin from "./SocialLogin"

// react-icons
import { GiPalmTree } from "react-icons/gi"
import { GiArchiveRegister } from "react-icons/gi"
import { BiLogIn } from "react-icons/bi"
import { BiLogOut } from "react-icons/bi"
import { MdPostAdd } from "react-icons/md"

import { Link, useNavigate } from "react-router-dom"
import { authService } from "../fbase"
import PostModal from "./PostModal"

export default function HeaderComponents() {
	// const [init, setInit] = useState(false)
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [userObj, setUserObj] = useState<any>(null)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const navigate = useNavigate()

	useEffect(() => {
		authService.onAuthStateChanged((user) => {
			if (user) {
				setIsLoggedIn(true)
				setUserObj(user)
			} else {
				setIsLoggedIn(false)
			}
			// setInit(true)
		})
	}, [])
	const Logout = () => {
		authService.signOut()
		navigate("/")
	}
	const toggleAddPost = () => {
		setIsModalOpen((prev) => !prev)
	}

	return (
		<>
			<Header>
				<GlobalStyle />
				<LogoWrapper>
					<GiPalmTree className="logo" />
					<Title>
						<Link to="/main">
							<span>Traviary</span>
							<Shadow />
						</Link>
					</Title>
				</LogoWrapper>

				{!isLoggedIn ? (
					<>
						<IconWrapper>
							<SocialLogin />
						</IconWrapper>
					</>
				) : (
					<>
						<IconWrapper>
							<MdPostAdd className="icon" onClick={toggleAddPost} />
							<BiLogOut className="icon" onClick={Logout} />
						</IconWrapper>
					</>
				)}
			</Header>

			<ModalContainer>
				<PostModal
					isModalOpen={isModalOpen}
					setIsModalOpen={setIsModalOpen}
					userObj={userObj}
				/>
			</ModalContainer>
		</>
	)
}

const Header = styled.header`
	background: var(--tab-bgcolor);
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: fixed;
	top: 0;
	width: 100%;
	z-index: 100;
`

const LogoWrapper = styled.div`
	width: 100%;
	height: 100px;
	display: flex;
	align-items: center;
	.logo {
		font-size: 50px;
		margin-right: 5px;
	}
	padding: 20px;
	@media screen and (min-width: 900px) {
		width: 100%;
	}
`
const Title = styled.h1`
	font-size: 50px;
	color: var(--main-color);
	font-weight: 700;
	font-family: var(--font-lobster);

	@media screen and (min-width: 400px) {
		font-size: calc(var(--base-size) * 3);
	}
`
const Shadow = styled.div`
	width: 100%;
	height: 3px;
	margin-top: 2px;
	background: var(--main-color);
	border-radius: 100%;
`
const IconWrapper = styled.div`
	width: 20%;
	display: flex;
	cursor: pointer;
	.icon {
		width: 30px;
		font-size: calc(var(--base-size) * 4);
		margin-right: 30px;
		color: var(--main-color);
		cursor: pointer;
	}
	@media screen and (max-width: 900px) {
		width: 50%;
		.icon {
			font-size: 40px;
			margin-right: 30px;
			color: var(--main-color);
			cursor: pointer;
		}
	}
	@media screen and (max-width: 500px) {
		width: 50%;
		.icon {
			margin-right: 5px;
			cursor: pointer;
		}
	}
	@media screen and (max-width: 400px) {
		width: 50%;
		.icon {
			margin-right: 5px;
			cursor: pointer;
		}
	}
`

const ModalContainer = styled.div`
	width: 1020px;
	height: 100%;
	@media screen and (max-width: 900px) {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 500px;
	}
	@media screen and (max-width: 500px) {
		position: fixed;
		top: 0;
		left: 0;
		width: 95%;
		height: 500px;
	}
	@media screen and (max-width: 400px) {
		position: fixed;
		top: 0;
		left: 0;
		width: 92%;
		height: 500px;
	}
`
