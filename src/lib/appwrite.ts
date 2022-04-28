import { Appwrite } from 'appwrite'

const appwrite = new Appwrite()

appwrite
	.setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
	.setProject(import.meta.env.VITE_APPWRITE_PROJECT)

export default appwrite
