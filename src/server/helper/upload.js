import { DB_CONFIG } from '../constants'

const util = require("util")

const multer = require("multer")

const { GridFsStorage } = require("multer-gridfs-storage")

const storage = new GridFsStorage({
	url: DB_CONFIG.URL,
	options: {
		useNewUrlParser: true,
		useUnifiedTopology: true
	},
	file: (req, file) => {
		const match = DB_CONFIG.FILE_IMAGE_ACCEPTED;

		if (match.indexOf(file.mimetype) === -1) {
			return `${Date.now()}-${file.originalname}`;
		}

		return {
			bucketName: DB_CONFIG.FILE_BUCKET,
			filename: `${Date.now()}-${file.originalname}`
		};
	}
});

const uploadFile = multer({ storage: storage }).single("file");

const uploadFiles = multer({ storage: storage }).array('file', 10);

export const uploadFileMiddleware = util.promisify(uploadFile);

export const uploadFilesMiddleware = util.promisify(uploadFiles);