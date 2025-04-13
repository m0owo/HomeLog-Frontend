"use client";

import { useState } from "react";
import DeviceCard, { DeviceCardProps } from "../atoms/device-card";

interface RoomComponentProps {
  roomName: string;
  roomDevices: DeviceCardProps[];
}

export default function RoomComponent({
  roomName,
  roomDevices,
}: RoomComponentProps) {
  const pageSize = 6;
  const [curPage, setCurPage] = useState(0);
  const totalPages = Math.ceil(roomDevices.length / pageSize);

  const paginatedDevices = roomDevices.slice(
    curPage * pageSize,
    (curPage + 1) * pageSize,
  );

  const firstColumn = paginatedDevices.slice(0, 3);
  const secondColumn = paginatedDevices.slice(3, 6);

  function handleAddDevice() {
    console.log("Add Device");
  }

  return (
    <div className="h-full w-full rounded-md border-[1px] border-black p-4">
      <div className="mb-4 text-lg font-semibold">{roomName}</div>

      <div className="flex flex-col justify-start gap-4 sm:flex-row">
        <div className="flex w-1/2 flex-col gap-4">
          {firstColumn.map((device) => (
            <DeviceCard
              key={device.deviceName}
              deviceName={device.deviceName}
              deviceDetails={device.deviceDetails}
            />
          ))}
        </div>
        <div className="flex w-1/2 flex-col gap-4">
          {secondColumn.map((device) => (
            <DeviceCard
              key={device.deviceName}
              deviceName={device.deviceName}
              deviceDetails={device.deviceDetails}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-between">
        <div className="flex gap-2">
          {" "}
          <button
            disabled={curPage === 0}
            onClick={() => setCurPage((p) => Math.max(p - 1, 0))}
            className="rounded border px-3 py-1 disabled:opacity-50"
          >
            Prev
          </button>
          <button
            disabled={curPage >= totalPages - 1}
            onClick={() => setCurPage((p) => Math.min(p + 1, totalPages - 1))}
            className="rounded border px-3 py-1 disabled:opacity-50"
          >
            Next
          </button>
        </div>
        <button
          onClick={handleAddDevice}
          className="rounded border px-3 py-1 disabled:opacity-50"
        >
          + Add Device
        </button>
      </div>
    </div>
  );
}
