import { io, Socket } from "socket.io-client";
import { useEffect, useState } from "react";

let socket: Socket | null = null;

export function getSocket() {
  if (!socket) {
    // In production, replace with your backend URL
    socket = io("https://demo-socket.example.com", { autoConnect: false });
  }
  return socket;
}

export function useSocket<T = unknown>(event: string) {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const s = getSocket();
    s.connect();

    const handler = (payload: T) => setData(payload);
    s.on(event, handler);

    return () => {
      s.off(event, handler);
      s.disconnect();
    };
  }, [event]);

  return data;
}
