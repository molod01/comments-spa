const allowedMIME = ['text/plain', 'image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

export const isValidFileType = (file) => file && allowedMIME.includes(file.type);

export const isValidFileSize = (file) => {
	if (!file) return false;
	if (isTextFile(file)) {
		return file.size <= 100000;
	} else return file.size < 8388608;
};

export const isValidFileTextSize = (file) => file && file.size <= 100000;

export const isValidFileImageSize = (file) => file && file.size < 8388608;

export const isTextFile = (file) => file && file.type === 'text/plain';
