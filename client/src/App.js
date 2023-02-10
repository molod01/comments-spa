import React, { useState } from 'react';

import CommentForm from './components/CommentForm.js';
import Comments from './components/Comments.js';
import { useWs } from './components/useWs.js';
import './index.css';
const WS_URL = process.env.REACT_APP_WS_URL;
const App = () => {
	const [ready, response, send] = useWs({ url: WS_URL });
	const [replyTo, setReplyTo] = useState(undefined);

	const sendRequest = (type, object) => {
		console.log(object);
		send(JSON.stringify({ event: type, payload: object }));
	};

	return (
		<div className="container">
			<CommentForm reply={{ replyTo, setReplyTo }} send={sendRequest} />
			<Comments reply={setReplyTo} response={response} pageCount={2} />
		</div>
	);
};
export default App;
