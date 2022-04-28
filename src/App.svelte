<script lang="ts">
import Navbar from '$lib/Navbar.svelte'
import Auth from '$pages/Auth.svelte'
import Index from '$pages/Index.svelte'
import { Router, Route } from 'svelte-navigator'
</script>

<Router>
	<Navbar />
	<Route path="/">
		<Index />
	</Route>
	<Route path="/auth">
		<Auth />
	</Route>
</Router>
