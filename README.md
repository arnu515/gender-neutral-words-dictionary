# Genderneutral Words

An application to give you words that are gender-neutral when you type a gender-specific word.

For example, it gives you the word `Home maker` when you enter the word `House wife`.

## Features

- User suggestions
- Word queue
- Upvote / Downvote system
- Reports (with Discord webhook)
- Realtime votes

## Local development

### Prerequesites

- [Appwrite](https://appwrite.io) server hosted and running
- A Discord Webhook URL (optional) for reports
- [GitHub OAuth App](https://github.com/settings/developers/new) for GitHub OAuth
- [Discord OAuth App](https://discordapp.com/developers/applications) for Discord OAuth

### Configure appwrite

- Create a project with the ID `gnwd` in your appwrite console.
- Use the Appwrite CLI to deploy the collection and functions using `appwrite deploy function` and `appwrite deploy collection`.
- The Appwrite CLI is a dev-dependency, so you can do `yarn install` and access the appwrite CLI using `npx`.
- There is an `.env.example` file in every function folder. Make sure to create the required environment variables in the functions in the Appwrite console.
- For the `APPWRITE_API_KEY` variable, you need to create an API key with all scopes and give it to the function.
- Finally, configure GitHub and Discord OAuth in the Users settings. This is optional, but supported.

### Configure frontend

- Copy the `.env.example` file to `.env` and fill out the variables.
- Run `yarn dev` to start the server.
- It will be accessible at <http://localhost:3000>
