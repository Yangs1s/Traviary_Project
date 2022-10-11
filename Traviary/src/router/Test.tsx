import React, { useState } from "react"
import styled from "styled-components";

const Div2 = styled.div `
	background-color:#448CCB;
	color:#FFF7F2;
	font-size:30px;
	margin-top: 5px;
	width:200px;
	height:30px;
	padding:10px;
	font-weight:600;
`
const Font = styled.h1`
	color:#29141A;
`
const Cont = styled.main`
	max-width: 1280px;
	margin: 0 auto;
	padding: 2rem;
	text-align: center;
`

export default function Test() {
	const [count, setCount] = useState(0)
	
	return (
		<Cont className="App">
			<Div2>Traviray</Div2>
			<h1>Traviray</h1>
			<Font>Traviary</Font>
		</Cont>
	)
}
