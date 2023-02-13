import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import CommentController, { create, readAll } from './controllers/comment.controller.js';
import db from './db/database.js';

const PORT = process.env.PORT || 5000;
const app = express();

const server = http.createServer(app);
app.set('port', PORT);

const wss = new WebSocketServer({ server });

const newComment = async (comment) => {
	await CommentController.create(comment);
};

const sendPart = async (client, partIndex, sortBy) => {
	if (!partIndex) partIndex = 0;
	client.curentPart = partIndex;
	client.currentSort = sortBy;
	const [part, pagesCount] = await CommentController.getPart(partIndex, sortBy);
	client.send(JSON.stringify({ data: part, pagesCount }));
};

const updateClients = async () => {
	wss.clients.forEach(async (client) => {
		await sendPart(client, client.curentPart, client.currentSort);
	});
};

const dispatchMessage = async (message, ws) => {
	const json = JSON.parse(message);
	switch (json.event) {
		case 'postComment':
			await newComment(json.payload);
			await updateClients();
		case 'getPart':
			await sendPart(ws, json.payload.part, json.payload.sortBy);
	}
};

wss.on('connection', async (ws) => {
	await sendPart(ws, 0);
	ws.on('message', (m) => {
		dispatchMessage(m, ws);
	});
	ws.on('error', (e) => ws.send(e));
	ws.on('close', () => console.log('close'));
});

server.listen(PORT, async () => {
	await db.sequelize.sync({ force: false });
	// const comment = {
	// 	comment_text: 'eergregerg',
	// 	file_link: null,
	// 	homepage: '',
	// 	parentId: null,
	// 	user: {
	// 		username: 'SSSS',
	// 		email: 'EMAIL',
	// 	},
	// };
	// await create(comment);
	// console.log(await readAll());
	console.log(`http://localhost:${PORT}`);
});
