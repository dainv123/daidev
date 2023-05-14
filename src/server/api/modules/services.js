export const ServicesRoute = ({ app, authJWT }) => {
	app.get('/services', authJWT, (req, res) => {
		res.send('successfully');
	});
}