export const PortfolioRoute = ({ app, authJWT }) => {
	app.get('/portfolio', authJWT, (req, res) => {
		res.send('successfully');
	});
}