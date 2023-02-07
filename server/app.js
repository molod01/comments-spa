import bodyParser from 'body-parser';
import express from 'express';
import { WebSocketServer } from 'ws';
import db from './db/database.js';
import router from './routes/routes.js';
const PORT = process.env.PORT || 5000;
const app = express();

const wss = new WebSocketServer({ noServer: true });
wss.on('connection', (ws) => {
	ws.on('message', (data) => console.log('recieved: %s', data));
	ws.send('test');
});

app.set('port', PORT);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', router);

// app.use('*', (req, res) => {
// 	res.status(404).json({ message: 'Page not found' });
// });

const server = app.listen(PORT, console.log(`http://localhost:${PORT}`));
server.on('upgrade', (req, socket, head) => {
	wss.handleUpgrade(req, socket, head, (socket) => {
		wss.emit('connection', socket, req);
	});
});

server.on('close', () => {
	db.close();
});
