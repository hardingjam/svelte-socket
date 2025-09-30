import { getSocketContext } from "./context";

/**
 * Hook for accessing the socket in the application.
 * Provides access to the socket for coordinate-based touch detection.
 *
 * @returns An object containing:
 *   - `socket`: Socket instance for direct socket access
 * @throws {Error} If no Socket is found in context
 */
export default function useSocket() {
  const socket = getSocketContext();
  if (!socket) {
    throw new Error("Socket not found. Did you forget to setSocket?");
  }

  return socket;
}
