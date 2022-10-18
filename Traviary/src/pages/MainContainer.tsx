import MainContainerComponents from "../components/MainContainerComponents"

export default function MainContainer({isOpen}:{isOpen:boolean}) {
	
	return (
		<>
			<MainContainerComponents isOpen={isOpen}/>
		</>
	)
}
