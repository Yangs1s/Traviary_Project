import HeaderComponents from "../components/HeaderComponents"
import { Outlet } from "react-router-dom"

const Header = ({isShowed}:{isShowed:boolean}) => {
	return (
		<>
			<HeaderComponents isShowed={isShowed} />
			<Outlet />
		</>
	)
}

export default Header;