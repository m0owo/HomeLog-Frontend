"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export interface Message {
  id: Date;
  text: string;
  sender: string;
}

interface WebSocketContextType {
  socket: WebSocket;
  connected: boolean;
  sendMessage: (data: Message) => void;
  getAllRooms: () => void;
  getAllDevices: () => void;
  addNewDevice: (
    deviceId: string,
    deviceName: string,
    deviceType: string,
    roomId: string,
    deviceStatus: string,
    deviceDetails: Array<number | string>,
  ) => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined,
);

const wsUrl = "ws://localhost:8765";

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const [reconnectAttempt, setReconnectAttempt] = useState(0);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const connectWebSocket = () => {
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      setConnected(true);
      setReconnectAttempt(0);
      setSocket(ws);
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    ws.onclose = () => {
      console.warn("WebSocket disconnected");
      setConnected(false);
      attemptReconnect();
    };

    return ws;
  };

  const attemptReconnect = () => {
    if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
    const nextAttempt = reconnectAttempt + 1;
    setReconnectAttempt(nextAttempt);

    const delay = Math.min(1000 * Math.pow(2, nextAttempt - 1), 30000);
    console.log(`Reconnecting in ${delay}ms (attempt ${nextAttempt})`);

    reconnectTimeoutRef.current = setTimeout(() => {
      connectWebSocket();
    }, delay);
  };

  const sendMessage = (message: Message) => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    } else {
      console.warn("❗ Cannot send message: WebSocket not open");
    }
  };

  const getAllRooms = () => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ action: "get_all_rooms" }));
    } else {
      console.warn("Cannot get all rooms WebSocket not open");
    }
  };

  const getAllDevices = () => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ action: "get_all_devices" }));
    } else {
      console.warn("Cannot get all rooms WebSocket not open");
    }
  };

  const addNewDevice = (
    deviceId: string,
    deviceName: string,
    deviceType: string,
    roomId: string,
    deviceStatus: string,
    deviceDetails: Array<number | string>,
  ) => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          action: "add_device",
          device_id: deviceId,
          device_name: deviceName,
          type: deviceType,
          room_id: roomId,
          device_status: deviceStatus,
          device_details: deviceDetails,
        }),
      );
    } else {
      console.warn("Cannot add device");
    }
  };

  useEffect(() => {
    const ws = connectWebSocket();
    return () => ws?.close();
  }, []);

  if (!socket) return;

  return (
    <WebSocketContext.Provider
      value={{
        socket,
        connected,
        sendMessage,
        getAllRooms,
        getAllDevices,
        addNewDevice,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
