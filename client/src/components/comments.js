import React from 'react';

class Comments extends React.Component {
	render() {
		return (
			<div className="mt-2">
				<div className="d-flex flex-row p-3 mb-2 mx-1 rounded-1 general-comment">
					<div className="w-100">
						<div className="d-flex justify-content-between align-items-center">
							<div className="d-flex flex-row align-items-center">
								<span className="me-2">Username</span>
								<small className="mail px-2 mx-2 rounded-3 bg-primary text-white">example@mail.com</small>
							</div>
							<small>Date</small>
						</div>

						<p className="text-justify small mb-0">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
						</p>

						<div className="d-flex flex-row mt-2">
							<span onClick={() => console.log('reply')} className="reply">
								Reply<i className="fa fa-comment ms-2"></i>
							</span>
						</div>
					</div>
				</div>
				<div className="d-flex flex-row p-3 mb-2 mx-1 rounded-1 ms-5 reply-comment">
					<div className="w-100">
						<div className="d-flex justify-content-between align-items-center">
							<div className="d-flex flex-row align-items-center">
								<span className="me-2">Username</span>
								<small className="mail px-2 mx-2 rounded-3 bg-primary text-white">example@mail.com</small>
							</div>
							<small>Date</small>
						</div>

						<p className="text-justify small mb-0">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
						</p>

						<div className="d-flex flex-row mt-2">
							<span onClick={() => console.log('reply')} className="reply">
								Reply<i aria-hidden="true" className="fa fa-comment ms-2"></i>
							</span>
						</div>
					</div>
				</div>

				<div className="d-flex flex-row p-3 mb-2 mx-1 rounded-1 general-comment">
					<div className="w-100">
						<div className="d-flex justify-content-between align-items-center">
							<div className="d-flex flex-row align-items-center">
								<span className="me-2">Username</span>
								<small className="mail px-2 mx-2 rounded-3 bg-primary text-white">example@mail.com</small>
							</div>
							<small>Date</small>
						</div>

						<p className="text-justify small mb-0">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
						</p>

						<div className="d-flex flex-row mt-2">
							<span onClick={() => console.log('reply')} className="reply">
								Reply<i className="fa fa-comment ms-2"></i>
							</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Comments;
