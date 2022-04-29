<script lang="ts">
import { useNavigate } from 'svelte-navigator'
import { createEventDispatcher } from 'svelte'

const goto = useNavigate()
const d = createEventDispatcher()

export let word: string
export let words: string[]
export let points: number
export let userHasVoted: 'no' | 'positive' | 'negative'

function copyWord() {
	try {
		navigator.clipboard.writeText(word)
	} catch {
		// use old method
		const textarea = document.createElement('textarea')
		textarea.value = word
		document.body.appendChild(textarea)
		textarea.select()
		document.execCommand('copy')
		document.body.removeChild(textarea)
	}
	alert('Word copied: ' + word)
}
</script>

<div
	class="mx-4 my-4 max-w-screen-md rounded border border-gray-500 px-4 py-2 transition-colors md:mx-auto"
>
	<h3
		class="my-4 cursor-pointer text-xl font-semibold"
		title="Click to copy"
		on:click={copyWord}
	>
		{word}
	</h3>
	<p class="mt-4 mb-2 uppercase text-gray-500">Replaces:</p>
	<ul class="mb-4 flex flex-wrap items-center gap-2">
		{#each words as word}
			<li
				class="cursor-pointer rounded-xl border border-gray-300 px-3 py-1 text-gray-800 transition-colors duration-500 hover:border-gray-500 hover:bg-gray-200"
				role="link"
				on:click={() => goto('/word?q=' + word)}
			>
				{word}
			</li>
		{/each}
	</ul>
	<footer>
		<div class="vote">
			<button
				class={userHasVoted === 'positive'
					? 'bg-orange-500 text-white border-transparent hover:bg-orange-600'
					: 'text-gray-500 hover:text-orange-300 border-gray-300 hover:bg-gray-200'}
				on:click={() => d('vote', 'positive')}
				style="border-top-right-radius: 0; border-bottom-right-radius: 0"
				title="Upvote"
				aria-label="Upvote"
			>
				<svg
					width="24"
					height="24"
					stroke-width="1.5"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M12.25 18.5V6M12.25 6L18.25 12M12.25 6L6.25 12"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>
			<span style="margin-left: -1px">{points}</span>
			<button
				class={userHasVoted === 'negative'
					? 'bg-blue-500 text-white border-transparent hover:bg-blue-600'
					: 'text-gray-500 hover:text-blue-300 border-gray-300 hover:bg-gray-200'}
				on:click={() => d('vote', 'negative')}
				style="border-top-left-radius: 0; border-bottom-left-radius: 0; margin-left: -1px"
				title="Downvote"
				aria-label="Downvote"
			>
				<svg
					width="24"
					height="24"
					stroke-width="1.5"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M12.25 5.5V18M12.25 18L6.25 12M12.25 18L18.25 12"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>
		</div>
		<button
			class="report"
			on:click={() => {
				const message = window.prompt('Reason for report:') || ''
				if (!message.trim()) return window.alert('Please enter a reason')
				if (
					!window.confirm(
						'Are you sure you want to report this word?\nMessage:' + message
					)
				)
					return
				d('report', message)
			}}>Report</button
		>
	</footer>
</div>

<style lang="postcss">
footer {
	@apply flex items-center justify-between;
	.vote {
		@apply flex items-center;
		button {
			@apply rounded-full border px-2 py-1 transition-colors duration-500;
		}
		span {
			@apply border border-gray-300 px-3 py-1;
		}
	}
	.report {
		@apply rounded border border-gray-300 px-2 py-1 text-sm transition-colors duration-500 hover:bg-gray-200;
	}
}
</style>
