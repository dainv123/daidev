export const SocialsRoute = ({ app, authJWT }) => {
	app.get('/socials', authJWT, (req, res) => {
		res.send('successfully');
	});
}