import md5 from 'md5'
import jwt from 'jsonwebtoken'
import uuid from 'uuid'
import { API_CONFIG } from '../constants'
import { ConnectDB } from '../helper/connect-db'
import { AuthenticateJWT } from '../helper/authenticate-jwt'

const authTokens = []
const refreshTokens = []

async function assembleUser(user) {
	const db = await ConnectDB()

	const tasks = await db.collection('tasks').find({
		owner: user.id
	}).toArray()

	const groups = await db.collection('groups').find({
		owner: user.id
	}).toArray()

	const comments = await db.collection(`comments`).find({
		task: {
			$in: tasks.map(task => task.id)
		}
	}).toArray();

	return {
		users: [user],
		comments,
		tasks,
		groups,
		session: {
			authenticated: 'AUTHENTICATED',
			id: user.id
		}
	}
}

export const AuthenRoute = ({ app, accessTokenSecret, refreshTokenSecret }) => {
	/**
	 * auth
	 */
	app.get('/auth', AuthenticateJWT, async (req, res) => {
		const user = req.user;
		const token = uuid()
		const state = await assembleUser(user)

		authTokens.push({
			token,
			userID: user.id
		})

		res.json({
			responseCode: 200,
			token,
			state
		})
	})


	/**
	 * LOGIN: /login?username=test&password=****
	 */
	app.post('/login', async (req, res) => {
		try {
			const { username, password } = req.body

			const db = await ConnectDB()

			const collection = db.collection('users')

			const user = await collection.findOne({ name: username })

			if (!user) {
				return res.json({
					responseCode: 404,
					errors: ["User not found"]
				})
			}

			if (user.passwordHash !== md5(password)) {
				return res.json({
					responseCode: 403,
					errors: ["Password incorrect"]
				})
			}

			const accessToken = jwt.sign(user, accessTokenSecret, { expiresIn: API_CONFIG.TOKEN_TIME_EXPIRES })
			const refreshToken = jwt.sign(user, refreshTokenSecret)

			refreshTokens.push(refreshToken);

			res.json({
				responseCode: 200,
				accessToken,
				refreshToken
			})
		} catch (error) {
			console.log(error)
			return res.json({
				responseCode: 500,
				errors: ["Server internal error"]
			})
		}
	})


	/**
	 * LOGOUT: /logout?refreshToken=xxxyyyzzz
	 */
	app.get('/logout', (req, res) => {
		const authHeader = req.headers.authorization;

		if (authHeader) {
			refreshTokens = refreshTokens.filter(token => token !== authHeader.split(' ')[1]);
			res.send("Logout successful");
		}

		return res.json({
			responseCode: 500
		})
	})


	/**
	 * VERIFY TOKEN
	 */
	// app.get('/auth', AuthenticateJWT, async (req, res) => {
	//   const user = req.user;
	//   const token = uuid()
	//   const state = await assembleUser(user)

	//   authTokens.push({
	//     token,
	//     userID: user.id
	//   })

	//   res.json({
	//     responseCode: 200,
	//     token,
	//     state
	//   })
	// })
}