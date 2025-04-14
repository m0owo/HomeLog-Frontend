"use client";

import { useState } from "react";

interface AddRoomModalProps {
  setShowModal: (show: boolean) => void;
}

export default function DeviceDetailsModal({
  setShowModal,
}: AddRoomModalProps) {
  const [deviceType, setDeviceType] = useState(""); //will get from api later

  return (
    <div className="w-96 rounded bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-bold">Device Details</h2>
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

      {/* Conditional Fields */}
      {deviceType === "light" && (
        <input
          type="text"
          placeholder="Brightness (e.g. 60%)"
          className="mb-4 w-full rounded border px-3 py-2"
        />
      )}
      {deviceType === "ac" && (
        <input
          type="text"
          placeholder="Temperature (e.g. 24°C)"
          className="mb-4 w-full rounded border px-3 py-2"
        />
      )}
      {deviceType === "fan" && (
        <input
          type="text"
          placeholder="Speed Level (e.g. 1/3)"
          className="mb-4 w-full rounded border px-3 py-2"
        />
      )}
      <div className="flex justify-end gap-2">
        <button
          onClick={() => setShowModal(false)}
          className="rounded bg-gray-300 px-4 py-2"
        >
          Cancel
        </button>
        <button className="rounded border-[1px] border-black bg-white px-4 py-2 text-black">
          Save
        </button>
      </div>
    </div>
  );
}
