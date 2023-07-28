import { connectManualDB } from './connect-db'
import { DefaultState } from './default-state'

async function initializeDB() {
	let db = await connectManualDB();

	for (let collectionName in DefaultState) {
		let collection = db.collection(collectionName)

		await collection.insertMany(DefaultState[collectionName])
	}

	console.log("INITIALIZE HAVE DONE");
}

initializeDB();