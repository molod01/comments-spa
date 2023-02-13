import { validateCaptcha } from 'react-simple-captcha';
import { isTextFile, isValidFileImageSize, isValidFileTextSize, isValidFileType } from './file.js';

export const validationMessages = {
	username: 'Username must be 4-20 characters long',
	email: 'Email is not valid',
	homepage: 'Url is not valid',
	comment_text: {
		length: 'Comment must be 5 - 512 characters long',
		xhtml: 'Not valid XHTML',
	},
	captcha: 'Captcha validation error',
	file: {
		text: {
			file_is_too_big: '.txt file is too big (max 100kb)',
		},
		image: {
			file_is_too_big: 'Image is too big (max 8mb)',
		},
		not_allowed_type: 'File type is not allowed',
	},
};
export const validations = {
	username: /^(?=[a-zA-Z0-9._]{4,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
	email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
	homepage: /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi,
	comment_text: {
		length: /^.{5,512}$/,
		xhtml:
			/^(?:<([i|code|strong|a]+)(?:(?:\s+\w+(?:\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)>[^<>]*<\/\1+\s*>|<[i|code|strong|a]+(?:(?:\s+\w+(?:\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)\/>|<!--.*?-->|[^<>]+)*$/,
	},
	captcha: validateCaptcha,
	file: {
		type: isValidFileType,
		text: {
			size: isValidFileTextSize,
		},
		image: {
			size: isValidFileImageSize,
		},
	},
};
export const validateForm = ({ username, email, homepage, comment_text, captcha, file }, setValidationMessages) => {
	let validationLabels = {};
	const [isValidUsername, isValidEmail, isValidUrl, isValidCommentLength, isValidCommentXHTML, isValidCaptcha, isValidFileType, isValidFileTextSize, isValidFileImageSize] = [
		validations.username.test(username),
		validations.email.test(email),
		validations.homepage.test(homepage),
		validations.comment_text.length.test(comment_text),
		validations.comment_text.xhtml.test(comment_text),
		validations.captcha(captcha),
		validations.file.type(file),
		validations.file.text.size(file),
		validations.file.image.size(file),
	];
	console.log(isValidUsername, isValidEmail, isValidCommentLength, isValidCommentXHTML, isValidCaptcha);
	console.log(validationLabels);
	if (!isValidUsername) validationLabels.username = validationMessages.username;
	if (!isValidEmail) validationLabels.email = validationMessages.email;
	if (homepage && !isValidUrl) validationLabels.homepage = validationMessages.homepage;
	if (!isValidCommentLength) validationLabels.comment_text = validationMessages.comment_text.length;
	if (!isValidCommentXHTML) validationLabels.comment_text = validationMessages.comment_text.xhtml;
	if (!isValidCaptcha) validationLabels.captcha = validationMessages.captcha;
	if (file) {
		if (!isValidFileType) validationLabels.file = validationMessages.file.not_allowed_type;
		if (isTextFile(file) && !isValidFileTextSize) validationLabels.file = validationMessages.file.text.file_is_too_big;
		else if (!isValidFileImageSize) validationLabels.file = validationMessages.file.image.file_is_too_big;
	}
	setValidationMessages(validationLabels);
	return JSON.stringify(validationLabels) === '{}';
};
