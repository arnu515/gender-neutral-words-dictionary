<nav>
	<a href="/" class="brand">GenderNeutral Words</a>
	<ul>
		<li>
			<a
				href="https://github.com/arnu515/gender-neutral-words-dictionary"
				title="GitHub"
				aria-label="GitHub"
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
						d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M14.3333 19V17.137C14.3583 16.8275 14.3154 16.5163 14.2073 16.2242C14.0993 15.9321 13.9286 15.6657 13.7067 15.4428C15.8 15.2156 18 14.4431 18 10.8989C17.9998 9.99256 17.6418 9.12101 17 8.46461C17.3039 7.67171 17.2824 6.79528 16.94 6.01739C16.94 6.01739 16.1533 5.7902 14.3333 6.97811C12.8053 6.57488 11.1947 6.57488 9.66666 6.97811C7.84666 5.7902 7.05999 6.01739 7.05999 6.01739C6.71757 6.79528 6.69609 7.67171 6.99999 8.46461C6.35341 9.12588 5.99501 10.0053 5.99999 10.9183C5.99999 14.4366 8.19999 15.2091 10.2933 15.4622C10.074 15.6829 9.90483 15.9461 9.79686 16.2347C9.68889 16.5232 9.64453 16.8306 9.66666 17.137V19"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M9.66667 17.7018C7.66667 18.3335 6 17.7018 5 15.7544"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</a>
		</li>
		<li>
			<a href="/new" title="Add a word" aria-label="Add a word">
				<svg
					width="24"
					height="24"
					stroke-width="1.5"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M13.0207 5.82839L15.8491 2.99996L20.7988 7.94971L17.9704 10.7781M13.0207 5.82839L3.41405 15.435C3.22652 15.6225 3.12116 15.8769 3.12116 16.1421V20.6776H7.65669C7.92191 20.6776 8.17626 20.5723 8.3638 20.3847L17.9704 10.7781M13.0207 5.82839L17.9704 10.7781"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</a>
		</li>
		<li>
			<a
				class="!bg-blue-500 !text-white"
				href="/auth"
				title="Authenticate"
				aria-label="Authenticate"
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
						d="M7 18V17C7 14.2386 9.23858 12 12 12V12C14.7614 12 17 14.2386 17 17V18"
						stroke="currentColor"
						stroke-linecap="round"
					/>
					<path
						d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" />
				</svg>
			</a>
		</li>
	</ul>
</nav>

<style lang="postcss">
nav {
	@apply mx-4 mt-4 flex max-w-screen-md items-center justify-between rounded-xl border border-gray-400 px-4 py-2 md:mx-auto;
}

a.brand {
	@apply text-xl font-bold;
	letter-spacing: 0.1ch;
}

ul {
	@apply flex items-center gap-2;
	li {
		a {
			@apply block rounded-full bg-white p-2 text-black transition-all duration-500 hover:brightness-90;
		}
	}
}
</style>
