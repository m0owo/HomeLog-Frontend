"use client";

import { useState } from "react";
import { DeviceCardProps } from "../atoms/device-card";

interface AddRoomModalProps {
  setShowModal: (show: boolean) => void;
  addRoom: (newRoom: {
    roomName: string;
    roomDevices: DeviceCardProps[];
  }) => void;
}

export default function AddRoomModal({
  setShowModal,
  addRoom,
}: AddRoomModalProps) {
  const [roomName, setRoomName] = useState("");

  const handleSubmit = () => {
    addRoom({
      roomName,
      roomDevices: [],
    });
    setShowModal(false);
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
