"use client";

interface AddRoomModalProps {
  setShowModal: (show: boolean) => void;
}

export default function DeviceDetailsModal({
  setShowModal,
}: AddRoomModalProps) {
  return (
    <div className="w-96 rounded bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-bold">Device Details</h2>
      <div className="flex justify-end gap-2">
        <button
          onClick={() => setShowModal(false)}
          className="rounded bg-gray-300 px-4 py-2"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
