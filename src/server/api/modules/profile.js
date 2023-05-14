export const ProfileRoute = ({ app, authJWT }) => {
	app.get('/profile', authJWT, (req, res) => {
		res.send('successfully');
	});
}