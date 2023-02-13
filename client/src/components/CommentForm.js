import React, { useEffect, useState } from 'react';
import { LoadCanvasTemplate, loadCaptchaEnginge } from 'react-simple-captcha';
import { validateForm } from '../modules/validations.js';

function CommentForm({ reply, send, changePage }) {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [homepage, setHomepage] = useState(undefined);
	const [comment_text, setText] = useState('');
	const [file, setFile] = useState(undefined);
	const [captcha, setCaptcha] = useState('');
	const [reply_to, setReplyTo] = useState(reply.replyTo);
	const [replyBlock, setReplyBlock] = useState(reply.replyBlock);
	const [validationMessages, setValidationMessages] = useState({});

	useEffect(() => {
		setReplyTo(reply.replyTo);
		setReplyBlock(reply.replyBlock);
	}, [reply]);

	useEffect(() => {
		loadCaptchaEnginge(6, '#f3f6f4', 'black', 'upper');
	}, [validationMessages]);

	const formatDate = (date) => {
		return date.replace('T', ' ').slice(0, -5);
	};

	const validationError = (value) => {
		if (value)
			return (
				<small style={{ fontSize: 12 }} className="text-danger px-1 ">
					{value}
				</small>
			);
	};

	const commentPreview = () => {
		return (
			<div className="modal fade" id="preview" tabIndex="-1" aria-labelledby="previewLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h1 className="modal-title fs-5" id="previewLabel">
								Preview
							</h1>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div className="modal-body">
							<div className="d-flex flex-row p-3 mb-2 mx-1 rounded-2 general-comment mt-3">
								<div className="w-100">
									<div className="d-flex justify-content-between align-items-center">
										<div className="d-flex flex-row align-items-center">
											<span className="me-2">{username}</span>
											<small className="mail px-2 mt-1 mx-2 rounded-3 bg-primary text-white">{email}</small>
										</div>
										<small style={{ fontSize: 10 }}>{formatDate(new Date().toISOString())}</small>
									</div>
									<div className="text-break">
										<p className="text-justify mb-0 mt-2" style={{ fontSize: '11pt', fontFamily: 'sans-serif' }}>
											{comment_text}
										</p>
									</div>
									<div className="d-flex flex-row mt-2">
										<span className="reply">
											Reply<i className="fa fa-comment ms-2"></i>
										</span>
									</div>
								</div>
							</div>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	};

	const previewButton = () => {
		if (username && email && comment_text) {
			return (
				<button type="button" className="btn btn-sm btn-outline-secondary mt-3 w-100" data-bs-toggle="modal" data-bs-target="#preview">
					Preview
				</button>
			);
		}
	};

	const reply_block = () => {
		if (replyBlock && reply_to) {
			return (
				<div className="my-3">
					<h5 className="mx-2">Reply to</h5>
					{replyBlock}
				</div>
			);
		}
	};

	const clearForm = () => {
		setUsername('');
		setEmail('');
		setHomepage(undefined);
		setText('');
		setFile(undefined);
		
		setCaptcha('');
		reply.setReplyTo(undefined);
		setReplyBlock(undefined);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (
			!validateForm(
				{
					username,
					email,
					homepage,
					comment_text,
					captcha,
					file,
				},
				setValidationMessages
			)
		) {
			return;
		}
		const comment = {
			user: {
				username,
				email,
			},
			homepage,
			comment_text,
			replyToId: reply_to,
		};
		if (file) {
			var reader = new FileReader();
			reader.onload = ((file) => {
				return (e) => {
					comment.file = {
						name: file.name,
						type: file.type,
						body: e.target.result,
					};
				};
			})(file);
			reader.readAsBinaryString(file);
			reader.onloadend = () => send('postComment', comment);
		} else await send('postComment', comment);
		changePage(0);
		clearForm();
	};

	return (
		<>
			{commentPreview()}
			<div className="my-4">
				<h4 className="my-5 mx-2">Comment</h4>
				{reply_block()}
				<form onSubmit={handleSubmit}>
					<div>
						<div className="row my-2">
							<div className="col">{validationError(validationMessages?.username)}</div>
							<div className="col">{validationError(validationMessages?.email)}</div>
						</div>
						<div className="row my-2">
							<div className="col">
								<input type="text" className="form-control" id="username" placeholder="Username" aria-label="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
							</div>
							<div className="col">
								<input type="text" className="form-control" id="email" placeholder="E-Mail" aria-label="E-Mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
							</div>
						</div>
						<div className="row my-2">
							<div className="col">{validationError(validationMessages?.homepage)}</div>
						</div>
						<div className="row my-2">
							<div className="col">
								<input type="text" className="form-control" id="homepage" placeholder="http://" aria-label="http://" value={homepage} onChange={(e) => setHomepage(e.target.value)} />
							</div>
						</div>
						<div className="my-2 btn-group btn-group-sm w-100">
							<button onClick={() => setText(comment_text + '<i></i>')} className="btn btn-secondary mx-1 fw-bold">
								[i]
							</button>
							<button onClick={() => setText(comment_text + '<strong></strong>')} className="btn btn-secondary mx-1 fw-bold">
								[strong]
							</button>
							<button onClick={() => setText(comment_text + '<code></code>')} className="btn btn-secondary mx-1 fw-bold">
								[code]
							</button>
							<button onClick={() => setText(comment_text + '<a href="" title=""></a>')} className="btn btn-secondary mx-1 fw-bold">
								[a]
							</button>
						</div>
						<div className="my-2">{validationError(validationMessages?.comment_text)}</div>
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
						<div className="my-2 text-end">{validationError(validationMessages?.captcha)}</div>
						<div className="row d-flex mb-2">
							<div className="col mt-1 d-flex justify-content-center pt-2">
								<LoadCanvasTemplate reloadText={' '} />
							</div>

							<div className="col mt-1">
								<input
									type="text"
									className="form-control"
									id="captcha"
									placeholder="CAPTCHA"
									aria-label="CAPTCHA"
									style={{ textTransform: 'uppercase' }}
									value={captcha}
									onChange={(e) => setCaptcha(e.target.value.toUpperCase())}
									required
								/>
							</div>
						</div>
						<div className="mt-2 mb-3">{validationError(validationMessages?.file)}</div>
						<div className="mt-2 mb-3">
							<input type="file" className="form-control" id="file" placeholder="File" aria-label="File" onChange={(e) => setFile(e.target.files[0])} />
						</div>
						{previewButton()}
						<button type="submit" className="btn btn-outline-dark mt-3 w-100">
							Comment
						</button>
					</div>
				</form>
			</div>
		</>
	);
}

export default CommentForm;
