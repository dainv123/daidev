export const LangSkillsRoute = ({ app, authJWT }) => {
	app.get('/lang-skills', authJWT, (req, res) => {
		res.send('successfully');
	});
}