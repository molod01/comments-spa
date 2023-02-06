import React from 'react';

class CommentForm extends React.Component {
	render() {
		return (
			<div className="my-4">
				<h4 className="my-5">Comment</h4>
				<form action="/" encType="multipart/form-data" method="post" className="px-5">
					<div className="">
						<div className="row my-2">
							<div className="col">
								<label htmlFor="username" className="form-label">
									Username
								</label>
								<input type="text" className="form-control" id="username" name="username" required />
							</div>
							<div className="col">
								<label htmlFor="email" className="form-label">
									E-mail
								</label>
								<input type="email" className="form-control" id="email" name="email" required />
							</div>
						</div>
						<div className="my-2">
							<label htmlFor="homepage" className="form-label">
								Home page
							</label>
							<input type="url" className="form-control" id="homepage" name="homepage" />
						</div>
						<div className="my-2">
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
					<div className="my-3 text-center">*captcha*</div>
					<button type="submit" className="btn btn-outline-dark w-100">
						Comment
					</button>
				</form>
			</div>
		);
	}
}

export default CommentForm;
