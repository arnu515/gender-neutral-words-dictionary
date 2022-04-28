<!--
  @component
  Protects the child route from being accessed by non-authenticated users.

  Use the named slot `fallback` to render a component when the user is not authenticated.
  
  @param {boolean} noredirect - If true, the user will not be redirected to the login page if they are not authenticated.
-->
<script lang="ts">
import { useNavigate } from 'svelte-navigator'
import user from '$lib/user.store'
import { onMount } from 'svelte'

export let noredirect = false
const goto = useNavigate()

onMount(() => {
	if (noredirect) return
	if (!$user) {
		goto('/auth')
	}
})
</script>

{#if $user}
	<slot />
{:else}
	<slot name="fallback"><h1>Not logged in.</h1></slot>
{/if}
