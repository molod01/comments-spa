import React from 'react';
import Comments from './components/comments.js';
import CommentForm from './components/comment_form.js';
import './index.css';

function App() {
	return (
		<div className="container-sm w-75">
			<Comments />
			<CommentForm />
		</div>
	);
}
export default App;
