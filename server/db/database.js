import SequelizeBase from 'sequelize';
import SequelizeHierarchy from 'sequelize-hierarchy-next';
import dbConfig from '../config/db.config.js';
import CommentModel from '../models/Comment.js';
import UserModel from '../models/User.js';

const Sequelize = SequelizeHierarchy(SequelizeBase);
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect,
	pool: dbConfig.pool,
});

var db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = UserModel(sequelize);
db.comments = CommentModel(sequelize);

//associations;
db.users.hasMany(db.comments, { as: 'comments' });
db.comments.belongsTo(db.users, {
	foreignKey: 'UserId',
	as: 'user',
});
//db.comments.hasMany(db.comments, { foreignKey: 'replyTo', as: 'replies' });

export default db;
