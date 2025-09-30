/**
 * Manages WebSocket connections for real-time message communication.
 * Provides a robust WebSocket client with automatic connection management and message handling.
 */

interface SocketConstructorArgs {
  hostname: string;
}

export class Socket {
  private socket: WebSocket | null = null;
  private url: string;

  /**
   * Creates a new Socket instance with the given URL.
   * Call connect() to establish the WebSocket connection.
   *
   * @param {string} url - The WebSocket URL to connect to (e.g., 'ws://localhost:8080')
   */
  constructor(args: SocketConstructorArgs) {
    this.url = this.url = `ws://${args.hostname}:9980/`;
    console.log("Socket constructor called for:", this.url);
  }

  /**
   * Creates and connects a new WebSocket
   * Sets up event listeners for messages, connection status, and errors.
   *
   * @private
   */
  private createSocket(): void {
    // console.log(this.socket, 'createSocket():this.socket');
    // If the socket already exists and is open, close it.
    // if (this.socket && this.socket.readyState === WebSocket.OPEN) {
    if (
      this.socket &&
      [WebSocket.CONNECTING, WebSocket.OPEN].includes(
        this.socket.readyState as 0 | 1,
      )
    ) {
      console.warn("🔌 Closing old socket.");
      this.socket.close();
      this.socket = null;
    }

    console.log("🔌 Creating new socket to", this.url);
    this.socket = new WebSocket(this.url);

    // Set up event listeners for messages, connection status, and errors.
    this.socket.addEventListener("message", (messageEvent: MessageEvent) => {
      // console.log('WEBSOCKET MESSAGE:', messageEvent);
      // Parse the message event data as a JSON object.
      const eventObject = JSON.parse(messageEvent.data);
      console.log("WEBSOCKET MESSAGE:", eventObject);
    });
    // Set up event listener for when the socket is connected.
    this.socket.addEventListener("open", () => {
      console.log("🔌 Socket connected to:", this.url);
    });

    // Set up event listener for when the socket encounters an error.
    this.socket.addEventListener("error", (error) => {
      console.error("🔌 Socket error:", error, "on:", this.url);
      // Close the socket.
      // This will trigger the close event listener so we don't try to
      // reconnect here otherwise we will end up with race conditions
      // in an infinite loop.
      this.socket?.close();
      this.socket = null;
    });

    // Set up event listener for when the socket is closed.
    this.socket.addEventListener("close", () => {
      console.warn("🔌 Socket closed on:", this.url);
      // If the socket is closed, try to reconnect.
      this.socket = null;
      setTimeout(() => {
        this.createSocket();
      }, 1000);
    });

    // Set up event listener for when the socket is ready.
    this.socket.addEventListener("ready", () => {
      console.log("🔌 Socket ready on:", this.url);
    });

    // Set up event listener for when the socket is reconnecting.
    this.socket.addEventListener("reconnecting", () => {
      console.warn("🔌 Socket reconnecting on:", this.url);
    });

    // Set up event listener for when the socket is reconnected.
    this.socket.addEventListener("reconnected", () => {
      console.log("🔌 Socket reconnected on:", this.url);
    });
  }

  /**
   * Disconnects and removes the current WebSocket connection.
   * Sets the socket instance to null after closing.
   */
  public disconnect(): void {
    if (this.socket) {
      console.log("🔌 Closing socket connection");
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
