import React, { useEffect, useState } from 'react';

import CommentForm from './components/CommentForm.js';
import Comments from './components/Comments.js';
import { useWs } from './components/useWs.js';
import './index.css';

const App = () => {
	const [response, send] = useWs({ url: process.env.REACT_APP_WS_URL });
	const [replyTo, setReplyTo] = useState(undefined);
	const [currentPage, setCurrentPage] = useState(0);
	const [replyBlock, setReplyBlock] = useState(undefined);

	const sendRequest = (type, object) => {
		send(JSON.stringify({ event: type, payload: object }));
	};
	useEffect(() => {
	}, [replyTo]);

	return (
		<div className="container">
			<CommentForm reply={{ replyTo, setReplyTo, replyBlock }} send={sendRequest} changePage={setCurrentPage} />
			<Comments reply={setReplyTo} replyBlock={setReplyBlock} response={response} send={sendRequest} currentPage={currentPage} />
		</div>
	);
};
export default App;
