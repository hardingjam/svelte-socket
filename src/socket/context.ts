import { getContext, setContext } from 'svelte';
import type { Socket } from './Socket';

/**
 * The context key used to store and retrieve the Socket instance
 */
export const SOCKET_CONTEXT_KEY = 'svelte:socket';

/**
 * Sets the Socket instance in Svelte's context
 *
 * @param {Socket} socket - The Socket instance to store in context
 * @returns {void}
 */
export function setSocket(socket: Socket) {
	setContext(SOCKET_CONTEXT_KEY, socket);
}

/**
 * Retrieves the Socket instance from Svelte's context
 *
 * @returns {Socket} The Socket instance
 * @throws {Error} If no Socket is found in context
 */
export function getSocketContext(): Socket {
	const socket = getContext<Socket | undefined>(SOCKET_CONTEXT_KEY);
	if (!socket) {
		throw new Error('Socket not found. Did you forget to setSocket?');
	}
	return socket;
}
