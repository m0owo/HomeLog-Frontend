"use client";

import { useState } from "react";
import DeviceCard, { DeviceCardProps } from "../atoms/device-card";

export interface RoomComponentProps {
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
    <div className="flex w-full flex-col justify-between rounded-md p-4">
      <div>
        <div className="text-lg font-semibold">{roomName}</div>
        <div className="mb-2 flex justify-end">
          Page {curPage + 1}/{totalPages}
        </div>

        <div className="flex flex-col justify-start gap-4 sm:flex-row">
          <div className="flex w-1/2 flex-col gap-4">
            {firstColumn.map((device) => (
              <div key={device.deviceName} className="h-1/3">
                <DeviceCard
                  key={device.deviceName}
                  deviceName={device.deviceName}
                  deviceDetails={device.deviceDetails}
                  deviceType={device.deviceType}
                />
              </div>
            ))}
          </div>
          <div className="flex w-1/2 flex-col gap-4">
            {secondColumn.map((device) => (
              <div key={device.deviceName} className="h-1/3">
                <DeviceCard
                  key={device.deviceName}
                  deviceName={device.deviceName}
                  deviceDetails={device.deviceDetails}
                  deviceType={device.deviceType}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-between">
        <div className="flex gap-2">
          <button
            disabled={curPage === 0}
            onClick={() => setCurPage((p) => Math.max(p - 1, 0))}
            className="rounded border bg-white px-3 py-1 font-normal disabled:opacity-50"
          >
            Prev
          </button>
          <button
            disabled={curPage >= totalPages - 1}
            onClick={() => setCurPage((p) => Math.min(p + 1, totalPages - 1))}
            className="rounded border bg-white px-3 py-1 font-normal disabled:opacity-50"
          >
            Next
          </button>
        </div>
        <button
          onClick={handleAddDevice}
          className="rounded border bg-white px-3 py-1 font-normal disabled:opacity-50"
        >
          + Add Device
        </button>
      </div>
    </div>
  );
}
