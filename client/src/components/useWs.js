import { useEffect, useRef, useState } from 'react';

export const useWs = ({ url }) => {
	const [response, setResponse] = useState(null);

	const ws = useRef(null);

	useEffect(() => {
		const socket = new WebSocket(url);
		socket.onmessage = (event) => {
			if (event.data) setResponse(event.data);
		};

		ws.current = socket;
	}, [url]);
	
	return [response, ws.current?.send.bind(ws.current)];
};
