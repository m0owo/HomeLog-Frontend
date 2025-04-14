"use client";

import { useState } from "react";
import RoomComponent from "./components/molecules/room-component";
import AddRoomModal from "./components/organisms/add-room-modal";

export default function Home() {
  const [showModal, setShowModal] = useState(true);
  const roomDevices = [
    {
      deviceName: "Living Room - LG Dual Inverter",
      deviceDetails: "Temperature: 24 C",
      deviceType: "ac",
    },
    {
      deviceName: "Bedroom - Philips Hue",
      deviceDetails: "Brightness: 60%",
      deviceType: "light",
    },
    {
      deviceName: "Smart Bulb 2",
      deviceDetails: "Brightness: 70%",
      deviceType: "light",
    },
    {
      deviceName: "Ceiling Fan",
      deviceDetails: "Level: 1/3",
      deviceType: "fan",
    },
    {
      deviceName: "Living Room - LG Dual Inverter 2",
      deviceDetails: "Temperature: 23 C",
      deviceType: "ac",
    },
  ];
  const [curRooms, setCurRooms] = useState([
    {
      roomName: "Test Room 1",
      roomDevices: roomDevices,
    },
    {
      roomName: "Test Room 2",
      roomDevices: roomDevices,
    },
    {
      roomName: "Test Room 3",
      roomDevices: roomDevices,
    },
    {
      roomName: "Test Room 4",
      roomDevices: roomDevices,
    },
    {
      roomName: "Test Room 5",
      roomDevices: roomDevices,
    },
    {
      roomName: "Test Room 6",
      roomDevices: roomDevices,
    },
  ]);

  function handleAddRoom() {
    setShowModal(true);
  }

  return (
    <div className="flex h-full w-full flex-col">
      <div className="grid flex-grow grid-cols-1 gap-10 overflow-auto sm:grid-cols-2 2xl:grid-cols-3">
        {curRooms.map((room) => (
          <RoomComponent
            roomDevices={room.roomDevices}
            roomName={room.roomName}
            key={room.roomName}
          />
        ))}
      </div>

      <div className="fixed right-0 bottom-0 p-10">
        <button
          onClick={handleAddRoom}
          className="rounded-xl border bg-white p-4 text-lg font-normal disabled:opacity-50"
        >
          + Add Room
        </button>
      </div>
      {showModal && (
        <div>
          <div className="fixed inset-0 z-40 bg-black opacity-35" />

          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <AddRoomModal
              setShowModal={setShowModal}
              addRoom={(newRoom) => {
                setCurRooms((prev) => [...prev, newRoom]);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
