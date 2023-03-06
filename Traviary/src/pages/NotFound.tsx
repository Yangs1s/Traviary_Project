import styled from "styled-components"
import { useNavigate } from "react-router-dom"
const NotFound = () => {
	const navigate = useNavigate()

	const onClick = () => {
		navigate("/main")
	}
	return (
		<Div>
			404 <br />
			NotFound <Button onClick={onClick}>🔙</Button>
		</Div>
	)
}

export default NotFound

const Div = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 500px;
	height: 500px;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	position: absolute;
	font-size: 100px;
	font-weight: 700;
`

const Button = styled.button`
	width: 50px;
	height: 50px;
	font-size: 50px;
	position: absolute;
	top: 0%;
	right: 0%;
	border: 0;
	outline: 0;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	background-color: transparent;
`
