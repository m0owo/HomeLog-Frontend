"use client";

import RoomComponent from "./components/molecules/room-component";

export default function Home() {
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

  function handleAddRoom() {
    console.log("Add Room");
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* Main Content */}
      <div className="grid flex-grow grid-cols-1 gap-10 overflow-auto sm:grid-cols-2 2xl:grid-cols-3">
        <RoomComponent roomName="Test Room 1" roomDevices={roomDevices} />
        <RoomComponent roomName="Test Room 2" roomDevices={roomDevices} />
        <RoomComponent roomName="Test Room 3" roomDevices={roomDevices} />
        <RoomComponent roomName="Test Room 4" roomDevices={roomDevices} />
      </div>

      {/* Add Room Button */}
      <div className="fixed right-0 bottom-0 p-16 pb-6">
        <button
          onClick={handleAddRoom}
          className="rounded border bg-white px-3 py-1 font-normal disabled:opacity-50"
        >
          + Add Room
        </button>
      </div>
    </div>
  );
}
