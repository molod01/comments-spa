import * as dotenv from 'dotenv';
import db from '../db/database.js';
import { generateFileName, resizeImage, saveFile, transformData } from '../middleware/operations.js';

dotenv.config();

const User = db.users;
const Comment = db.comments;

export const create = async (payload) => {
	const [user, created] = await User.findOrCreate({
		where: { ...payload.user },
	});
	let comment = {
		text: payload.comment_text,
		homepage: payload.homepage,
		UserId: user.id,
		replyToId: payload.replyToId,
	};
	if (payload.file) {
		let saved_file_link = await saveFile(generateFileName(payload.file.name), payload.file.body);
		if (payload.file.type !== 'text/plain') {
			saved_file_link = await resizeImage(saved_file_link);
		}
		comment.file_link = saved_file_link;
	}
	await Comment.create(comment).catch((err) => {
		console.log(`Comment create error: ${err}`);
	});
};

export const readAll = async (sortBy = 'createdAt_desc') => {
	const [by, dir] = sortBy.split('_');
	let order = [];
	if (by !== 'createdAt') {
		order.push({ model: User, as: 'user' });
	}
	order.push(by, dir);
	return await Comment.findAll({
		order: [order],
		hierarchy: true,
		include: [
			{ model: Comment, as: 'replies', nested: true },
			{ model: User, as: 'user', nested: true },
		],
	})
		.then((comments) => comments)
		.catch((err) => console.log(`Comments's get error: ${err}`));
};

export const readById = async (id) => {
	return Comment.findByPk(id)
		.then((result) => result)
		.catch((err) => {
			console.log(`Comment get error: ${err}`);
		});
};

export const updateById = async (id) => {
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

export const getPart = async (partIndex, sortBy = 'createdAt_desc') => {
	return readAll(sortBy).then((comments) => {
		const commentsOnPage = parseInt(process.env.COMMENTS_ON_PAGE) || 25;
		if (comments) {
			const pagesCount = Math.ceil(comments.length / commentsOnPage);
			const startIndex = partIndex * commentsOnPage;
			let endIndex = startIndex + commentsOnPage;
			if (endIndex > comments.length) endIndex = comments.length;
			const comments_transformed = transformData(comments);
			return [comments_transformed.slice(startIndex, endIndex), pagesCount];
		}
	});
};

export default { create, readAll, readById, deleteById, getCount, getPart };
