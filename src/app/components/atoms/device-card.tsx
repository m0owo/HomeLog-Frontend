"use client";

import AcIcon from "../icons/ac-icon";
import FanIcon from "../icons/fan-icon";
import LightIcon from "../icons/light-icon";

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
  return (
    <div className="h-full w-full rounded-md bg-white p-2 shadow-sm">
      <div className="flex flex-row gap-4 p-2">
        <div className="p-0 py-1">
          {(deviceType === "light" && <LightIcon />) ||
            (deviceType === "ac" && <AcIcon />) ||
            (deviceType === "fan" && <FanIcon />)}
        </div>
        <div className="flex flex-col">
          <p className="font-semibold">{deviceName}</p>
          <p>{deviceDetails}</p>
        </div>
      </div>
    </div>
  );
}
