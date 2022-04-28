import { writable } from 'svelte/store'
import appwrite from './appwrite'
import type { Models } from 'appwrite'

type Prefs = Record<string, never> // empty object ({})
type User = Models.User<Prefs>

const user = writable<User>(null)

export async function loadUser() {
	try {
		const u = await appwrite.account.get()
		user.set(u || null)
	} catch {
		user.set(null)
	}
}

export default user
