export const WorkHistoryRoute = ({ app, authJWT }) => {
	app.get('/work-history', authJWT, (req, res) => {
		res.send('successfully');
	});
}