const express = require('express');
const app = express();
const port = 3000;
const gitHubController = require('./controllers/github.controller')();
const headersMiddleware = require('./middlewares/headers.middleware');

app.use('/github', headersMiddleware(), gitHubController);

app.get('*', function (req, res) {
	res.status(404).end();
});

app.listen(port, () => console.log(`API listening on port ${port}!`));