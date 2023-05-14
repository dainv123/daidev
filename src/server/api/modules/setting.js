export const SettingRoute = ({ app, authJWT }) => {
	app.get('/setting', authJWT, (req, res) => {
		res.send('successfully');
	});
}