"use client";

export interface DeviceCardProps {
  deviceName: string;
  deviceDetails: string;
}

export default function DeviceCard({
  deviceName,
  deviceDetails,
}: DeviceCardProps) {
  return (
    <div className="h-fit w-full rounded-md border-[1px] border-black p-2">
      <div className="flex flex-row">
        <div>ICON</div>
        <div className="flex flex-col">
          <p>{deviceName}</p>
          <p>{deviceDetails}</p>
        </div>
      </div>
    </div>
  );
}
