import React, { useEffect, useState } from 'react';
import { LoadCanvasTemplate, loadCaptchaEnginge, validateCaptcha } from 'react-simple-captcha';
import { isValidFile } from '../modules/file.js';
function CommentForm({ reply, send, changePage }) {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [homepage, setHomepage] = useState('http://*');
	const [comment_text, setText] = useState('');
	const [file, setFile] = useState(undefined);
	const [captcha, setCaptcha] = useState('');

	useEffect(() => {
		loadCaptchaEnginge(6, '#f3f6f4', 'black', 'upper');
	}, []);

	const validateForm = () => {
		const isValidCaptcha = true; //validateCaptcha(captcha);
		const isValidUsername = /^(?=[a-zA-Z0-9._]{4,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/.test(username);
		const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
		const isValidComment =
			/^(?:<(\w+)(?:(?:\s+\w+(?:\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)>[^<>]*<\/\1+\s*>|<\w+(?:(?:\s+\w+(?:\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)\/>|<!--.*?-->|[^<>]+)*$/.test(
				comment_text
			);
		if (isValidCaptcha && isValidUsername && isValidEmail && isValidComment) return true;
		else return false;
	};
	const clearForm = () => {
		setUsername('user');
		setEmail('mail@mail.com');
		setHomepage('http://*');
		setText('');
		setFile(undefined);
		reply.setReplyTo(undefined);
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!validateForm()) {
			alert('Form is not valid!');
			return;
		}
		const comment = {
			user: {
				username,
				email,
			},
			homepage,
			comment_text,
			reply_to: reply.replyTo,
		};
		if (file) {
			if (isValidFile(file)) {
				var reader = new FileReader();
				reader.onload = ((file) => {
					return (e) => {
						var r = e.target;
						comment.file = {
							name: file.name,
							type: file.type,
							size: file.size,
							body: r.result,
						};
					};
				})(file);
				reader.readAsBinaryString(file);
				reader.onloadend = () => send('postComment', comment);
			}
		} else await send('postComment', comment);
		//clearForm();
	};

	return (
		<div className="my-4">
			<h4 className="my-5 mx-2">Comment</h4>
			<form onSubmit={handleSubmit}>
				<div className="">
					<div className="row my-2">
						<div className="col">
							<input type="text" className="form-control" id="username" placeholder="Username" aria-label="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
						</div>
						<div className="col">
							<input type="email" className="form-control" id="email" placeholder="E-Mail" aria-label="E-Mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
						</div>
					</div>
					<div className="row my-2">
						<div className="col">
							<input type="url" className="form-control" id="homepage" placeholder="http://" aria-label="http://" value={homepage} onChange={(e) => setHomepage(e.target.value)} />
						</div>
					</div>
					<div className="my-2">
						<textarea
							type="text"
							className="form-control"
							id="text"
							placeholder="Your comment..."
							aria-label="Your comment..."
							value={comment_text}
							onChange={(e) => setText(e.target.value)}
							required
						></textarea>
					</div>
					<div className="row d-flex mb-2" style={{ lineHeight: '1' }}>
						<div className="col mt-1 d-flex justify-content-center">
							<LoadCanvasTemplate className="" reloadText={' '} />
						</div>
						<div className="col mt-1">
							<input type="text" className="form-control" id="captcha" value={captcha} onChange={(e) => setCaptcha(e.target.value)} required />
						</div>
						<div className="col-6 mt-1">
							<input type="file" className="form-control" id="file" placeholder="File" aria-label="File" onChange={(e) => setFile(e.target.files[0])} />
						</div>
					</div>
					<button type="submit" className="btn btn-outline-dark w-100">
						Comment
					</button>
				</div>
			</form>
		</div>
	);
}

export default CommentForm;
