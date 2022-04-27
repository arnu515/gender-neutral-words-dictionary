<script lang="ts">
import Navbar from '$lib/Navbar.svelte'
import Index from '$pages/Index.svelte'
import { Router, Route } from 'svelte-navigator'
</script>

<Router>
	<Navbar />
	<Route path="/">
		<Index />
	</Route>
</Router>
