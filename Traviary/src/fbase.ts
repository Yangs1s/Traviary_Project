import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const {
	VITE_FIREBASE_API_KEY,
	VITE_FIREBASE_AUTH_DOMAIN,
	VITE_FIREBASE_DATABASE_URL,
	VITE_FIREBASE_PROJECT_ID,
	VITE_FIREBASE_STORAGE_BUCKET,
	VITE_FIREBASE_MEASUREMENT_ID,
	VITE_FIREBASE_APP_ID,
} = import.meta.env

const firebaseConfig = {
	apiKey: VITE_FIREBASE_API_KEY,
	authDomain: VITE_FIREBASE_AUTH_DOMAIN,
	projectId: VITE_FIREBASE_PROJECT_ID,
	storageBucket: VITE_FIREBASE_STORAGE_BUCKET,
	databaseURL: VITE_FIREBASE_DATABASE_URL,
	appId: VITE_FIREBASE_APP_ID,
	measurementId: VITE_FIREBASE_MEASUREMENT_ID,
}

export const app = initializeApp(firebaseConfig)
export const authService = getAuth()
