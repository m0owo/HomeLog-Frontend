"use client";

import RoomComponent from "./components/molecules/room-component";

export default function Home() {
  const roomDevices = [
    {
      deviceName: "Air Conditioner",
      deviceDetails: "Living Room - LG Dual Inverter",
    },
    {
      deviceName: "Smart Bulb",
      deviceDetails: "Bedroom - Philips Hue",
    },
    {
      deviceName: "Smart Lock",
      deviceDetails: "Front Door - August WiFi Lock",
    },
    {
      deviceName: "Thermostat",
      deviceDetails: "Hallway - Nest Thermostat E",
    },
    {
      deviceName: "Security Camera",
      deviceDetails: "Garage - Ring Spotlight Cam",
    },
    {
      deviceName: "Robot Vacuum",
      deviceDetails: "Living Room - Roomba i7+",
    },
    {
      deviceName: "Ceiling Fan",
      deviceDetails: "Bedroom - Hunter Symphony",
    },
    {
      deviceName: "Smart Plug",
      deviceDetails: "Kitchen - TP-Link Kasa",
    },
    {
      deviceName: "Motion Sensor",
      deviceDetails: "Backyard - Aqara Sensor",
    },
    {
      deviceName: "Sound System",
      deviceDetails: "Living Room - Sonos Beam",
    },
    {
      deviceName: "Air Purifier",
      deviceDetails: "Office - Dyson Pure Cool",
    },
    {
      deviceName: "Water Leak Sensor",
      deviceDetails: "Basement - YoLink Sensor",
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
          className="rounded border px-3 py-1 disabled:opacity-50"
        >
          + Add Room
        </button>
      </div>
    </div>
  );
}
