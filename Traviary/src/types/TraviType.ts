import { Timestamp } from "firebase/firestore"

export type GalleryPropType = {
	id?: string
	text?: string
	createdId?: string
	fileAttachURL: string
}

export type CardTraviObjType = {
	createdId: string
	creatAt: Timestamp
	id: string
	text: string
	ratings: {
		pricerating: number
		tasterating: number
		visualrating: number
	}
	fileAttachURL: string[]
	hashtag: string[]
}
