import cors from 'cors'
import path from 'path';
import express from 'express'
import bodyParser from 'body-parser'
import { AuthRoute } from './api/authentication'
import { DB_CONFIG, KEYS } from './constants'
import { AuthenticateJWT as authJWT } from './helper/authenticate-jwt'
import { AchievementRoute } from './api/modules/achievement';
import { EducationRoute } from './api/modules/education';
import { JobRoleRoute } from './api/modules/job-role';
import { LangSkillRoute } from './api/modules/lang-skill';
import { PortfolioRoute } from './api/modules/portfolio';
import { ProfileRoute } from './api/modules/profile';
import { ServiceRoute } from './api/modules/service';
import { SettingRoute } from './api/modules/setting';
import { SocialRoute } from './api/modules/social';
import { WorkSkillRoute } from './api/modules/work-skill';
import { WorkHistoryRoute } from './api/modules/work-history';
import { FileRoute, DownloadFileAuthRoute, DownloadFileIncognitoRoute } from './api/modules/file';

const app = express()
const port = process.env.PORT || DB_CONFIG.PORT;
const accessTokenSecret = KEYS.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = KEYS.REFRESH_TOKEN_SECRET;

app.listen(
	port,
	console.log(`SERVER LISTENING ON PORT: ${port}`)
)

app.use(
	cors(),
	bodyParser.urlencoded({ extended: true }),
	bodyParser.json()
)

AuthRoute({
	app,
	authJWT,
	accessTokenSecret,
	refreshTokenSecret
});

AchievementRoute({
	app,
	authJWT
});

EducationRoute({
	app,
	authJWT
});

JobRoleRoute({
	app,
	authJWT
});

LangSkillRoute({
	app,
	authJWT
});

PortfolioRoute({
	app,
	authJWT
});

ProfileRoute({
	app,
	authJWT
});

ServiceRoute({
	app,
	authJWT
});

SettingRoute({
	app,
	authJWT
});

SocialRoute({
	app,
	authJWT
});

FileRoute({
	app,
	authJWT
})

DownloadFileAuthRoute({
	app,
	authJWT
})

DownloadFileIncognitoRoute({
	app,
	authJWT
})

WorkHistoryRoute({
	app,
	authJWT
});

WorkSkillRoute({
	app,
	authJWT
});

if (process.env.NODE_ENV == `production`) {
	app.use(express.static(path.resolve(__dirname, '../../dist')));
	app.get('/*', (req, res) => {
		res.sendFile(path.resolve('index.html'));
	});
}
