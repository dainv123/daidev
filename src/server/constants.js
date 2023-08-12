export const KEYS = {
	ACCESS_TOKEN_SECRET: 'ACCESS_TOKEN_SECRET',
	REFRESH_TOKEN_SECRET: 'REFRESH_TOKEN_SECRET'
};

export const DB_CONFIG = {
	PORT: '2040',
	DOMAIN: 'http://localhost:2040',
	URL: 'mongodb://127.0.0.1:27017/daidev',
	FILE_BUCKET: "file",
	FILE_IMAGE_ACCEPTED: ["image/png", "image/jpeg"]
};

export const API_CONFIG = {
	TOKEN_TIME_EXPIRES: '1d'
}

export const MESSAGES = {
	FAILED_CREATE_ACHIEVEMENT: "Failed to create achievement",
	FAILED_UPDATE_ACHIEVEMENT: "Failed to update achievement",
	FAILED_CREATE_EDUCATION: "Failed to create education",
	FAILED_CREATE_EDUCATION: "Failed to create education",
	FAILED_NO_UPLOAD_FILE: "You must select a file",
	FAILED_UPLOAD_FILE: "Error when trying upload image",
	FAILED_NOT_FOUND_FILE: "Not found file",
	FAILED_CANNOT_DOWNLOAD_FILE: "Cannot download the Image!"

}

export const PORTFOLIO_TYPE_ENUM = {
	WEBSITE: 0,
	MOBILE: 1
}