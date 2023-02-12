import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
function Comments({ reply, response, send, currentPage }) {
	const [comments, setComments] = useState(JSON.parse(response)?.data);
	const [pagesCount, setPagesCount] = useState(JSON.parse(response)?.pagesCount);

	useEffect(() => {
		const object = JSON.parse(response);
		if (object) {
			if (object.data.length) setComments(object.data);
			setPagesCount(object.pagesCount);
		}
	}, [response]);

	useEffect(() => {}, [currentPage]);

	const handlePageClick = async (e) => {
		await send('getPart', e.selected);
		//window.scrollTo(0, 0);
	};
	const renderFile = (text_data) => {
		return (
			<div className="mt-2">
				<p className="text-danger" style={{ fontSize: 12 }}>
					Attached file
				</p>
				<div className="card">
					<p className="p-3" style={{ fontSize: 10 }}>
						{text_data}
					</p>
				</div>
			</div>
		);
	};
	const renderImage = (image_data, id) => {
		return (
			<div className="mt-2">
				<a data-lightbox={id} href={image_data}>
					<img src={image_data} alt="user attached pic" />
				</a>
			</div>
		);
	};

	const renderComments = (comments, isChild) => {
		if (comments) {
			return comments.map((comment) => {
				const childRender = renderComments(comment.replies, true);
				let attachRender;
				console.log(comment);
				if (comment.image_data) {
					attachRender = renderImage(comment.image_data, 'image_' + comment.id);
				} else if (comment.text_data) {
					attachRender = renderFile(comment.text_data);
				}
				return (
					<>
						<div className={'d-flex flex-row p-3 mb-2 mx-1 rounded-2 ' + (isChild ? 'reply-comment' : 'general-comment mt-3')}>
							<div className="w-100">
								<div className="d-flex justify-content-between align-items-center">
									<div className="d-flex flex-row align-items-center">
										<span className="me-2">{comment.user.username}</span>
										<small className="mail px-2 mt-1 mx-2 rounded-3 bg-primary text-white">{comment.user.email}</small>
									</div>
									<small style={{ fontSize: 10 }}>{comment.date}</small>
								</div>
								<div className="text-break">
									<p className="text-justify mb-0 mt-2" style={{ fontSize: '11pt', fontFamily: 'sans-serif' }}>
										{comment.text}
									</p>
								</div>
								{attachRender}
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
		<div id="comments" className="mt-2">
			{renderComments(comments)}
			<ReactPaginate
				breakLabel="..."
				nextLabel=">"
				onPageChange={handlePageClick}
				pageRangeDisplayed={5}
				pageCount={pagesCount}
				previousLabel="<"
				renderOnZeroPageCount={null}
				pageClassName={'page-item'}
				pageLinkClassName={'page-link'}
				nextClassName={'page-item'}
				previousLinkClassName={'page-link'}
				previousClassName={'page-item'}
				nextLinkClassName={'page-link'}
				containerClassName={'pagination mx-2 justify-content-center'}
				activeLinkClassName={'active'}
				forcePage={currentPage}
			/>
		</div>
	);
}

export default Comments;
