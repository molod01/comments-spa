import fs from 'fs';
import { where } from 'sequelize';
import db from '../db/database.js';

const User = db.users;
const Comment = db.comments;

const saveFile = (name, data) => {
	fs.writeFile('files/' + name, data, (err) => {
		if (err) {
			return console.log(err);
		}
		console.log('The file was saved!');
	});
};

export const readAll = async () => {
	// return await Comment.findAll({ include: ['user', 'replies'] })
	return await Comment.findAll({ include: [{ all: true, nested: true, include: [{ all: true, nested: true, include: [{ all: true, nested: true }] }] }] })
		.then((comments) => comments)
		.catch((err) => {
			console.log(`Comments's get error: ${err}`);
		});
};

export const create = async (payload) => {
	const [user, created] = await User.findOrCreate({
		where: { ...payload.user },
	});

	let comment = {
		text: payload.comment_text,
		homepage: payload.homepage,
		UserId: user.id,
		replyTo: payload.reply_to,
	};
	if (payload.file) {
		saveFile(payload.file.name, payload.file.body);
		comment.file_link = payload.file.name;
	}
	// console.log('New Comment: ', comment);
	await Comment.create(comment).catch((err) => {
		console.log(`Comment create error: ${err}`);
	});
};

export const readById = async (id) => {
	return Comment.findByPk(id)
		.then((result) => result)
		.catch((err) => {
			console.log(`Comment get error: ${err}`);
		});
};

export const deleteById = async (id) => {
	await Comment.destroy({
		where: {
			id: id,
		},
	}).catch((err) => {
		console.log(`Comment delete error: ${err}`);
	});
};

export const getCount = async () => {
	return Comment.count().catch((err) => {
		console.log(`Comment get count error: ${err}`);
	});
};

export default { create, readAll, readById, deleteById, getCount };
