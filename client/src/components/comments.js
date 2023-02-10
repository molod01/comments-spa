import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

function Comments({ reply, response, pageCount }) {
	const [comments, setComments] = useState(response);

	useEffect(() => {
		if (response != '{}') setComments(JSON.parse(response));
	}, [response]);

	const handlePageClick = (e) => {
		console.log(e);
	};

	const renderComments = (comments, isChild) => {
		if (comments) {
			return comments.map((comment) => {
				const childRender = renderComments(comment.replies, true);
				return (
					<>
						<div className={'d-flex flex-row p-3 mb-2 mx-1 rounded-1 ' + (isChild ? 'reply-comment' : 'general-comment')}>
							<div className="w-100">
								<div className="d-flex justify-content-between align-items-center">
									<div className="d-flex flex-row align-items-center">
										<span className="me-2">{comment.user.username}</span>
										<small className="mail px-2 mx-2 rounded-3 bg-primary text-white">{comment.user.email}</small>
									</div>
									<small>{comment.createdAt}</small>
								</div>
								<div className="text-break">
									<p className="text-justify mb-0 mt-2" style={{ fontSize: '10pt', fontFamily: 'sans-serif' }}>
										{comment.text}
									</p>
								</div>
								<div className="d-flex flex-row mt-2">
									<span
										onClick={(e) => {
											reply(e.currentTarget.id);
											console.log(e.currentTarget.id);
										}}
										className="reply"
										id={comment.id}
									>
										Reply<i className="fa fa-comment ms-2"></i>
									</span>
								</div>
							</div>
						</div>
						<div className="ms-5">{childRender}</div>
					</>
				);
			});
		}
	};
	return (
		<div className="mt-2">
			{renderComments(comments)}
			<ReactPaginate
				breakLabel="..."
				nextLabel=">"
				onPageChange={handlePageClick}
				pageRangeDisplayed={5}
				pageCount={pageCount}
				previousLabel="<"
				renderOnZeroPageCount={null}
				pageClassName={'page-item'}
				pageLinkClassName={'page-link'}
				nextClassName={'page-item'}
				previousLinkClassName={'page-link'}
				previousClassName={'page-item'}
				nextLinkClassName={'page-link'}
				containerClassName={'pagination mx-2 justify-content-center'}
			/>
		</div>
	);
}

/* <div className="d-flex flex-row p-3 mb-2 mx-1 rounded-1 general-comment">
				<div className="w-100" id="comment1">
					<div className="d-flex justify-content-between align-items-center">
						<div className="d-flex flex-row align-items-center">
							<span className="me-2">Username</span>
							<small className="mail px-2 mx-2 rounded-3 bg-primary text-white">example@mail.com</small>
						</div>
						<small>Date</small>
					</div>

					<p className="text-justify small mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>

					<div className="d-flex flex-row mt-2">
						<span onClick={reply} className="reply" id="comment1">
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

					<p className="text-justify small mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>

					<div className="d-flex flex-row mt-2">
						<span onClick={reply} className="reply" id="comment2">
							Reply<i aria-hidden="true" className="fa fa-comment ms-2"></i>
						</span>
					</div>
				</div>
			</div>

			<div className="d-flex flex-row p-3 mb-2 mx-1 rounded-1 general-comment">
				<div className="w-100" id="comment3">
					<div className="d-flex justify-content-between align-items-center">
						<div className="d-flex flex-row align-items-center">
							<span className="me-2">Username</span>
							<small className="mail px-2 mx-2 rounded-3 bg-primary text-white">example@mail.com</small>
						</div>
						<small>Date</small>
					</div>

					<p className="text-justify small mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>

					<div className="d-flex flex-row mt-2">
						<span onClick={reply} className="reply" id="comment3">
							Reply<i className="fa fa-comment ms-2"></i>
						</span>
					</div>
				</div>
			</div> */

export default Comments;
