import cors from 'cors'
import path from 'path';
import express from 'express'
import bodyParser from 'body-parser'
import { AuthRoute } from './api/authentication'
import { DB_CONFIG, KEYS } from './constants'
import { AuthenticateJWT as authJWT } from './helper/authenticate-jwt'
import { AchievementsRoute } from './api/modules/achievements';
import { EducationRoute } from './api/modules/education';
import { JobRolesRoute } from './api/modules/job-roles';
import { LangSkillsRoute } from './api/modules/lang-skills';
import { PortfolioRoute } from './api/modules/portfolio';
import { ProfileRoute } from './api/modules/profile';
import { ServicesRoute } from './api/modules/services';
import { SettingRoute } from './api/modules/setting';
import { SocialsRoute } from './api/modules/socials';
import { WorkHistoryRoute } from './api/modules/work-history';
import { WorkSkillsRoute } from './api/modules/work-skills';

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

AchievementsRoute({
	app,
	authJWT
});

EducationRoute({
	app,
	authJWT
});

JobRolesRoute({
	app,
	authJWT
});

LangSkillsRoute({
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

ServicesRoute({
	app,
	authJWT
});

SettingRoute({
	app,
	authJWT
});

SocialsRoute({
	app,
	authJWT
});

WorkHistoryRoute({
	app,
	authJWT
});

WorkSkillsRoute({
	app,
	authJWT
});


if (process.env.NODE_ENV == `production`) {
	app.use(express.static(path.resolve(__dirname, '../../dist')));
	app.get('/*', (req, res) => {
		res.sendFile(path.resolve('index.html'));
	});
}
