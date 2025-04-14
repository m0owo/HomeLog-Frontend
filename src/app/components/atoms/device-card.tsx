"use client";

import { useState } from "react";
import AcIcon from "../icons/ac-icon";
import FanIcon from "../icons/fan-icon";
import LightIcon from "../icons/light-icon";
import DeviceDetailsModal from "../organisms/device-details-modal";

export interface DeviceCardProps {
  deviceName: string;
  deviceType: string;
  deviceDetails: string;
}

export default function DeviceCard({
  deviceName,
  deviceDetails,
  deviceType,
}: DeviceCardProps) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="h-full w-full rounded-md bg-white p-2 shadow-sm">
      <button
        onClick={() => setShowModal(true)}
        className="flex flex-row gap-4 p-2"
      >
        <div className="p-0 py-1">
          {(deviceType === "light" && <LightIcon />) ||
            (deviceType === "ac" && <AcIcon />) ||
            (deviceType === "fan" && <FanIcon />)}
        </div>
        <div className="flex flex-col">
          <p className="font-semibold">{deviceName}</p>
          <p>{deviceDetails}</p>
        </div>
      </button>
      {showModal && (
        <div>
          <div className="fixed inset-0 z-40 bg-black opacity-35" />

          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <DeviceDetailsModal setShowModal={setShowModal} />
          </div>
        </div>
      )}
    </div>
  );
}
