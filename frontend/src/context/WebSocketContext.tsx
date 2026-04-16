/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { SocketMessage, ClientMessage } from '../types/index';

interface WebSocketContextType {
  isConnected: boolean;
  lastMessage: SocketMessage | null;
  sendMessage: (msg: ClientMessage) => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<SocketMessage | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
     
    const socket = new WebSocket('ws://localhost:8000/ws');
    socketRef.current = socket;

    socket.onopen = () => setIsConnected(true);
    socket.onclose = () => setIsConnected(false);
    
    socket.onmessage = (event) => {
      try {
        const data: SocketMessage = JSON.parse(event.data);
        setLastMessage(data);
      } catch (err) {
        console.error("Failed to parse socket message", err);
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = (msg: ClientMessage) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(msg));
    }
  };

  return (
    <WebSocketContext.Provider value={{ isConnected, lastMessage, sendMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};

 
export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) throw new Error("useWebSocket must be used within a WebSocketProvider");
  return context;
};