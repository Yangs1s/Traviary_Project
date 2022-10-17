/** @format */

import React, { useEffect, useState } from "react"
import styled from "styled-components"
import GlobalStyle from "../assets/Globalstyles"

// react-icons
import { GiPalmTree } from "react-icons/gi"
import { GiArchiveRegister } from "react-icons/gi"
import { BiLogIn } from "react-icons/bi"
import { BiLogOut } from "react-icons/bi"
import { MdPostAdd } from "react-icons/md"

import { Link } from "react-router-dom"
import { authService } from "../fbase"

export default function HeaderComponents() {
	const [init, setInit] = useState(false)
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	useEffect(() => {
		authService.onAuthStateChanged((user) => {
			if (user) {
				setIsLoggedIn(true)
			} else {
				setIsLoggedIn(false)
			}
			setInit(true)
		})
	})

	return (
		<Header>
			<GlobalStyle />
			<LogoWrapper>
				<GiPalmTree className="logo" />
				<Title>
					<Link to="/">
						<h1>Traviary</h1>
						<Shadow />
					</Link>
				</Title>
			</LogoWrapper>

			{isLoggedIn ? (
				<>
					<IconWrapper>
						<BiLogIn className="icon" />
						<GiArchiveRegister className="icon" />
					</IconWrapper>
				</>
			) : (
				<>
					<IconWrapper>
						<MdPostAdd className="icon" />
						<BiLogOut className="icon" />
					</IconWrapper>
				</>
			)}
		</Header>
	)
}

const Header = styled.header`
	background: var(--tab-bgcolor);
	display: flex;
	justify-content: space-between;
	align-items: center;
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
`
const Title = styled.h1`
	font-size: calc(var(--base-size) * 5);
	color: var(--main-color);
	font-weight: 700;
	font-family: var(--font-lobster);
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
	.icon {
		font-size: calc(var(--base-size) * 4);
		margin-right: 30px;
		color: var(--main-color);
	}
	@media screen and (max-width: 991px) {
		width: 50%;
	}
`
