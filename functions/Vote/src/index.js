const sdk = require('node-appwrite')

module.exports = async function (req, res) {
	const client = new sdk.Client()
	const userClient = new sdk.Client()
	const body = JSON.parse(req.payload)

	// You can remove services you don't use
	let account = new sdk.Account(userClient)
	let database = new sdk.Database(client)

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
		userClient
			.setEndpoint(req.env['APPWRITE_FUNCTION_ENDPOINT'])
			.setProject(req.env['APPWRITE_FUNCTION_PROJECT_ID'])
			.setJWT(req.env['APPWRITE_FUNCTION_JWT'])
			.setSelfSigned(true)
	}

	try {
		if (typeof body.wordId !== 'string') throw new Error('wordId is required')
		if (typeof body.vote !== 'string') throw new Error('vote is required')
		if (!['negative', 'positive', 'no'].includes(body.vote))
			throw new Error('vote must be one of negative, positive, no. ')
		const user = await account.get()
		const word = await database.getDocument('words', body.wordId)

		let vote = (
			await database.listDocuments('votes', [sdk.Query.equal('wordId', word.$id)])
		).documents
		if (vote.length > 0) {
			// delete vote
			for (let v of vote) {
				if (v.userId === user.$id) await database.deleteDocument('votes', v.$id)
			}
		}

		if (body.vote === 'no') {
			res.json({ vote: null })
			return
		}

		vote = await database.createDocument('votes', 'unique()', {
			wordId: word.$id,
			userId: user.$id,
			type: body.vote
		})

		res.json({
			vote
		})
	} catch (e) {
		res.json({
			error: e.message
		})
	}
}
