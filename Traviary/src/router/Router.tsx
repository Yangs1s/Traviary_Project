import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "../pages/Header"
import MainContainer from "../pages/MainContainer"

export default function Router() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Header />}>
						<Route path="main" element={<MainContainer />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	)
}
