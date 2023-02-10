const allowedMIME = ['text/plain', 'image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

export const isValidFile = (file) => {
	if (allowedMIME.includes(file.type)) {
		if (file.type === 'text/plain' && file.size > 100000) {
			console.log('.txt file is too big (max 100kb)');
			return;
		} else if (file.size > 4194304) {
			console.log('image is too big (max 4mb)');
			return;
		}
	} else console.log('file type is not allowed');
};


