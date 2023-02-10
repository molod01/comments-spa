import React, { useState } from 'react';
import { isValidFile } from '../modules/file.js';

function CommentForm({ reply, send }) {
	const [username, setUsername] = useState('nikita');
	const [email, setEmail] = useState('me@gmail.com');
	const [homepage, setHomepage] = useState('http://why?');
	const [comment_text, setText] = useState('text');
	const [file, setFile] = useState(undefined);

	const clearForm = () => {
		// setUsername('');
		// setEmail('');
		// setHomepage('http://why?');
		// setText('');
		// setFile(undefined);
		reply.setReplyTo(undefined);
	};
	const handleSubmit = async (event) => {
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
				reader.readAsText(file);
				reader.onloadend = () => {
					send('postComment', comment);
				};
			}
		} else send('postComment', comment);
		event.preventDefault();
		clearForm();
	};

	return (
		<div className="my-4">
			<h4 className="my-5">Comment</h4>
			<form onSubmit={handleSubmit} className="px-5">
				<div className="">
					<div className="row my-2">
						<div className="col">
							<label htmlFor="username" className="form-label">
								Username
							</label>
							<input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
						</div>
						<div className="col">
							<label htmlFor="email" className="form-label">
								E-mail
							</label>
							<input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
						</div>
					</div>
					<div className="my-2">
						<label htmlFor="homepage" className="form-label">
							Home page
						</label>
						<input type="url" className="form-control" id="homepage" value={homepage} onChange={(e) => setHomepage(e.target.value)} />
					</div>
					<div className="my-2">
						<label htmlFor="text" className="form-label">
							Comment text
						</label>
						<textarea type="text" className="form-control" id="text" value={comment_text} onChange={(e) => setText(e.target.value)} required></textarea>
					</div>
					<div className="my-3">
						<label htmlFor="file" className="form-label">
							Attach file
						</label>
						<input type="file" className="form-control" id="file" onClick={(e) => (e.target.value = null)} onChange={(e) => setFile(e.target.files[0])} />
					</div>
				</div>
				<div className="my-3 text-center">*captcha*</div>
				<button type="submit" className="btn btn-outline-dark w-100">
					Comment
				</button>
			</form>
		</div>
	);
}

export default CommentForm;
