const sdk = require('node-appwrite')
const axios = require('axios')

/*
  'req' variable has:
    'headers' - object with request headers
    'payload' - object with request body data
    'env' - object with environment variables

  'res' variable has:
    'send(text, status)' - function to return text response. Status code defaults to 200
    'json(obj, status)' - function to return JSON response. Status code defaults to 200

  If an error is thrown, a response with code 500 will be returned.
*/

module.exports = async function (req, res) {
	const client = new sdk.Client()
	const body = JSON.parse(req.payload)
	const userClient = new sdk.Client()

	if (!req.env['APPWRITE_FUNCTION_ENDPOINT'] || !req.env['APPWRITE_FUNCTION_API_KEY']) {
		res.json({
			error:
				'Please add APPWRITE_FUNCTION_ENDPOINT and APPWRITE_FUNCTION_API_KEY environment variables.'
		})
		return
	} else {
		client
			.setEndpoint(req.env['APPWRITE_FUNCTION_ENDPOINT'])
			.setProject(req.env['APPWRITE_FUNCTION_PROJECT_ID'])
			.setKey(req.env['APPWRITE_FUNCTION_API_KEY'])
			.setSelfSigned(true)
		userClient
			.setEndpoint(req.env['APPWRITE_FUNCTION_ENDPOINT'])
			.setProject(req.env['APPWRITE_FUNCTION_PROJECT_ID'])
			.setJWT(req.env['APPWRITE_FUNCTION_JWT'])
	}

	const db = new sdk.Database(client)

	try {
		if (typeof body.word !== 'string' || !body.word.trim())
			throw new Error('Word is required')
		if (!Array.isArray(body.words) || body.words.some(i => typeof i !== 'string'))
			throw new Error('Words is required')

		const user = await new sdk.Account(userClient).get()

		const doc = await db.createDocument('queue', body.word.trim(), {
			words: body.words,
			userId: user.$id,
			createdAt: Date.now()
		})

		await axios.post(req.env['DISCORD_WEBHOOK_URL'], {
			content: `Someone just added a word to the word queue!\nThe word is: **${body.word.trim()}**\nTheir user id is: \`${
				user.$id
			}\``,
			username: 'Word Queue'
		})

		res.json({
			doc
		})
	} catch (e) {
		res.json({ error: e.message })
	}
}
