"use client";

import { useEffect, useState } from "react";
import RoomComponent, {
  Device,
  Room,
} from "./components/molecules/room-component";
import AddRoomModal from "./components/organisms/add-room-modal";
import { useWebSocket } from "./websocket/WebSocketProvider";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  const { socket, connected, getAllRooms, getAllDevices } = useWebSocket();

  useEffect(() => {
    if (!connected) return;
    getAllRooms();
    getAllDevices();
  }, []);

  socket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);

      if (data.type === "room_list") {
        const parsedRooms: Room[] = Array.isArray(data.content[0].Rooms)
          ? data.content[0].Rooms.map((room: string[]) => ({
              id: room[0],
              roomName: room[1],
            }))
          : [];

        setAllRooms(parsedRooms);
      } else if (data.type === "device_list") {
        const parsedDevices: Device[] = Array.isArray(data.content)
          ? data.content.map((device: string[]) => {
              const [
                deviceId,
                deviceName,
                deviceType,
                roomId,
                deviceStatus,
                deviceDetailOne,
                deviceDetailTwo,
              ] = device;

              let parsedDetails;

              switch (deviceType) {
                case "ac":
                  parsedDetails = {
                    temperature: deviceDetailOne,
                    mode: deviceDetailTwo,
                  };
                  break;
                case "light":
                  parsedDetails = {
                    brightness: deviceDetailOne,
                    color: deviceDetailTwo,
                  };
                  break;
                case "fan":
                  parsedDetails = {
                    speed: deviceDetailOne,
                    second: deviceDetailTwo,
                  };
                  break;
                default:
                  console.warn("Unknown device type", deviceType);
                  parsedDetails = {};
              }
              return {
                deviceId,
                deviceName,
                deviceType,
                roomId,
                deviceStatus,
                deviceDetails: parsedDetails,
              };
            })
          : [];

        setAllDevices((prev) => {
          const deviceMap = new Map(prev.map((d) => [d.deviceId, d]));
          parsedDevices.forEach((d) => deviceMap.set(d.deviceId, d));
          return Array.from(deviceMap.values());
        });
      }
    } catch (err) {
      console.error("Failed to get room or devices", err);
    }
  };

  const [allRooms, setAllRooms] = useState<Room[]>([]);
  const [allDevices, setAllDevices] = useState<Device[]>([]);

  function handleAddRoom() {
    setShowModal(true);
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="grid flex-grow grid-cols-1 grid-rows-[auto] gap-10 overflow-auto p-10 sm:grid-cols-2 2xl:grid-cols-3">
        {allRooms.map((room) => (
          <RoomComponent
            roomDevices={allDevices.filter((device) => {
              const deviceRoomId = device.roomId?.trim() ?? "";
              const roomRoomId = room.id ?? "";
              const isDeviceInRoom = deviceRoomId === roomRoomId;

              return isDeviceInRoom;
            })}
            room={room}
            key={room.id}
          />
        ))}
      </div>

      <div className="fixed right-0 bottom-0 p-10">
        <button
          onClick={handleAddRoom}
          className="rounded-xl border bg-white p-4 text-lg font-normal disabled:opacity-50"
        >
          + Add Room
        </button>
      </div>
      {showModal && (
        <div>
          <div className="fixed inset-0 z-40 bg-black opacity-35" />

          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <AddRoomModal
              setShowModal={setShowModal}
              addRoom={(newRoom) => {
                setAllRooms((prev) => [...prev, newRoom]);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
