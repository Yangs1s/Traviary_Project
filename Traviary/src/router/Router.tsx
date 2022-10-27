import { BrowserRouter, Routes, Route } from "react-router-dom"
import Footer from "../pages/Footer"
import Auth from "../pages/Auth"
import Header from "../pages/Header"
import MainContainer from "../pages/MainContainer"
import { useState } from "react"

export default function Router() {
	const [showed, setShowed ]= useState(true)

	const onClick = () =>{
		setShowed(prev=>!prev)
	}
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Header isShowed={showed} />}>
						<Route path="main" element={<MainContainer isClose={showed}/>} />
						<Route path="auth" element={<Auth />} />
					</Route>
				</Routes>
			</BrowserRouter>
			<Footer/>
		</>
	)
}
