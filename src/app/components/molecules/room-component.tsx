"use client";

import { useEffect, useState } from "react";
import DeviceCard from "../atoms/device-card";
import AddDeviceModal from "../organisms/add-device-modal";

export interface RoomComponentProps {
  room: Room;
  roomDevices: Device[];
}

export interface Room {
  id: string;
  roomName: string;
}

export interface Device {
  deviceId: string;
  deviceName: string;
  deviceType: string;
  roomId: string;
  deviceStatus: string;
  deviceDetails: ACDetails | LightDetails | FanDetails;
}

export interface ACDetails {
  temperature: number;
  mode: string;
}

export interface LightDetails {
  brightness: number;
  color: string;
}

export interface FanDetails {
  speed: number;
  second: string;
}

export default function RoomComponent({
  room,
  roomDevices,
}: RoomComponentProps) {
  const [showModal, setShowModal] = useState(false);
  const pageSize = 4;
  const [curPage, setCurPage] = useState(0);
  const [curDevices, setCurDevices] = useState(roomDevices);

  useEffect(() => {
    setCurDevices(roomDevices);
  }, [roomDevices]);

  const totalPages = Math.ceil(curDevices.length / pageSize);
  const paginatedDevices = curDevices.slice(
    curPage * pageSize,
    (curPage + 1) * pageSize,
  );
  const firstColumn = paginatedDevices.slice(0, pageSize / 2);
  const secondColumn = paginatedDevices.slice(pageSize / 2, pageSize);

  function handleAddDevice() {
    setShowModal(true);
  }

  return (
    <div className="flex h-[500px] flex-col justify-between rounded-md p-4">
      <div className="h-full w-full">
        <div className="text-lg font-semibold">{room.roomName}</div>

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
        {roomDevices.length === 0 ? (
          <div className="mt-4 text-gray-500 italic">No devices to show.</div>
        ) : (
          <div className="p-0 py-2">
            <div className="flex flex-col justify-start gap-4 sm:flex-row">
              <div className="flex h-full w-1/2 flex-col gap-4">
                {firstColumn.map((device) => (
                  <div key={device.deviceId} className="h-1/3">
                    <DeviceCard device={device} />
                  </div>
                ))}
              </div>
              <div className="flex h-full w-1/2 flex-col gap-4">
                {secondColumn.map((device) => (
                  <div key={device.deviceName} className="h-1/3">
                    <DeviceCard device={device} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      {showModal && (
        <div>
          <div className="fixed inset-0 z-40 bg-black opacity-35" />

          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <AddDeviceModal
              roomId={room.id}
              setShowModal={setShowModal}
              addDevice={(newDevice) => {
                setCurDevices((prev) => [...prev, newDevice]);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
