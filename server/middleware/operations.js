import { randomUUID } from 'crypto';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

export const generateFileName = (name) => {
	return 'files/' + randomUUID() + name.slice(name.lastIndexOf('.'));
};

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

export const formatDate = (date) => {
	return date.replace('T', ' ').slice(0, -6);
};

export const isImage = (filename) => {
	const allowedExtensions = ['.jpeg', '.jpg', '.png', '.gif'];
	if (allowedExtensions.includes(path.extname(filename))) return true;
};

export const getImageAsDataURL = (filename) => {
	const imageData = fs.readFileSync(filename, 'base64');
	const extension = path.extname(filename).slice(1);
	return `data:image/${extension};base64,${imageData}`;
};

export const readText = (filename) => {
	return fs.readFileSync(filename, 'utf-8');
};
