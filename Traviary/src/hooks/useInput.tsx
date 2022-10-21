import React, { ChangeEvent, useState } from "react"

const useInput = (
	initailValue: string | unknown,
	validator?: (value: string) => boolean
) => {
	const [value, setValue] = useState(initailValue)

	const onChange = (
		event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
	) => {
		const {
			target: { value },
		} = event
		console.log(value)
		let willUpdate = true

		if (typeof validator === "function") {
			willUpdate = validator(value)
		}

		if (willUpdate) {
			setValue(value)
		}
	}
	return { value, onChange }
}

export default useInput
