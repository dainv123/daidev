export const JobRolesRoute = ({ app, authJWT }) => {
	app.get('/job-roles', authJWT, (req, res) => {
		res.send('successfully');
	});
}