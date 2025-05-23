"use client";

import { useState } from "react";
import { useWebSocket } from "@/app/websocket/WebSocketProvider";
import ToggleSwitch from "../atoms/toggle-switch";
import { Device } from "../molecules/room-component";

interface AddRoomModalProps {
  device: Device;
  setShowModal: (show: boolean) => void;
}

export default function DeviceDetailsModal({
  device,
  setShowModal,
}: AddRoomModalProps) {
  const { updateDeviceDetails } = useWebSocket();
  const deviceType: string = device.deviceType;

  const [brightness, setBrightness] = useState(
    deviceType === "light" && "brightness" in device.deviceDetails
      ? device.deviceDetails.brightness
      : 0,
  );

  const [temp, setTemperature] = useState(
    deviceType === "ac" && "temperature" in device.deviceDetails
      ? device.deviceDetails.temperature
      : 0,
  );

  const [speed, setSpeed] = useState(
    deviceType === "fan" && "speed" in device.deviceDetails
      ? device.deviceDetails.speed
      : 0,
  );

  const [deviceOn, setDeviceOn] = useState(device.deviceStatus);
  console.log(deviceOn);

  const [deviceMode, setDeviceMode] = useState(
    "color" in device.deviceDetails
      ? device.deviceDetails.color
      : "mode" in device.deviceDetails
        ? device.deviceDetails.mode
        : "",
  );

  const handleBrightnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrightness(Number(e.target.value)); // Convert string to number
  };

  const handleTemperatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTemperature(Number(e.target.value)); // Convert string to number
  };

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpeed(Number(e.target.value)); // Convert string to number
  };

  const handleSave = () => {
    let updatedDetails: { [key: string]: string | number } = {};

    if (deviceType === "light") {
      updatedDetails = {
        brightness,
        color: deviceMode,
      };
    } else if (deviceType === "ac") {
      updatedDetails = {
        temperature: temp,
        mode: deviceMode,
      };
    } else if (deviceType === "fan") {
      updatedDetails = {
        speed,
      };
    }

    updateDeviceDetails(
      device.deviceId,
      deviceOn ? "on" : "off",
      Object.values(updatedDetails),
    );
  };

  return (
    <div className="flex w-96 flex-col gap-4 rounded bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-bold">Device Details</h2>

      <div className="flex w-full flex-row gap-2">
        <label htmlFor="deviceStatus" className="w-1/3">
          Device Status:
        </label>
        <ToggleSwitch value={deviceOn} setValue={setDeviceOn} />
      </div>
      {deviceType === "light" && (
        <div className="flex h-full w-full flex-col gap-4">
          <div className="flex w-full flex-row gap-2">
            <label htmlFor="brightnessRange" className="w-1/3">
              Brightness:
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={brightness}
              onChange={handleBrightnessChange}
              className="accent-black"
            />
            {brightness}
          </div>
          <div className="flex w-full flex-row gap-2">
            <label htmlFor="colorSelect" className="w-1/3">
              Light Color:
            </label>
            <select
              name="colorSelect"
              id="colorSelect"
              className="rounded-sm border-[1px] border-black"
              value={deviceMode}
              onChange={(e) => setDeviceMode(e.target.value)}
            >
              <option value="warm">Warm</option>
              <option value="cool">Cool</option>
              <option value="white">White</option>
            </select>
          </div>
        </div>
      )}
      {deviceType === "ac" && (
        <div className="flex h-full w-full flex-col gap-4">
          <div className="flex w-full flex-row gap-2">
            <label htmlFor="temperatureRange" className="w-1/3">
              Temperature:
            </label>
            <input
              type="range"
              min="16"
              max="30"
              value={temp}
              onChange={handleTemperatureChange}
              className="accent-black"
            />
            {temp}
          </div>
          <div className="flex w-full flex-row gap-2">
            <label htmlFor="modeSelect" className="w-1/3">
              Select mode:
            </label>
            <select
              name="modeSelect"
              id="modeSelect"
              className="rounded-sm border-[1px] border-black"
              value={deviceMode}
              onChange={(e) => setDeviceMode(e.target.value)}
            >
              <option value="cold">Cold</option>
              <option value="fan">Fan</option>
              <option value="dry">Dry</option>
              <option value="auto">Auto</option>
              <option value="heat">Heat</option>
            </select>
          </div>
        </div>
      )}
      {deviceType === "fan" && (
        <div className="flex h-full w-full flex-col gap-4">
          <div className="flex w-full flex-row gap-2">
            <label htmlFor="speedRange" className="w-1/3">
              Speed:
            </label>
            <input
              type="range"
              min="0"
              max="5"
              value={speed}
              onChange={handleSpeedChange}
              className="accent-black"
            />
            {speed}
          </div>
        </div>
      )}
      <div className="flex justify-end gap-2">
        <button
          onClick={() => setShowModal(false)}
          className="rounded bg-gray-300 px-4 py-2"
        >
          Cancel
        </button>
        <button
          className="rounded border-[1px] border-black bg-white px-4 py-2 text-black"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
}
