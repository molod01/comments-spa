import React, { useState } from 'react';

import CommentForm from './components/CommentForm.js';
import Comments from './components/Comments.js';
import { useWs } from './components/useWs.js';
import './index.css';

const App = () => {
	const [response, send] = useWs({ url: process.env.REACT_APP_WS_URL });
	const [replyTo, setReplyTo] = useState(undefined);
	const [currentPage, setCurrentPage] = useState(0);

	const sendRequest = (type, object) => {
		console.log(object);
		send(JSON.stringify({ event: type, payload: object }));
	};

	return (
		<div className="container">
			<CommentForm reply={{ replyTo, setReplyTo }} send={sendRequest} changePage={setCurrentPage} />
			<Comments reply={setReplyTo} response={response} send={sendRequest} currentPage={currentPage} />
		</div>
	);
};
export default App;
