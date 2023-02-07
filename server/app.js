import express from 'express';
import { DataTypes, Model, Sequelize } from 'sequelize';
import { WebSocketServer } from 'ws';
import dbConfig from './config/db.config.js';
import CommentModel from './models/Comment.js';
import UserModel from './models/User.js';
import router from './routes/routes.js';
const PORT = process.env.PORT || 5000;
const app = express();

const wss = new WebSocketServer({ noServer: true });
wss.on('connection', (ws) => {
	ws.on('message', (data) => console.log('recieved: %s', data));
	ws.send('test');
});

app.set('port', PORT);
app.use('/api', router);
app.use('*', (req, res) => {
	res.status(404).json({ message: 'Page not found' });
});

const server = app.listen(PORT, console.log(`http://localhost:${PORT}`));
server.on('upgrade', (req, socket, head) => {
	wss.handleUpgrade(req, socket, head, (socket) => {
		wss.emit('connection', socket, req);
	});
});

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect,
	pool: dbConfig.pool,
});

sequelize
	.authenticate()
	.then(() => console.log('Connection has been established successfully.'))
	.then(() => {
		// const User = UserModel(sequelize);
		// const Comment = CommentModel(sequelize);
		// User.hasMany(Comment);
		// Comment.belongsTo(User);
		// Comment.hasMany(Comment);
		sequelize.sync();
	})
	.catch((err) => console.error('Unable to connect to the database:', error));
