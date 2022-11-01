import React, { FormEvent, ChangeEvent, useState } from "react"
import styled from "styled-components"
import { updateDoc, doc } from "firebase/firestore"
import { dbService } from "src/fbase"

export default function EditData({ traviObj }: any) {
	const [editData, setEditData] = useState(false)
	const [editText, setEditText] = useState(traviObj.text)

	const TraviRef = doc(dbService, "TraviDB", `${traviObj.id}`)

	const onSubmit = async (event: FormEvent) => {
		event.preventDefault()
		await updateDoc(TraviRef, { text: editText })
		setEditData(false)
	}

	const onChangeText = (
		event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
	) => {
		const {
			target: { value },
		} = event
		setEditText(value)
	}
	return (
		<>
			<Container>
				<form onSubmit={onSubmit}>
					<input
						type="textarea"
						value={traviObj.text}
						onChange={onChangeText}
						required
					/>
					<input type="submit" value="update" />
				</form>
			</Container>
		</>
	)
}

const Container = styled.div`
	background: #fff;
	width: 300px;
	position: absolute;
`
