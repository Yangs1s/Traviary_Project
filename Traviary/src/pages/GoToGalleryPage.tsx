/** @format */
import { GiPalmTree } from "react-icons/gi"
import { Link } from "react-router-dom"
import styled from "styled-components"

export default function GoToGalleryPage() {
	return (
		<Container>
			<div className="wrapper">
				<div className="slogun">
					<Title>
						<GiPalmTree className="logo" />
						<span className="title">Traviary</span>
					</Title>
					<p className="desc">
						<strong>Traviary</strong>와 함께 당신의 일상을 기록하세요!
					</p>
				</div>
				<div className="content">
					<LogoWrapper>
						<GiPalmTree className="logo" />
						<Title>
							<Link to="/main">
								<span className="title">Traviary</span>
							</Link>
						</Title>
					</LogoWrapper>
				</div>
			</div>
		</Container>
	)
}

const Container = styled.section`
	width: 100vw;
	height: 100vh;
	.wrapper {
		margin: auto;
		display: flex;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		.slogun {
			min-width: 300px;
			margin: auto 20px;
			display: flex;
			flex-direction: column;
			.logo {
				font-size: 1.5em;
			}
			.title {
				font-size: 2em;
			}
			.desc {
				font-size: 15px;
				strong {
					font-weight: bolder;
				}
			}
		}
		.content {
			width: auto;
			height: auto;
			display: flex;
			margin: auto;
			border-radius: 20px;
			box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
			border: 3px solid #000;
		}

		@media screen and (min-width: 242px) and (max-width: 524px) {
			flex-direction: column;
			align-items: center;
			justify-content: center;
			.slogun {
				align-items: center;
				height: auto;
				margin: 20px;
			}
			.content {
				margin: 0 auto;
			}
		}
	}
`

const Wrapper = styled.div``
const LogoWrapper = styled.div`
	width: 100%;
	height: 100px;
	display: flex;
	align-items: center;
	.logo {
		font-size: 50px;
		margin-right: 5px;
		color: #000;
	}
	padding: 20px;
	@media screen and (min-width: 900px) {
		width: 100%;
	}
`
const Title = styled.h1`
	font-size: 50px;
	color: #000;
	font-weight: 700;
	font-family: var(--font-lobster);

	@media screen and (min-width: 400px) {
		font-size: calc(var(--base-size) * 3);
	}
`
