<script lang="ts">
import appwrite from '$lib/appwrite'

let gnw = ''
let replacedWords: string[] = ['']
let loading = false
let hasSubmitted = false

async function submit() {
	if (loading) return
	loading = true
	try {
		if (!gnw.trim()) throw new Error('Please enter a word')
		// trim all items in array
		replacedWords = replacedWords.map(item => item.trim())
		// remove duplicates of array
		replacedWords = [...new Set(replacedWords)]
		if (replacedWords.some(item => !item)) throw new Error('Please fill out all words')
		if (replacedWords.includes(gnw))
			throw new Error('Replaced words should not contain gender neutral word')

		const { stderr, stdout } = await appwrite.functions.createExecution(
			'submit-word',
			JSON.stringify({ word: gnw.trim(), words: replacedWords }),
			false
		)
		if (stderr) throw new Error(stderr)
		const output = JSON.parse(stdout)
		if (output.error) throw new Error(output.error)
		hasSubmitted = true
	} catch (e) {
		alert(e.message)
	}
	loading = false
}
</script>

<h1
	class="m-4 text-center text-2xl font-bold sm:my-6 sm:text-3xl md:my-8 md:text-4xl lg:my-12 lg:text-5xl"
>
	Submit a new word
</h1>

{#if !hasSubmitted}
	<div class="m-4 mt-12">
		<form
			on:submit|preventDefault={submit}
			class="my-4 flex flex-col items-center justify-center gap-4 text-center text-lg"
		>
			<div>
				<label for="gn-word">Gender Neutral Word</label>
				<input
					type="text"
					required
					placeholder="Type a word"
					id="gn-word"
					bind:value={gnw}
				/>
			</div>
			<div>
				<label for="rep-word-list-0">Word it replaces</label>
				<div class="flex flex-col items-center justify-center gap-2">
					{#each replacedWords as word, index}
						<div class="flex items-center gap-2">
							<input
								type="text"
								placeholder="Type a word"
								required
								id="rep-word-list-{index}"
								bind:value={replacedWords[index]}
							/>
							{#if index === 0}
								<button
									type="button"
									class="button !bg-blue-500"
									title="Add"
									aria-label="Add"
									on:click={() => (replacedWords = [...replacedWords, ''])}
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
											d="M6 12H12M18 12H12M12 12V6M12 12V18"
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
									</svg>
								</button>
							{:else}
								<button
									type="button"
									class="button !bg-red-500"
									title="Remove"
									aria-label="Remove"
									on:click={() => {
										replacedWords.splice(index, 1)
										replacedWords = replacedWords
									}}
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
											d="M19 11V20.4C19 20.7314 18.7314 21 18.4 21H5.6C5.26863 21 5 20.7314 5 20.4V11"
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
										<path
											d="M10 17V11"
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
										<path
											d="M14 17V11"
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
										<path
											d="M21 7L16 7M3 7L8 7M8 7V3.6C8 3.26863 8.26863 3 8.6 3L15.4 3C15.7314 3 16 3.26863 16 3.6V7M8 7L16 7"
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
									</svg>
								</button>
							{/if}
						</div>
					{/each}
				</div>
			</div>
			<button disabled={loading} type="submit" class="button mt-6 w-[200px]"
				>Submit word</button
			>
			<p class="mt-4 text-center text-sm text-gray-500">Thanks for contributing ❤!</p>
		</form>
	</div>
{:else}
	<p class="text-center text-xl mt-4">
		Thanks for contributing to GNWD! Your word has been placed in a moderation queue and
		should be approved shortly.
	</p>
	<p class="text-center text-lg mt-4 text-gray-500">
		You may receive an email if there is a problem with your word.
	</p>
{/if}
