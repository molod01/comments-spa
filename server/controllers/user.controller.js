import db from '../db/database.js';
import UserModel from '../models/User.js';

const User = UserModel(db);

export const readAll = async (req, res, next) => {
	await User.findAll()
		.then((users) => {
			req.users = users;
			next();
		})
		.catch((err) => {
			console.log(`Users's get error: ${err}`);
			return res.sendStatus(500);
		});
};

export const create = async (req, res, next) => {
	console.log(req.body);
	await User.create(req.body)
		.then(() => next())
		.catch((err) => {
			console.log(`User create error: ${err}`);
			return res.sendStatus(500);
		});
};

export const readById = async (req, res, next) => {
	const id = req.params.id;
	await User.findByPk(id)
		.then((result) => {
			req.auto = result;
			next();
		})
		.catch((err) => {
			console.log(`User get error: ${err}`);
			return res.sendStatus(500);
		});
};

export const deleteById = async (req, res, next) => {
	const id = req.params.id;
	await User.destroy({
		where: {
			id: id,
		},
	})
		.then(next())
		.catch((err) => {
			console.log(`User delete error: ${err}`);
			return res.sendStatus(500);
		});
};

export const getCount = async (req, res, next) => {
	await User.count()
		.then(next())
		.catch((err) => {
			console.log(`User get count error: ${err}`);
			return res.sendStatus(500);
		});
};
