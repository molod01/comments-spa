import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import CommentController from './controllers/comment.controller.js';
import db from './db/database.js';

const PORT = process.env.PORT || 5000;
const app = express();

const server = http.createServer(app);
app.set('port', PORT);

const wss = new WebSocketServer({ server });

const newComment = async (comment) => {
	await CommentController.create(comment);
};
const sendPart = async (client, partIndex) => {
	if (!partIndex) partIndex = 0;
	client.curentPart = partIndex;
	const [part, pagesCount] = await CommentController.getPart(partIndex);
	client.send(JSON.stringify({ data: part, pagesCount }));
};
const updateClients = async () => {
	wss.clients.forEach(async (client) => {
		await sendPart(client, client.curentPart);
	});
};
const dispatchMessage = async (message, ws) => {
	const json = JSON.parse(message);
	switch (json.event) {
		case 'postComment':
			await newComment(json.payload);
			await updateClients();
		case 'getPart':
			await sendPart(ws, json.payload);
	}
};
// const updateComments = async () => {
// 	CommentController.getMainComments().then((mainComments) => {
// 		wss.clients.forEach((client) => {
// 			client.send(JSON.stringify(mainComments));
// 		});
// 	});
// 	// CommentController.readAll().then((comments) => {
// 	// 	console.log(JSON.stringify(comments, null, 4));
// 	// 	const generalComments = comments.filter((comment) => comment.replyTo == null);
// 	// 	//console.log(JSON.stringify(generalComments, null, 4));
// 	// 	wss.clients.forEach((client) => {
// 	// 		client.send(JSON.stringify(generalComments));
// 	// 	});
// 	// });
// };

wss.on('connection', async (ws) => {
	await sendPart(ws, 0);
	ws.on('message', (m) => {
		dispatchMessage(m, ws);
	});
	ws.on('error', (e) => ws.send(e));
	ws.on('close', () => console.log('close'));
});

server.listen(PORT, () => {
	db.sequelize.sync({ force: false});
	console.log(`http://localhost:${PORT}`);
});
