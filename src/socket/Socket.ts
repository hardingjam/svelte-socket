/**
 * Manages WebSocket connections for real-time message communication.
 * Provides a robust WebSocket client with automatic connection management and message handling.
 */
export class Socket {
	private socket: WebSocket | null = null;
	private url: string;

	/**
	 * Creates a new Socket instance with the given URL.
	 * Call connect() to establish the WebSocket connection.
	 *
	 * @param {string} url - The WebSocket URL to connect to (e.g., 'ws://localhost:8080')
	 */
	constructor(url: string) {
		this.url = url;
	}

	/**
	 * Connects to the WebSocket server.
	 * Sets up event listeners for messages, connection status, and errors.
	 * Automatically handles incoming messages by parsing JSON data.
	 */
	public connect(): void {
		const isBrowser = typeof window !== 'undefined';
		
		if (!isBrowser || typeof WebSocket === 'undefined') {
			console.warn('⚠️ WebSocket is not available in this environment');
			return;
		}

		console.log('🔌 Creating socket to', this.url);

		if (this.socket) {
			console.log('⚠️ Socket already exists, closing existing connection');
			this.disconnect();
		}

		this.socket = new WebSocket(this.url);

		this.socket.addEventListener('message', (event) => {
			// Receive message and parse it
			const data = JSON.parse(event.data);
		});

		this.socket.addEventListener('open', () => {
			console.log('🔌 Socket connected');
		});

		this.socket.addEventListener('error', (error) => {
			console.error('🔌 Socket error:', error);
		});

		return console.log('🔌 Socket created', this.socket);
	}

	/**
	 * Disconnects and removes the current WebSocket connection.
	 * Sets the socket instance to null after closing.
	 */
	public disconnect(): void {
		if (this.socket) {
			console.log('🔌 Closing socket connection');
			this.socket.close();
			this.socket = null;
		}
	}

	public notifySocket(data: any) {
		return this.socket?.send(JSON.stringify(data));
	}

	/**
	 * Gets the current WebSocket instance.
	 *
	 * @returns {WebSocket | null} The current WebSocket instance, or null if not connected
	 */
	public getSocket(): WebSocket | null {
		return this.socket;
	}

	/**
	 * Checks if the WebSocket is currently connected and ready for communication.
	 *
	 * @returns {boolean} True if the socket is connected and in OPEN state, false otherwise
	 */
	public isConnected(): boolean {
		return this.socket?.readyState === WebSocket.OPEN;
	}
}
