import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import CommentController from './controllers/comment.controller.js';
import db from './db/database.js';

// import router from './routes/routes.js';

const PORT = process.env.PORT || 5000;
const app = express();

// const __dirname = path.resolve();
const server = http.createServer(app);
app.set('port', PORT);

// app.use(express.static(path.resolve(__dirname, 'files')));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(router);

const wss = new WebSocketServer({ server });
const newComment = async (comment) => {
	await CommentController.create(comment);
};
const sendFirstPart = async () => {};
const updateComments = async () => {
	CommentController.readAll().then((comments) => {
		console.log(JSON.stringify(comments, null, 4));
		const generalComments = comments.filter((comment) => comment.replyTo == null);
		//console.log(JSON.stringify(generalComments, null, 4));
		wss.clients.forEach((client) => {
			client.send(JSON.stringify(generalComments));
		});
	});
};
const dispatchMessage = async (message, ws) => {
	const json = JSON.parse(message);
	switch (json.event) {
		case 'postComment':
			await newComment(json.payload);
			await updateComments();
	}
};
wss.on('connection', async (ws) => {
	ws.send(JSON.stringify(await CommentController.readAll()));
	ws.on('message', (m) => {
		dispatchMessage(m, ws);
	});
	ws.on('error', (e) => ws.send(e));
	ws.on('close', () => console.log('close'));
});

server.listen(PORT, () => {
	db.sequelize.sync({ force: false });
	console.log(`http://localhost:${PORT}`);
});
