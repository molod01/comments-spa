import React from 'react';

class CommentForm extends React.Component {
	render() {
		return (
			<form action="/" encType="multipart/form-data" method="post" className="mx-auto mb-5 mt-3">
				<h4 className="text-center">Leave a comment</h4>
				<div className="">
					<div className="my-3">
						<label htmlFor="username" className="form-label">
							Username
						</label>
						<input type="text" className="form-control" id="username" name="username" required />
					</div>
					<div className="my-3">
						<label htmlFor="email" className="form-label">
							E-mail
						</label>
						<input type="email" className="form-control" id="email" name="email" required />
					</div>
					<div className="my-3">
						<label htmlFor="homepage" className="form-label">
							Home page
						</label>
						<input type="url" className="form-control" id="homepage" name="homepage" />
					</div>
					<div className="my-3">
						<label htmlFor="captcha" className="form-label">
							CAPTCHA
						</label>
						<input type="text" className="form-control" id="captcha" name="captcha" required />
					</div>
					<div className="my-3">
						<label htmlFor="text" className="form-label">
							Comment text
						</label>
						<textarea type="text" className="form-control" id="text" name="text" required></textarea>
					</div>

					<div className="my-3">
						<label htmlFor="file" className="form-label">
							Attach file
						</label>
						<input type="file" className="form-control" id="file" name="file" />
					</div>
				</div>
				<button type="submit" className="btn btn-outline-dark w-100">
					Sumbit
				</button>
			</form>
		);
	}
}

export default CommentForm;
