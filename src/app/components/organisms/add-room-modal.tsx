"use client";

import { useState } from "react";
import { useWebSocket } from "@/app/websocket/WebSocketProvider";
import { Room } from "../molecules/room-component";

interface AddRoomModalProps {
  setShowModal: (show: boolean) => void;
  addRoom: (newRoom: Room) => void;
}

export default function AddRoomModal({
  setShowModal,
  addRoom,
}: AddRoomModalProps) {
  const { socket, addNewRoom } = useWebSocket();
  const [roomName, setRoomName] = useState("");

  const handleSubmit = () => {
    if (roomName.trim() === "") {
      alert("Room name cannot be empty!");
      return;
    }

    addNewRoom(roomName);

    const newRoom: Room = {
      id: roomName,
      roomName: roomName,
    };

    addRoom(newRoom);
    setRoomName("");
    setShowModal(false);
  };

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      if (data.type === "room_list" || data.type === "broadcast") {
        console.log("roomlist or broadcast", data.content);
      }
    } catch (err) {
      console.error("Failed to parse message:", err);
    }
  };

  return (
    <div className="w-96 rounded bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-bold">Add New Room</h2>
      <input
        type="text"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        className="mb-4 w-full rounded border px-3 py-2"
        placeholder="Enter room name"
      />
      <div className="flex justify-end gap-2">
        <button
          onClick={() => setShowModal(false)}
          className="rounded bg-gray-300 px-4 py-2"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="rounded border-[1px] border-black bg-white px-4 py-2 text-black"
        >
          Add Room
        </button>
      </div>
    </div>
  );
}
