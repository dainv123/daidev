import mongoose from 'mongoose'
import { MongoClient } from 'mongodb'
import { DB_CONFIG } from '../constants'

let db = null

export async function connectMongooseDB() {
	try {
		await mongoose.connect(DB_CONFIG.URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('Connected to MongoDB');
	} catch (error) {
		console.error('Error connecting to MongoDB:', error.message);
		process.exit(1);
	}
};


export async function connectManualDB() {
	if (db) return db;

	const client = await MongoClient.connect(DB_CONFIG.URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	});

	db = client.db()

	console.log('CONNECT SUCCESSFULLY');

	return db
}

connectMongooseDB();

// connectManualDB();