<script lang="ts">
import Navbar from '$components/Navbar.svelte'
import { loadUser } from '$lib/user.store'
import Auth from '$pages/Auth.svelte'
import Index from '$pages/Index.svelte'
import Profile from '$pages/Profile.svelte'
import Protect from '$components/Protect.svelte'
import { onMount } from 'svelte'
import { Router, Route } from 'svelte-navigator'
import New from '$pages/New.svelte'
import Word from '$pages/Word.svelte'

let loading = true

onMount(async () => {
	await loadUser()
	loading = false
})
</script>

{#if !loading}
	<Router>
		<Navbar />
		<Route path="/">
			<Index />
		</Route>
		<Route path="/auth">
			<Protect noredirect>
				<Profile />
				<div slot="fallback"><Auth /></div>
			</Protect>
		</Route>
		<Route path="/profile">
			<Protect noredirect>
				<Profile />
				<div slot="fallback"><Auth /></div>
			</Protect>
		</Route>
		<Route path="/new">
			<Protect>
				<New />
			</Protect>
		</Route>
		<Route path="/word">
			<Word />
		</Route>
	</Router>
{/if}
