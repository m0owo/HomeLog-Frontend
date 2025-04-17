"use client";

import { useState } from "react";
import AcIcon from "../icons/ac-icon";
import FanIcon from "../icons/fan-icon";
import LightIcon from "../icons/light-icon";
import {
  ACDetails,
  Device,
  FanDetails,
  LightDetails,
} from "../molecules/room-component";
import DeviceDetailsModal from "../organisms/device-details-modal";

export interface DeviceCardProps {
  device: Device;
}

export default function DeviceCard({ device }: DeviceCardProps) {
  const [showModal, setShowModal] = useState(false);

  function isACDetails(
    details: ACDetails | LightDetails | FanDetails,
  ): details is ACDetails {
    return (details as ACDetails).temperature !== undefined;
  }

  function isLightDetails(
    details: ACDetails | LightDetails | FanDetails,
  ): details is LightDetails {
    return (details as LightDetails).brightness !== undefined;
  }

  function isFanDetails(
    details: ACDetails | LightDetails | FanDetails,
  ): details is FanDetails {
    return (details as FanDetails).speed !== undefined;
  }
  const deviceDetailsToString = (device: Device): string => {
    const { deviceType, deviceDetails } = device;

    switch (deviceType) {
      case "ac":
        if (isACDetails(deviceDetails)) {
          return `AC - Temperature: ${deviceDetails.temperature}°C, Mode: ${deviceDetails.mode}`;
        }
        break;
      case "light":
        if (isLightDetails(deviceDetails)) {
          return `Light - Brightness: ${deviceDetails.brightness}%, Color: ${deviceDetails.color}`;
        }
        break;
      case "fan":
        if (isFanDetails(deviceDetails)) {
          return `Fan - Speed: ${deviceDetails.speed}`;
        }
        break;
      default:
        return "Unknown device type";
    }
    return "Invalid device details";
  };

  return (
    <div className="h-full w-full rounded-md bg-white p-2 shadow-sm">
      <button
        onClick={() => setShowModal(true)}
        className="flex flex-row gap-4 p-2"
      >
        <div className="p-0 py-1">
          {(device.deviceType === "light" && <LightIcon />) ||
            (device.deviceType === "ac" && <AcIcon />) ||
            (device.deviceType === "fan" && <FanIcon />)}
        </div>
        <div className="flex flex-col items-start justify-start">
          <p className="text-start font-semibold">{device.deviceName}</p>
          <p className="text-start">{deviceDetailsToString(device)}</p>
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
