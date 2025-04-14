"use client";

import { useState } from "react";
import { DeviceCardProps } from "../atoms/device-card";

interface AddDeviceModalProps {
  setShowModal: (show: boolean) => void;
  addDevice: (newDevice: DeviceCardProps) => void;
}

export default function AddDeviceModal({
  setShowModal,
  addDevice,
}: AddDeviceModalProps) {
  const [deviceName, setDeviceName] = useState("");
  const [deviceType, setDeviceType] = useState("");

  const handleSubmit = () => {
    addDevice({
      deviceName,
      deviceType,
      deviceDetails: "",
    });
    setShowModal(false);
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
        onChange={(e) => setDeviceType(e.target.value)}
        className="mb-4 w-full rounded border px-3 py-2"
      >
        <option value="">Select device type</option>
        <option value="light">Light</option>
        <option value="ac">AC</option>
        <option value="fan">Fan</option>
      </select>
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
