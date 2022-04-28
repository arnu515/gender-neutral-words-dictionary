<script lang="ts">
import user, { loadUser } from '$lib/user.store'
import appwrite from '$lib/appwrite'

let username = '',
	email = '',
	ep = ''
let op = '',
	np = '',
	cp = ''
let loading = false

async function changeUsername() {
	try {
		if (!username.trim()) throw new Error("Username can't be empty")
		if (username === $user.name)
			throw new Error("Username can't be the same as the current one")
		await appwrite.account.updateName(username.trim())
		await loadUser()
	} catch (e) {
		alert(e.message)
	}
}
async function changeEmail() {
	if (!window.confirm('You will be logged out if you do this. Proceed?')) return
	try {
		if (!username.trim()) throw new Error("Email can't be empty")
		if (!ep.trim()) throw new Error("Password can't be empty")
		if (username === $user.name)
			throw new Error("Email can't be the same as the current one")
		await appwrite.account.updateEmail(email.trim(), ep)
		await appwrite.account.deleteSession('current')
		await loadUser()
	} catch (e) {
		alert(e.message)
	}
}
async function changePassword() {
	if (!window.confirm('You will be logged out if you do this. Proceed?')) return
	try {
		if (!op || !np || !cp) throw new Error("Password can't be empty")
		if (np !== cp) throw new Error("Passwords don't match")
		await appwrite.account.updatePassword(np, op)
		await appwrite.account.deleteSession('current')
		await loadUser()
	} catch (e) {
		alert(e.message)
	}
}
async function logout() {
	if (!window.confirm('Are you sure?')) return
	try {
		await appwrite.account.deleteSession('current')
		await loadUser()
	} catch (e) {
		alert(e.message)
	}
}
</script>

{#if $user}
	<h1
		class="m-4 text-center text-2xl font-bold sm:my-6 sm:text-3xl md:my-8 md:text-4xl lg:my-12 lg:text-5xl"
	>
		Your profile
	</h1>
	<form on:submit|preventDefault={changeUsername}>
		<h3>Change username</h3>
		<label for="username">New Username</label>
		<input
			required
			autocomplete="off"
			type="text"
			bind:value={username}
			placeholder={$user.name}
			id="username"
		/>
		<button
			disabled={loading || !username.trim() || username === $user.name}
			class="button"
			type="submit">Save</button
		>
	</form>
	<form on:submit|preventDefault={changeEmail}>
		<h3>Change email</h3>
		<label for="email">New Email</label>
		<input
			required
			autocomplete="off"
			type="email"
			bind:value={email}
			placeholder={$user.email}
			id="email"
		/>
		<label for="ep" class="mt-2">Your Password</label>
		<input
			required
			autocomplete="off"
			type="password"
			bind:value={ep}
			placeholder="Enter your password"
			id="ep"
		/>
		<button
			disabled={loading || !email.trim() || !ep || email === $user.name}
			class="button"
			type="submit">Save</button
		>
	</form>
	<form on:submit|preventDefault={changePassword}>
		<h3>Change password</h3>
		<label for="op">Current Password</label>
		<input
			required
			autocomplete="off"
			type="password"
			bind:value={op}
			placeholder="Enter your current password"
			id="op"
		/>
		<label for="np" class="mt-2">New Password</label>
		<input
			required
			autocomplete="off"
			type="password"
			bind:value={np}
			placeholder="Enter a new password"
			id="np"
		/>
		<label for="cp" class="mt-2">Confirm New Password</label>
		<input
			required
			autocomplete="off"
			type="password"
			bind:value={cp}
			placeholder="Enter the new password again"
			id="cp"
		/>
		<button disabled={loading || !op || !np || !cp} class="button" type="submit"
			>Save</button
		>
	</form>
	<form on:submit|preventDefault={logout}>
		<h3>Logout of your account</h3>
		<button type="submit" class="button !mt-0 !bg-red-500">Logout</button>
	</form>
{/if}

<style lang="postcss">
form {
	@apply mx-4 my-6 max-w-screen-md rounded border border-gray-500 px-5 py-3 md:mx-auto;
	h3 {
		@apply my-4 text-xl font-semibold;
	}
	.button {
		@apply mt-4;
	}
	.button:disabled {
		@apply cursor-not-allowed bg-gray-400;
	}
}
</style>
