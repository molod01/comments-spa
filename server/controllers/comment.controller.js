import * as dotenv from 'dotenv';
import db from '../db/database.js';
import { formatDate, generateFileName, getImageAsDataURL, isImage, readText, resizeImage, saveFile } from '../middleware/operations.js';

dotenv.config();

const User = db.users;
const Comment = db.comments;

export const readAll = async (where) => {
	return await Comment.findAll({ order: [['createdAt', 'DESC']], include: [{ all: true, nested: true, include: [{ all: true, nested: true, include: [{ all: true, nested: true }] }] }] })
		.then((comments) => comments)
		.catch((err) => console.log(`Comments's get error: ${err}`));
};

export const create = async (payload) => {
	const [user, created] = await User.findOrCreate({
		where: { ...payload.user },
	});
	console.log(payload);
	let comment = {
		text: payload.comment_text,
		homepage: payload.homepage,
		UserId: user.id,
		replyTo: payload.reply_to,
	};
	if (payload.file) {
		let saved_file_link = await saveFile(generateFileName(payload.file.name), payload.file.body);
		if (payload.file.type !== 'text/plain') {
			saved_file_link = await resizeImage(saved_file_link);
		}
		console.log(saved_file_link);
		comment.file_link = saved_file_link;
	}
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
		const commentsOnPage = parseInt(process.env.COMMENTS_ON_PAGE);
		if (comments) {
			const pagesCount = Math.ceil(comments.length / commentsOnPage);
			const startIndex = partIndex * commentsOnPage;
			let endIndex = startIndex + commentsOnPage;
			if (endIndex > comments.length) endIndex = comments.length;

			let comments_transformed = [];
			for (const comment of comments) {
				comment.dataValues.date = formatDate(comment.createdAt.toLocaleString());
				if (comment.file_link) {
					if (isImage(comment.file_link)) {
						comment.dataValues.image_data = getImageAsDataURL(comment.file_link);
					} else {
						comment.dataValues.text_data = readText(comment.file_link);
					}
				}
				comments_transformed.push(comment);
			}
			// console.log('pagesCount: ', pagesCount);
			// console.log('startIndex: ', startIndex);
			// console.log('endIndex: ', endIndex);
			// console.log('total: ', comments.length);
			return [comments_transformed.slice(startIndex, endIndex), pagesCount];
		}
	});
};

export default { create, readAll, readById, deleteById, getCount, getPart, getMainComments };
