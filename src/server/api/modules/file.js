const express = require("express")

const GridFSBucket = require("mongodb").GridFSBucket

const { uploadFileMiddleware, uploadFilesMiddleware } = require("../../helper/upload")

import { DB_CONFIG } from "../../constants"

import { MESSAGES } from '../../constants'

import { connectManualDB } from "../../helper/connect-db"

const fileRouter = express.Router()

const fileAuthRouter = express.Router()

const fileIncognitoRouter = express.Router()

const baseAuthUrl = DB_CONFIG.DOMAIN + "/file-auth/"

const baseIncognitoUrl = DB_CONFIG.DOMAIN + "/file-incognito/"

const ObjectId = require('mongodb').ObjectID

fileRouter.post("/upload", async (req, res) => {
	try {
		await uploadFileMiddleware(req, res)

		if (req.file == undefined) {
			return res.status(500).json({ error: MESSAGES.FAILED_NO_UPLOAD_FILE })
		}

		res.status(200).json({ id: req.file.id })
	} catch (error) {
		res.status(500).json({ error: MESSAGES.FAILED_UPLOAD_FILE })
	}
})

fileRouter.post('/delete', async (req, res) => {
    try {
		const database = await connectManualDB()

		const bucket = new GridFSBucket(database, {
			bucketName: DB_CONFIG.FILE_BUCKET
		});

		(req.body.ids || []).forEach(async id => {
			await bucket.delete(new ObjectId(id))
		});

        res.status(200).json()
    } catch (error) {
        res.status(500).json({ error: MESSAGES.FAILED_UPDATE_PORTFOLIO })
    }
})

export const getImagesInformation = async (ids) => {
	const database = await connectManualDB()

	const images = database.collection(DB_CONFIG.FILE_BUCKET + ".files")

	const list = ids || []

	const cursor = list.length
		? images.find({ _id: { $in: list.map(id => new ObjectId(id)) }})
		: images.find({})

	const fileInfos = []

	await cursor.forEach((doc, index) => {
		fileInfos.push({
			id: doc._id,
			url: baseIncognitoUrl + doc.filename,
			name: doc.filename,
			type: doc.contentType
		})
	})

	return fileInfos
}

fileRouter.post("/get", async (req, res) => {
	try {
		const fileInfos = await getImagesInformation(req.body.ids)
		
		if (fileInfos.length === 0) {
			return res.status(500).json({ error: MESSAGES.FAILED_NOT_FOUND_FILE })
		}

		res.status(200).json(fileInfos)
	} catch (error) {
		res.status(500).json({ error: MESSAGES.FAILED_GET_FILE })
	}
})

fileAuthRouter.get("/:name", async (req, res) => {
	try {
		const database = await connectManualDB()

		const bucket = new GridFSBucket(database, {
			bucketName: DB_CONFIG.FILE_BUCKET
		})

		const downloadStream = bucket.openDownloadStreamByName(req.params.name)

		downloadStream.on("data", function (data) {
			return res.status(200).write(data)
		})

		downloadStream.on("error", function (err) {
			return res.status(500).json({ error: MESSAGES.FAILED_CANNOT_DOWNLOAD_FILE })
		})

		downloadStream.on("end", () => {
			return res.end()
		})
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})

fileIncognitoRouter.get("/:name", async (req, res) => {
	try {
		const database = await connectManualDB()

		const bucket = new GridFSBucket(database, {
			bucketName: DB_CONFIG.FILE_BUCKET,
		})

		const downloadStream = bucket.openDownloadStreamByName(req.params.name)

		downloadStream.on("data", function (data) {
			return res.status(200).write(data)
		})

		downloadStream.on("error", function (err) {
			return res.status(500).json({ error: MESSAGES.FAILED_CANNOT_DOWNLOAD_FILE })
		})

		downloadStream.on("end", () => {
			return res.end()
		})
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})

export const FileRoute = ({ app, authJWT }) => {
	app.use('/file', authJWT, fileRouter)
}

export const DownloadFileAuthRoute = ({ app, authJWT }) => {
	app.use('/file-auth', authJWT, fileAuthRouter)
}

export const DownloadFileIncognitoRoute = ({ app }) => {
	app.use('/file-incognito', fileIncognitoRouter)
}