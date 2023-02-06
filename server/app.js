import express from 'express';
import { WebSocketServer } from 'ws';
import router from './routes/routes.js';

const PORT = process.env.PORT || 5000;
const app = express();

const wss = new WebSocketServer({ noServer: true });
wss.on('connection', (ws) => {
	ws.on('message', (data) => console.log('recieved: %s', data));
	ws.send('test');
});

app.set('port', PORT);
app.use(router);
const server = app.listen(PORT, console.log(`http://localhost:${PORT}`));
server.on('upgrade', (req, socket, head) => {
	wss.handleUpgrade(req, socket, head, (socket) => {
		wss.emit('connection', socket, req);
	});
});
