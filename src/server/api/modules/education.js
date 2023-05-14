export const EducationRoute = ({ app, authJWT }) => {
	app.get('/education', authJWT, (req, res) => {
		res.send('successfully');
	});
}