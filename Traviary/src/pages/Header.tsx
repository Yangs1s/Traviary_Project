import HeaderComponents from "../components/HeaderComponents"
import { Outlet } from "react-router-dom"

const Header = () => {
	return (
		<>
			<HeaderComponents />
			<Outlet />
		</>
	)
}

export default Header
