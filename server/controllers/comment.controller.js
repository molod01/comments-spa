import { randomUUID } from 'crypto';
import fs from 'fs';
import db from '../db/database.js';

const User = db.users;
const Comment = db.comments;
const commentsOnPage = 5;

const saveFile = (name, data) => {
	const filename = randomUUID() + name.slice(-name.lastIndexOf('.'));
	fs.writeFile('files/' + filename, data, (err) => {
		if (err) {
			return console.log(err);
		}
		console.log('The file was saved!');
	});
	return filename;
};

export const readAll = async (where) => {
	// return await Comment.findAll({ include: ['user', 'replies'] })
	return await Comment.findAll({ order: [['createdAt', 'DESC']], include: [{ all: true, nested: true, include: [{ all: true, nested: true, include: [{ all: true, nested: true }] }] }] })
		.then((comments) => comments)
		.catch((err) => console.log(`Comments's get error: ${err}`));
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
		comment.file_link = saveFile(payload.file.name, payload.file.body);
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
	return await Comment.count().catch((err) => {
		console.log(`Comment get count error: ${err}`);
	});
};

export const getMainComments = async () => {
	return await Comment.findAll({
		where: { replyTo: null },
		order: [['createdAt', 'DESC']],
		include: [{ all: true, nested: true, include: [{ all: true, nested: true, include: [{ all: true, nested: true }] }] }],
	});
};

export const getPart = async (partIndex) => {
	return getMainComments().then((comments) => {
		if (comments) {
			const pagesCount = comments.length / commentsOnPage;
			const startIndex = partIndex * pagesCount;
			return [comments.slice(startIndex, startIndex + commentsOnPage), Math.round(pagesCount) + 1];
		}
	});
};

export default { create, readAll, readById, deleteById, getCount, getPart, getMainComments };
