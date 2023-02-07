import db from '../db/database.js';
import CommentModel from '../models/Comment.js';

const Comment = CommentModel(db);

export const readAll = async (req, res, next) => {
	await Comment.findAll()
		.then((Comments) => {
			req.Comments = Comments;
			next();
		})
		.catch((err) => {
			console.log(`Comments's get error: ${err}`);
			return res.sendStatus(500);
		});
};

export const create = async (req, res, next) => {
	console.log(req.body);
	await Comment.create(req.body)
		.then(() => next())
		.catch((err) => {
			console.log(`Comment create error: ${err}`);
			return res.sendStatus(500);
		});
};

export const readById = async (req, res, next) => {
	const id = req.params.id;
	await Comment.findByPk(id)
		.then((result) => {
			req.auto = result;
			next();
		})
		.catch((err) => {
			console.log(`Comment get error: ${err}`);
			return res.sendStatus(500);
		});
};

export const deleteById = async (req, res, next) => {
	const id = req.params.id;
	await Comment.destroy({
		where: {
			id: id,
		},
	})
		.then(next())
		.catch((err) => {
			console.log(`Comment delete error: ${err}`);
			return res.sendStatus(500);
		});
};

export const getCount = async (req, res, next) => {
	await Comment.count()
		.then(next())
		.catch((err) => {
			console.log(`Comment get count error: ${err}`);
			return res.sendStatus(500);
		});
};
