<script lang="ts">
import Navbar from '$lib/Navbar.svelte'
import { loadUser } from '$lib/user.store'
import Auth from '$pages/Auth.svelte'
import Index from '$pages/Index.svelte'
import { onMount } from 'svelte'
import { Router, Route } from 'svelte-navigator'

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
			<Auth />
		</Route>
	</Router>
{/if}
