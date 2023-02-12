import React, { useEffect, useState } from 'react';
import { LoadCanvasTemplate, loadCaptchaEnginge, validateCaptcha } from 'react-simple-captcha';
import { isValidFile } from '../modules/file.js';

function CommentForm({ reply, send, changePage }) {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [homepage, setHomepage] = useState('http://website.com');
	const [comment_text, setText] = useState('');
	const [file, setFile] = useState(undefined);
	const [captcha, setCaptcha] = useState('');
	const [reply_to, setReplyTo] = useState(reply.replyTo);
	const [replyBlock, setReplyBlock] = useState(reply.replyBlock);
	
	// useEffect(() => {
	// 	if (reply_to) {
	// 		let reply_to_mark = document.getElementById('reply_to');
	// 		const replied_comment = document.getElementById('comment_' + reply_to_mark.getAttribute('reply_to'));
	// 		let reply_copy = replied_comment.cloneNode(true);
	// 		//reply_copy.removeChild();

	// 		reply_to_mark.append(reply_copy);
	// 	}
	// }, [reply_to]);

	useEffect(() => {
		setReplyTo(reply.replyTo);
		setReplyBlock(reply.replyBlock);
	}, [reply]);

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
	const reply_mark = () => {
		if (replyBlock) {
			return (
				<>
					<div className="my-3">
						<h5 className="mx-2">Reply to</h5>
						{replyBlock}
					</div>
				</>
			);
		}
	};
	const clearForm = () => {
		setUsername('user');
		setEmail('mail@mail.com');
		setHomepage('http://website.com');
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
			reply_to: reply_to,
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
			{reply_mark()}
			<form onSubmit={handleSubmit}>
				<div>
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
					<div className="row d-flex mb-2">
						<div className="col mt-1 d-flex justify-content-center pt-2">
							<LoadCanvasTemplate className="" reloadText={' '} />
						</div>
						<div className="col mt-1">
							<input type="text" className="form-control" id="captcha" value={captcha} onChange={(e) => setCaptcha(e.target.value)} required />
						</div>
					</div>
					<div className="mt-2 mb-3">
						<input type="file" className="form-control" id="file" placeholder="File" aria-label="File" onChange={(e) => setFile(e.target.files[0])} />
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
