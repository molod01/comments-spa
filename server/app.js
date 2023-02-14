import * as dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import https from 'https';
import { WebSocketServer } from 'ws';
import db from './db/database.js';
import { messageProcessing, sendPart } from './middleware/webSocketServer.js';

dotenv.config();

const PORT = process.env.NODE_DOCKER_PORT || 6868;

const app = express();

const key = fs.readFileSync('./config/key.pem');
const cert = fs.readFileSync('./config/cert.pem');

const server = https.createServer({ key, cert }, app);

const wss = new WebSocketServer({ server });

wss.on('connection', async (ws) => {
	await sendPart(ws, 0);
	ws.on('message', (m) => {
		messageProcessing(m, wss, ws);
	});
	ws.on('error', (e) => ws.send(e));
	ws.on('close', () => console.log('close'));
});

server.listen(PORT, async () => {
	await db.sequelize.sync({ force: false });
	console.log(`Server run on port: ${PORT}`);
});