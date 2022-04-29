const sdk = require('node-appwrite')

module.exports = async function (req, res) {
	const client = new sdk.Client()
	const { wordId } = JSON.parse(req.payload)
	const db = new sdk.Database(client)
	if (!wordId) throw new Error('wordId is required')

	if (!req.env['APPWRITE_FUNCTION_ENDPOINT'] || !req.env['APPWRITE_FUNCTION_API_KEY']) {
		throw new Error(
			'Environment variables are not set. Function cannot use Appwrite SDK.'
		)
	} else {
		client
			.setEndpoint(req.env['APPWRITE_FUNCTION_ENDPOINT'])
			.setProject(req.env['APPWRITE_FUNCTION_PROJECT_ID'])
			.setKey(req.env['APPWRITE_FUNCTION_API_KEY'])
			.setSelfSigned(true)
	}

	const word = await db.getDocument('queue', wordId)

	const approvedWord = await db.createDocument('words', 'unique()', {
		words: word.words,
		word: word.word,
		userId: word.userId
	})

	await db.deleteDocument('queue', wordId)

	res.json({ approvedWord })
}
