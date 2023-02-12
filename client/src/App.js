import React, { useEffect, useState } from 'react';

import CommentForm from './components/CommentForm.js';
import Comments from './components/Comments.js';
import Sorter from './components/Sorter.js';
import { useWs } from './components/useWs.js';
import './index.css';

const App = () => {
	const [response, send, clearResponse] = useWs({ url: process.env.REACT_APP_WS_URL });
	const [replyTo, setReplyTo] = useState(undefined);
	const [currentPage, setCurrentPage] = useState(0);
	const [replyBlock, setReplyBlock] = useState(undefined);
	const [sortBy, setSortBy] = useState('createdAt_desc');

	const sendRequest = (type, object) => {
		let payload = object;
		if (type === 'getPart') {
			payload = {
				part: object,
				sortBy,
			};
		}
		send(JSON.stringify({ event: type, payload }));
	};
	useEffect(() => {}, [replyTo]);

	useEffect(() => {
		console.log('1');
		if (send) {
			console.log('clear');

			clearResponse();
			sendRequest('getPart', 0);
			setCurrentPage(0);
		}
	}, [sortBy]);

	return (
		<div className="container">
			<CommentForm reply={{ replyTo, setReplyTo, replyBlock }} send={sendRequest} changePage={setCurrentPage} />
			<Sorter passSortBy={setSortBy} />
			<Comments reply={setReplyTo} replyBlock={setReplyBlock} response={response} send={sendRequest} currentPageParent={currentPage} />
		</div>
	);
};
export default App;
