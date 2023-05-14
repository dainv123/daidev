import mongoose from 'mongoose'
import { MongoClient } from 'mongodb'
import { DB_CONFIG } from '../constants'

let db = null

export async function ConnectMongoose() {
	return mongoose.createConnection('mongodb://127.0.0.1:27017/test');
}

export async function ConnectDB() {
	if (db) return db;

	const client = await MongoClient.connect(DB_CONFIG.URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	db = client.db()

	return db
}

ConnectDB();