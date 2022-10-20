import MainContainerComponents from "../components/MainContainerComponents"
import { authService } from "../fbase"
import { useEffect, useState,ImgHTMLAttributes } from "react"
import styled from "styled-components"
import ReadPost from "../components/ReadPost"

interface NameProp {
	displayName:string
}

export default function MainContainer() {


	return (
		<>
			<MainContainerComponents/>
		</>
	)
}

