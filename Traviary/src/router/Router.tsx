/** @format */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "@/pages/Auth";
import Main from "@/pages/Main";
import { useState } from "react";
import NotLoginPage from "@/pages/NotLoginPage";
import Layout from "@/pages/Layout";

export default function Router() {
	const [showed, setShowed] = useState(true);

	const onClick = () => {
		setShowed((prev) => !prev);
	};
	return (
		<>
			<BrowserRouter>
				<Layout>
					<Routes>
						<Route path="/" element={<NotLoginPage />} />
						<Route path="/main" element={<Main />} />
						<Route path="auth" element={<Auth />} />
					</Routes>
				</Layout>
			</BrowserRouter>
		</>
	);
}
