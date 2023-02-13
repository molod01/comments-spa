import { randomUUID } from 'crypto';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
const allowedExtensions = ['.jpeg', '.jpg', '.png', '.gif'];

export const generateFileName = (name) => 'files/' + randomUUID() + name.slice(name.lastIndexOf('.'));

export const formatDate = (date) => date.replace('T', ' ').slice(0, -6);

export const isImage = (filename) => allowedExtensions.includes(path.extname(filename));

export const isText = (filename) => allowedExtensions.includes(path.extname(filename));

export const resizeImage = async (path) => {
	const newName = generateFileName(path);
	return sharp(path)
		.resize(320, 240, { fit: 'inside', withoutEnlargement: true })
		.toFile(newName)
		.then(() => {
			fs.unlinkSync(path);
			return newName;
		})
		.catch(function (err) {
			console.log(err);
			console.log('Error occured');
		});
};

export const saveFile = async (path, data) => {
	fs.writeFileSync(path, data, { encoding: 'binary' }, (err) => {
		if (err) {
			return console.log(err);
		}
		console.log('The file was saved!');
	});
	return path;
};

export const getImageAsDataURL = (filename) => {
	const imageData = fs.readFileSync(filename, 'base64');
	const extension = path.extname(filename).slice(1);
	return `data:image/${extension};base64,${imageData}`;
};

export const readText = (filename) => {
	return fs.readFileSync(filename, 'utf-8');
};

export const transformData = (comments) => {
	let comments_transformed = [];
	for (const comment of comments) {
		comment.dataValues.date = formatDate(comment.createdAt.toLocaleString());
		if (comment.file_link) {
			if (isImage(comment.file_link)) {
				comment.dataValues.image_data = getImageAsDataURL(comment.file_link);
			} else if (isTextFile(comment.file_link)) {
				comment.dataValues.text_data = readText(comment.file_link);
			} else throw (err) => console.log(err);
		}
		if (comment.replies) {
			comment.dataValues.replies = transformData(comment.replies.filter((reply) => reply.user));
		}
		comments_transformed.push(comment);
	}
	return comments_transformed;
};
