import HeaderComponents from "../components/HeaderComponents"
import { Outlet } from "react-router-dom"

export default function Header() {
	return (
		<>
			<HeaderComponents />
			<Outlet />
		</>
	)
}
