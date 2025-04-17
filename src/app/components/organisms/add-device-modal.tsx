"use client";

import { useState } from "react";
import {
  ACDetails,
  Device,
  FanDetails,
  LightDetails,
} from "../molecules/room-component";

interface AddDeviceModalProps {
  setShowModal: (show: boolean) => void;
  addDevice: (newDevice: Device) => void;
  roomId: string;
}

export default function AddDeviceModal({
  setShowModal,
  addDevice,
  roomId,
}: AddDeviceModalProps) {
  const [deviceName, setDeviceName] = useState("");
  const [deviceType, setDeviceType] = useState("");

  // Default values for deviceDetails based on device type
  const [deviceDetails, setDeviceDetails] = useState<
    ACDetails | LightDetails | FanDetails | null
  >(null);

  const handleSubmit = () => {
    if (!deviceName || !deviceType || !deviceDetails) {
      // Handle missing fields
      return;
    }

    const newDevice: Device = {
      deviceId: deviceName, // You could use another way to generate unique IDs
      deviceName: deviceName,
      deviceType: deviceType,
      roomId: roomId,
      deviceStatus: "off", // Default status
      deviceDetails: deviceDetails,
    };

    addDevice(newDevice);
    setShowModal(false);
  };

  const handleDeviceTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value;
    setDeviceType(type);

    // Set default device details based on device type
    switch (type) {
      case "ac":
        setDeviceDetails({
          temperature: 22, // Default temperature for AC
          mode: "cool", // Default mode for AC
        });
        break;
      case "light":
        setDeviceDetails({
          brightness: 50, // Default brightness for light
          color: "white", // Default color for light
        });
        break;
      case "fan":
        setDeviceDetails({
          speed: 1, // Default speed for fan
          second: "low", // Default setting for fan
        });
        break;
      default:
        setDeviceDetails(null); // Reset deviceDetails if no valid type selected
    }
  };

  // Type guards for accessing device details properties
  const isACDetails = (
    details: ACDetails | LightDetails | FanDetails,
  ): details is ACDetails => {
    return (details as ACDetails).temperature !== undefined;
  };

  const isLightDetails = (
    details: ACDetails | LightDetails | FanDetails,
  ): details is LightDetails => {
    return (details as LightDetails).brightness !== undefined;
  };

  const isFanDetails = (
    details: ACDetails | LightDetails | FanDetails,
  ): details is FanDetails => {
    return (details as FanDetails).speed !== undefined;
  };

  return (
    <div className="w-96 rounded bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-bold">Add New Device</h2>
      <input
        type="text"
        value={deviceName}
        onChange={(e) => setDeviceName(e.target.value)}
        className="mb-4 w-full rounded border px-3 py-2"
        placeholder="Enter device name"
      />
      <select
        value={deviceType}
        onChange={handleDeviceTypeChange}
        className="mb-4 w-full rounded border px-3 py-2"
      >
        <option value="">Select device type</option>
        <option value="light">Light</option>
        <option value="ac">AC</option>
        <option value="fan">Fan</option>
      </select>

      {/* Render device-specific details based on the device type */}
      {deviceType === "ac" && deviceDetails && isACDetails(deviceDetails) && (
        <div>
          <label>Temperature: </label>
          <input
            type="number"
            value={deviceDetails.temperature}
            onChange={(e) =>
              setDeviceDetails({
                ...deviceDetails,
                temperature: +e.target.value,
              })
            }
            className="mb-4 w-full rounded border px-3 py-2"
          />
          <label>Mode: </label>
          <select
            value={deviceDetails.mode}
            onChange={(e) =>
              setDeviceDetails({
                ...deviceDetails,
                mode: e.target.value,
              })
            }
            className="mb-4 w-full rounded border px-3 py-2"
          >
            <option value="cool">Cool</option>
            <option value="heat">Heat</option>
            <option value="fan">Fan</option>
          </select>
        </div>
      )}

      {deviceType === "light" &&
        deviceDetails &&
        isLightDetails(deviceDetails) && (
          <div>
            <label>Brightness: </label>
            <input
              type="number"
              value={deviceDetails.brightness}
              onChange={(e) =>
                setDeviceDetails({
                  ...deviceDetails,
                  brightness: +e.target.value,
                })
              }
              className="mb-4 w-full rounded border px-3 py-2"
            />
            <label>Color: </label>
            <input
              type="text"
              value={deviceDetails.color}
              onChange={(e) =>
                setDeviceDetails({
                  ...deviceDetails,
                  color: e.target.value,
                })
              }
              className="mb-4 w-full rounded border px-3 py-2"
            />
          </div>
        )}

      {deviceType === "fan" && deviceDetails && isFanDetails(deviceDetails) && (
        <div>
          <label>Speed: </label>
          <input
            type="number"
            value={deviceDetails.speed}
            onChange={(e) =>
              setDeviceDetails({
                ...deviceDetails,
                speed: +e.target.value,
              })
            }
            className="mb-4 w-full rounded border px-3 py-2"
          />
          <label>Setting: </label>
          <select
            value={deviceDetails.second}
            onChange={(e) =>
              setDeviceDetails({
                ...deviceDetails,
                second: e.target.value,
              })
            }
            className="mb-4 w-full rounded border px-3 py-2"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
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
          onClick={handleSubmit}
          className="rounded border-[1px] border-black bg-white px-4 py-2 text-black"
        >
          Add Device
        </button>
      </div>
    </div>
  );
}
