import HeaderComponents from "../components/HeaderComponents"
import { Link, Outlet } from "react-router-dom"

export default function Header() {
	return (
		<>
			<HeaderComponents />
			<Link to="MainContainer">링크</Link>
			<Outlet />
		</>
	)
}
