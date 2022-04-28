<h1
	class="my-4 text-center text-2xl font-bold sm:my-6 sm:text-3xl md:my-8 md:text-4xl lg:my-12 lg:text-5xl"
>
	Gender Neutral Words Dictionary
</h1>

<form class="my-4">
	<p class="my-8 text-center text-lg sm:text-xl lg:text-2xl">
		Enter a word to get a gender neutral alternative
	</p>
	<form action="/word" method="GET" class="my-4 flex items-center justify-center gap-2">
		<input
			type="text"
			placeholder="Enter a word here"
			class="rounded-xl border border-gray-400 bg-white px-3 py-1 text-center text-lg"
			aria-label="Word"
			name="q"
		/>
		<button
			type="submit"
			class="rounded-xl border border-transparent bg-blue-500 px-3 py-1 text-center text-lg text-white"
			>Search</button
		>
	</form>
</form>
