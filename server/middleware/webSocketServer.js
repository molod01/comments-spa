import CommentController from '../controllers/comment.controller.js';
import { removeRedundant } from './operations.js';

export const newComment = async (comment) => {
	await CommentController.create(comment);
};

export const sendPart = async (client, partIndex, sortBy) => {
	try {
		if (!partIndex) partIndex = 0;
		client.curentPart = partIndex;
		client.currentSort = sortBy;
		const [part, pagesCount] = await CommentController.getPart(partIndex, sortBy);
		removeRedundant(part);
		client.send(JSON.stringify({ data: part, pagesCount }));
	} catch (err) {
		console.log(`sendPart Error: ${err}`);
	}
};

export const updateClients = async (wss) => {
	wss.clients.forEach(async (client) => {
		await sendPart(client, client.curentPart, client.currentSort);
	});
};

export const messageProcessing = async (message, wss, ws) => {
	try {
		const json = JSON.parse(message);
		switch (json.event) {
			case 'postComment':
				await newComment(json.payload);
				await updateClients(wss);
			case 'getPart':
				await sendPart(ws, json.payload.part, json.payload.sortBy);
		}
	} catch (err) {
		console.log(`messageProcessing Error: ${err}`);
	}
};
