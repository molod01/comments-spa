import { randomUUID } from 'crypto';
import fs from 'fs';
import sharp from 'sharp';

export const generateFileName = (name) => {
	return 'files/' + randomUUID() + name.slice(name.lastIndexOf('.'));
};

export const resizeImage = (path) => {
	const newName = generateFileName(path);
	sharp(path)
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
