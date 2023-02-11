import { useEffect, useRef, useState } from 'react';

export const useWs = ({ url }) => {
	const [isReady, setIsReady] = useState(false);
	const [response, setResponse] = useState(null);

	const ws = useRef(null);

	useEffect(() => {
		const socket = new WebSocket(url);
		socket.onopen = () => setIsReady(true);
		socket.onclose = () => setIsReady(false);
		socket.onmessage = (event) => {
			if (event.data) setResponse(event.data);
		};

		ws.current = socket;
	}, [url]);
	return [isReady, response, ws.current?.send.bind(ws.current)];
};
