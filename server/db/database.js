import { DataTypes, Model, Sequelize } from 'sequelize';
import CommentModel from '../models/Comment.js';
import UserModel from '../models/User.js';
import dbConfig from '../config/db.config.js';

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect,
	pool: dbConfig.pool,
});

sequelize
	.authenticate()
	.then(() => console.log('Connection has been established successfully.'))
	.then(() => {
		const User = UserModel(sequelize);
		const Comment = CommentModel(sequelize);
		User.hasMany(Comment);
		Comment.belongsTo(User);
		Comment.hasMany(Comment);
		sequelize.sync({ force: true });
	})
	.catch((err) => console.error('Unable to connect to the database:', err));

export default sequelize;
