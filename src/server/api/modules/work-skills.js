export const WorkSkillsRoute = ({ app, authJWT }) => {
	app.get('/work-skills', authJWT, (req, res) => {
		res.send('successfully');
	});
}