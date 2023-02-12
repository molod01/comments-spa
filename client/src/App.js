import React from 'react';
import Comments from './components/comments.js';
import CommentForm from './components/comment_form.js';
import './index.css';

<<<<<<< Updated upstream
function App() {
=======
const App = () => {
	const [response, send] = useWs({ url: process.env.REACT_APP_WS_URL });
	const [replyTo, setReplyTo] = useState(undefined);
	const [currentPage, setCurrentPage] = useState(0);

	const sendRequest = (type, object) => {
		console.log(object);
		send(JSON.stringify({ event: type, payload: object }));
	};

>>>>>>> Stashed changes
	return (
		<div className="container-sm w-75">
			<Comments />
			<CommentForm />
		</div>
	);
}
export default App;
